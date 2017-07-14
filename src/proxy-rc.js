import {pipe, tryCatch, noop} from './helpers';
/*
 * HTTP method constants. 
 */
const methods = {
  DELETE: 'DELETE',
  GET: 'GET',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT'
}

const encodeNoop = (val) => {
  console.warn('encode fn for requested content-type doen\'t exists');
  return val;
};

const decodeNoop = (val) => {
  console.warn('decode fn for requested content-type doen\'t exists');
  return val;
};

const getContentTypeWithoutCharset = (hdr) => hdr.split(';')[0];

/**
 * Factory Function. Create new Resource object 
 * @func createRC
 * @param {*} conf 
 */
const  createRC = (conf) => {
  const currentConf = conf;

  class Resource {

    /**
     * Constructor
     * @param {*} parent 
     * @param {*} name 
     * @param {*} id 
     */
    constructor (
      parent = null,
      name = '',
      id = null
    ) {
      this._parent = parent;
      this._name = name;
      this._id = id;
      this._resources = {};
      
      return new Proxy(this, Resource._proxyHandler)
    }

    /**
     * 
     * @param {*} conf 
     */
    delete (conf = {}) {
      return this._request(
        Object.assign({}, conf, { method: methods.DELETE })  
      );
    }

    /**
     * 
     * @param {*} params 
     * @param {*} conf 
     */
    get (params, conf = {}) {
      return this._request(
        Object.assign({}, conf, { method: methods.GET, params })
      );
    }

    /**
     * 
     * @param {*} data 
     * @param {*} conf 
     */
    patch (data, conf = {}) {
      return this._request(
        Object.assign({}, conf, { method: methods.PATCH, data })
      );
    }

    /**
     * 
     * @param {*} data 
     * @param {*} conf 
     */
    post (data, conf = {}) {
      return this._request(
        Object.assign({}, conf, { method: methods.POST, data })
      );
    }

    /**
     * 
     * @param {*} data 
     * @param {*} conf 
     */
    put (data, conf ={}) {
      return this._request(
        Object.assign({}, conf, { method: methods.PUT, data })
      );
    }

    /**
     * 
     * @param {*} suffix 
     */
    url (suffix = true) {
      let url = this._parent ?
                this._parent.url(false) :
                currentConf.baseUrl;
      
      if (this._name) { url += `/${this._name}`; }
      if (this._id) { url += `/${this._id}`; }
      if (suffix && currentConf.suffix) { url += `.${currentConf.suffix}`; }

      return url;
    }

    /**
     * 
     * @param {*} reqConf 
     */
    _createReqConf (reqConf) {
      return {
        headers: Object.assign({}, {
          'Content-Type': currentConf.contentType
        }, reqConf.headers),
        
        onUploadProgress: reqConf.onUploadProgress || noop,
        onDownloadProgress: reqConf.onDownloadProgress || noop,

        method: reqConf.method,
        url: this.url(),
        params: reqConf.params,
        data: reqConf.data
      }
    }

    /**
     * 
     * @param {*} params 
     */
    _generateUrl (params) {
      const paramTrailing = params ? '?' : '';

      return this.url() + currentConf.trailing + 
             paramTrailing + this._encodeParams(params);
    }

    /**
     * 
     * @param {*} status 
     */
    _isRequestSuccessful (status) {
      return status === 200 || 
             status === 201 || 
             status === 204 || 
             status === 304;
    } 

    /**
     * 
     * @param {*} userReqConf 
     */
    _request (userReqConf) {
      const handleRequest = pipe(...currentConf.interceptors.request);
      const createThenHandleReqConf = pipe(
        this._createReqConf.bind(this),
        handleRequest
      );

      const currentReqConf = createThenHandleReqConf(userReqConf);

      const xhr = new XMLHttpRequest(); 
      xhr.open(
        currentReqConf.method, 
        this._generateUrl(currentReqConf.params), 
        true
      );

      xhr.upload.onprogress = currentConf.onUploadProgress;
      xhr.onprogress = currentConf.onDownloadProgress;

      /* sets all nesesarry headers for xhr obj */
      Object
        .keys(currentReqConf.headers)
        .forEach((header) => 
          xhr.setRequestHeader(header, currentReqConf.headers[header]));

      const mime = currentConf.mimes[currentReqConf.headers['Content-Type']] || {};
      const encodeOrRaw = tryCatch(mime.encode || encodeNoop, currentReqConf.data);

      xhr.send(encodeOrRaw(currentReqConf.data));

      return new Promise((resolve, reject) =>
        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4) {
            const handlerResponse = pipe(...currentConf.interceptors.response);
            const handlerSuccess = pipe(...currentConf.interceptors.success);
            const handleError = pipe(...currentConf.interceptors.error);
            
            const getResCntType = pipe(
              xhr.getResponseHeader.bind(xhr, 'Content-Type'),
              getContentTypeWithoutCharset
            );

            const mime = currentConf.mimes[getResCntType()] || {};
            const decodeOrRaw = tryCatch(mime.decode || decodeNoop, xhr.responseText);
            
            const res = handlerResponse({
              status: xhr.status,
              statusText: xhr.statusText,
              data: decodeOrRaw(xhr.responseText),
              config: currentReqConf
            });

            if(this._isRequestSuccessful(res.status)) {
              resolve(handlerSuccess(res));
            }
            else {
              reject(handleError(res));
            }
          }
        }
      )
    }

    /**
     * 
     * @param {*} params 
     */
    _encodeParams (params) {
      const encodedParams = Object
        .keys(params || {})
        .reduce((acc, param) => {
          return acc + encodeURIComponent(param) + 
                 '=' + encodeURIComponent(params[param]) + 
                 '&';
        }, '');

      return encodedParams.slice(0, encodedParams.length - 1);
    }

    /**
     * 
     */
    static get _noopHandlers () {
      return {
        request: [],
        response: [],
        error: [],
        success: []
      }
    }

    /**
     * 
     */
    static get _proxyHandler () {
      return {
        get: (trgt, prop) => {
          if(typeof prop === 'symbol') { return trgt[prop]; }
          /* Because default value of id and parent is null, we need to create
            new resource only if property is undefined */
          if(trgt[prop] !== undefined) { return trgt[prop]; }

          const res = new Resource(trgt, prop);

          trgt._resources[prop] = res;
          trgt[prop] = (id) => id ? Resource.clone(res, id) : res;

          return trgt[prop];
        }
      }
    }

   /**
    * 
    * @param {*} res 
    * @param {*} id 
    */
    static clone (res, id) {
      const copy = new Resource(
        res._parent,
        res._name,
        id
      );
      copy._resources = res._resources;

      return copy;
    }
  }

 /* 
    after version 6.4.0 of node console.log try to call inspect method for
    custom object inspect (if it exists). So we place null to it.
  */
  Resource.prototype.inspect = null;

  return new Resource();
};

export { createRC }
