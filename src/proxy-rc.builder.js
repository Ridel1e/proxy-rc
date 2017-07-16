import {
  isUndefined,
  isObject,
  isString,
  isFunction
} from './helpers';
import {createRC} from './proxy-rc';

class RCBuilder {
  constructor (conf = {}) {
    if(!isObject(conf)) {
      throw new Error('config must be an Object');
    }

    this._conf = Object
      .assign({}, conf, RCBuilder._defaultConfig);
  }

  /**
   * Adds mime to builder config.
   * @param {string} name 
   * @param {Object} handlers
   * @returns {RcBuilder} instance of RCBuilder
   */
  addMime (name, handlers) {
    if(!isString(name)) {
      throw new Error('name of mime must be a String')
    }

    if(!isObject(handlers)) {
       throw new Error('mime handlers must be an Object'); 
    }

    if(!isFunction(handlers.encode) || !isFunction(handlers.decode)) {
      throw new Error('encode and decode must be a function');
    }

    this._conf.mimes[name] = handlers;

    return this;
  }

  /**
   * Sets baseUrl to config if url is not empty
   * Returns current baseUrl if url is empty
   * @param {string|undefined} url
   * @returns {url|RCBuilder} 
   */
  baseUrl (url) {
    if(isUndefined(url)) { return this._conf.baseUrl; }

    if(!isString(url)) { 
      throw new Error('url must be a string');
    }

    this._conf.baseUrl = url;

    return this; 
  }

  /**
   * Build RC by conf
   * @returns {Resource}
   */
  build () {
    return createRC(this._conf);
  }

  /**
   * 
   * @param {*} conf 
   */
  config (conf) {
    if(isUndefined(conf)) { return this._conf; }

    if(!isObject(conf)) {
      throw new Error('conf must be an Object');
    }

    this._conf = Object.assign({}, this._conf, conf);

    return this;
  }

  /**
   * 
   * @param {*} cntType 
   */
  contentType (cntType) {
    if(isUndefined(cntType)) { return this._conf.contentType; }

    if(!isString(cntType)) {
      throw new Error('contentType must be a String');
    }

    this._conf.contentType = cntType;

    return this;
  }

  /**
   * 
   * @param {*} suf 
   */
  suffix (suf) {
    if(isUndefined(suf)) { return this._conf.suffix; }
    
    if(!isString(suf)) {
      throw new Error('suffix must be a String');
    }

    this._conf.suffix = suf;

    return this;
  }

  /**
   * 
   * @param {*} trailing 
   */
  trailing (trailing) {
    if(isUndefined(trailing)) { return this._conf.trailing; }

    if(!isString(trailing)) {
      throw new Error('trailing must be a String');
    }

    this._conf.trailing = trailing;

    return this;
  }

  on (event, handler) {
    if(!isString(event)) { 
      throw new Error('event must be a String');
    }

    if(!isFunction(handler)) {
      throw new Error('handler must be a function');
    }

    this._conf.interceptors[event].push(handler);

    return this;
  }

  static get _defaultConfig () {
    return {
      baseUrl: '',
      suffix: null,
      contentType: 'application/json',
      trailing: '',
      mimes: {
        'application/json': { encode: JSON.stringify, decode: JSON.parse },
        'application/xml': { /* in progress */ }
      },
      interceptors: {
        request: [],
        response: [],
        success: [],
        error: []
      }
    }
  }
}

module.exports = (conf) => new RCBuilder(conf);
