import xr from 'xr';

/*
 * Default config object
 */
const defaultConf = {
  baseUrl: '',
  suffix: null,
};

/*
 * HTTP method constants. 
 */
const METHODS = {
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
  const currentConf = Object.assign({}, defaultConf, conf);

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
        data: res.response || null,
        status: res.status,
        statusText: res.xhr.statusText
      }
    }

    _request (reqConf) {

      return xr({
        url: this.url(),
        method: reqConf.method        
      }).then(this._mapResObj);
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
