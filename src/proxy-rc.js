import xr from 'xr';
import {pipe} from './helpers';
/*
 * HTTP method constants. 
 */
const methods = {
  DELETE: xr.Methods.DELETE,
  GET: xr.Methods.GET,
  PATCH: xr.Methods.PATCH,
  POST: xr.Methods.POST,
  PUT: xr.Methods.PUT
}

/**
 * 
 * @param {*} conf 
 */
const  createRC = (conf) => {
  const currentConf = conf;

  class Resource {

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

    delete (conf = {}) {
      return this._request(
        Object.assign({}, conf, { method: methods.DELETE })  
      );
    }

    get (params, conf = {}) {
      return this._request(
        Object.assign({}, conf, { method: methods.GET, params })
      );
    }

    patch (data, conf = {}) {
      return this._request(
        Object.assign({}, conf, { method: methods.PATCH, data })
      );
    }

    post (data, conf = {}) {
      return this._request(
        Object.assign({}, conf, { method: methods.POST, data })
      );
    }

    put (data, conf ={}) {
      return this._request(
        Object.assign({}, conf, { method: methods.PUT, data })
      );
    }

    url (suffix = true) {
      let url = this._parent ?
                this._parent.url(false) :
                currentConf.baseUrl;
      
      if (this._name) { url += `/${this._name}`; }
      if (this._id) { url += `/${this._id}`; }
      if (suffix && currentConf.suffix) { url += `.${currentConf.suffix}`; }

      return url;
    }

    _mapResObj (res) {
      return {
        data: JSON.parse(res.response) || null,
        status: res.status,
        statusText: res.xhr.statusText
      }
    }

    /**
     * 
     * @param {*} reqConf 
     */
    _createReqObj (reqConf) {
      return {
        headers: Object.assign({}, {
          'Content-Type': currentConf.contentType
        }, reqConf.headers),
        
        handlers: {
          request: currentConf.interceptors.request
            .concat(reqConf.handlers.request || []),

          response: currentConf.interceptors.response
            .concat(reqConf.handlers.response || []),

          success: currentConf.interceptors.success
            .concat(reqConf.handlers.success || []),

          error: currentConf.interceptors.error
            .concat(reqConf.handlers.error || [])
        },

        processHandlers: {
          /* in progress */
        },

        method: reqConf.method,
        url: this.url(),
        params: reqConf.params,
        data: reqConf.data
      }
    }

    _generateUrl (params) {
      const paramTrailing = params ? '?' : '';

      return this.url() + currentConf.trailing + 
             paramTrailing + this._encodeParams(params);
    }

    _isRequestSuccessful (status) {
      return status === 200 || 
             status === 201 || 
             status === 204 || 
             status === 304;
    } 

    _request (userReqConf) {
      let curReqConf = this._createReqObj(userReqConf);
      console.log(curReqConf)
      curReqConf = pipe.apply(null, curReqConf.handlers.request)(curReqConf);

      const xhr = new XMLHttpRequest();

      xhr.open(curReqConf.method, this._generateUrl(curReqConf.params), true);

      Object.keys(curReqConf.headers).forEach((header) => 
          xhr.setRequestHeader(header, curReqConf.headers[header]));

      const mimes = currentConf.mimes[curReqConf.headers['Content-Type']];
      
      if(!mimes) {
        throw new Error('mimes for this content-type doesn\'t exists')
      }

      xhr.send(mimes.encode(curReqConf.data));

      return new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if(xhr.readyState == 4) {
            const res = pipe.apply(null, curReqConf.handlers.response)({
              status: xhr.status,
              statusText: xhr.statusText,
              data: xhr.responseText ? mimes.decode(xhr.responseText) : null
            });
            
            if(this._isRequestSuccessful(res.status)) {
              resolve(pipe.apply(null, curReqConf.handlers.success)(res))
            } 
            else {
              reject(pipe.apply(null, curReqConf.handlers.error)(res));
            }
          }
        }
      })
    }

    _encodeParams (params = {}) {
      const encodedParams = Object
        .keys(params)
        .reduce((acc, param) => {
          return acc + encodeURIComponent(param) + 
                 '=' + encodeURIComponent(params[param]) + 
                 '&';
        }, '');

      return encodedParams.slice(0, encodedParams.length - 1);
    }

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
