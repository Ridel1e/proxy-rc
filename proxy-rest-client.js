(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["createRCBuilder"] = factory();
	else
		root["createRCBuilder"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isNull = function isNull(val) {
  return val === null;
};

var isNan = function isNan(val) {
  return val !== val;
};

var isUndefined = function isUndefined(val) {
  return val === undefined;
};

var isObject = function isObject(val) {
  return val instanceof Object;
};

var isArray = function isArray(val) {
  return val instanceof Array;
};

var isString = function isString(val) {
  return typeof val === 'string';
};

var isSymbol = function isSymbol(val) {
  return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'symbol';
};

var isFunction = function isFunction(val) {
  return val instanceof Function;
};

var isEmptyObj = function isEmptyObj(obj) {
  return Object.keys(obj).length === 0;
};

var isEmptyArray = function isEmptyArray(arr) {
  return arr.length === 0;
};

var pipe = function pipe() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (x) {
    return fns.reduce(function (acc, fn) {
      return fn(acc);
    }, x);
  };
};

var isEmpty = function isEmpty(val) {
  if (isArray(val)) {
    return isEmptyArray(val);
  }

  if (isObject(val)) {
    return isEmptyObj(val);
  }

  return val === '' || isUndefined(val) || isNan(val) || isNull(val);
};

var tryCatch = function tryCatch(fn, errVal) {
  return function () {
    try {
      return fn.apply(undefined, arguments);
    } catch (err) {
      return errVal || err;
    }
  };
};

var noop = function noop() {};

exports.isNull = isNull;
exports.isNan = isNan;
exports.isUndefined = isUndefined;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isSymbol = isSymbol;
exports.isEmpty = isEmpty;
exports.pipe = pipe;
exports.tryCatch = tryCatch;
exports.noop = noop;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(0);

var _proxyRc = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RCBuilder = function () {
  function RCBuilder() {
    var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, RCBuilder);

    if (!(0, _helpers.isObject)(conf)) {
      throw new Error('config must be an Object');
    }

    this._conf = Object.assign({}, conf, RCBuilder._defaultConfig);
  }

  /**
   * Adds mime to builder config.
   * @param {string} name 
   * @param {Object} handlers
   * @returns {RcBuilder} instance of RCBuilder
   */


  _createClass(RCBuilder, [{
    key: 'addMime',
    value: function addMime(name, handlers) {
      if (!(0, _helpers.isString)(name)) {
        throw new Error('name of mime must be a String');
      }

      if (!(0, _helpers.isObject)(handlers)) {
        throw new Error('mime handlers must be an Object');
      }

      if (!(0, _helpers.isFunction)(handlers.encode) || !(0, _helpers.isFunction)(handlers.decode)) {
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

  }, {
    key: 'baseUrl',
    value: function baseUrl(url) {
      if ((0, _helpers.isUndefined)(url)) {
        return this._conf.baseUrl;
      }

      if (!(0, _helpers.isString)(url)) {
        throw new Error('url must be a string');
      }

      this._conf.baseUrl = url;

      return this;
    }

    /**
     * Build RC by conf
     * @returns {Resource}
     */

  }, {
    key: 'build',
    value: function build() {
      return (0, _proxyRc.createRC)(this._conf);
    }

    /**
     * 
     * @param {*} conf 
     */

  }, {
    key: 'config',
    value: function config(conf) {
      if ((0, _helpers.isUndefined)(conf)) {
        return this._conf;
      }

      if (!(0, _helpers.isObject)(conf)) {
        throw new Error('conf must be an Object');
      }

      this._conf = Object.assign({}, this._conf, conf);

      return this;
    }

    /**
     * 
     * @param {*} cntType 
     */

  }, {
    key: 'contentType',
    value: function contentType(cntType) {
      if ((0, _helpers.isUndefined)(cntType)) {
        return this._conf.contentType;
      }

      if (!(0, _helpers.isString)(cntType)) {
        throw new Error('contentType must be a String');
      }

      this._conf.contentType = cntType;

      return this;
    }

    /**
     * 
     * @param {*} suf 
     */

  }, {
    key: 'suffix',
    value: function suffix(suf) {
      if ((0, _helpers.isUndefined)(suf)) {
        return this._conf.suffix;
      }

      if (!(0, _helpers.isString)(suf)) {
        throw new Error('suffix must be a String');
      }

      this._conf.suffix = suf;

      return this;
    }

    /**
     * 
     * @param {*} trailing 
     */

  }, {
    key: 'trailing',
    value: function trailing(_trailing) {
      if ((0, _helpers.isUndefined)(_trailing)) {
        return this._conf.trailing;
      }

      if (!(0, _helpers.isString)(_trailing)) {
        throw new Error('trailing must be a String');
      }

      this._conf.trailing = _trailing;

      return this;
    }
  }, {
    key: 'on',
    value: function on(event, handler) {
      if (!(0, _helpers.isString)(event)) {
        throw new Error('event must be a String');
      }

      if (!(0, _helpers.isFunction)(handler)) {
        throw new Error('handler must be a function');
      }

      this._conf.interceptors[event].push(handler);

      return this;
    }
  }], [{
    key: '_defaultConfig',
    get: function get() {
      return {
        baseUrl: '',
        suffix: null,
        contentType: 'application/json',
        trailing: '',
        mimes: {
          'application/json': { encode: JSON.stringify, decode: JSON.parse },
          'application/xml': {/* in progress */}
        },
        interceptors: {
          request: [],
          response: [],
          success: [],
          error: []
        }
      };
    }
  }]);

  return RCBuilder;
}();

module.exports = function (conf) {
  return new RCBuilder(conf);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRC = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * HTTP method constants. 
 */
var methods = {
  DELETE: 'DELETE',
  GET: 'GET',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT'
};

var encodeNoop = function encodeNoop(val) {
  console.warn('encode fn for requested content-type doen\'t exists');
  return val;
};

var decodeNoop = function decodeNoop(val) {
  console.warn('decode fn for requested content-type doen\'t exists');
  return val;
};

var getContentTypeWithoutCharset = function getContentTypeWithoutCharset(hdr) {
  return hdr.split(';')[0];
};

/**
 * Factory Function. Create new Resource object 
 * @func createRC
 * @param {*} conf 
 */
var createRC = function createRC(conf) {
  var currentConf = conf;

  var Resource = function () {

    /**
     * Constructor
     * @param {*} parent 
     * @param {*} name 
     * @param {*} id 
     */
    function Resource() {
      var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      _classCallCheck(this, Resource);

      this._parent = parent;
      this._name = name;
      this._id = id;
      this._resources = {};

      return new Proxy(this, Resource._proxyHandler);
    }

    /**
     * 
     * @param {*} conf 
     */


    _createClass(Resource, [{
      key: 'delete',
      value: function _delete() {
        var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return this._request(Object.assign({}, conf, { method: methods.DELETE }));
      }

      /**
       * 
       * @param {*} params 
       * @param {*} conf 
       */

    }, {
      key: 'get',
      value: function get(params) {
        var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return this._request(Object.assign({}, conf, { method: methods.GET, params: params }));
      }

      /**
       * 
       * @param {*} data 
       * @param {*} conf 
       */

    }, {
      key: 'patch',
      value: function patch(data) {
        var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return this._request(Object.assign({}, conf, { method: methods.PATCH, data: data }));
      }

      /**
       * 
       * @param {*} data 
       * @param {*} conf 
       */

    }, {
      key: 'post',
      value: function post(data) {
        var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return this._request(Object.assign({}, conf, { method: methods.POST, data: data }));
      }

      /**
       * 
       * @param {*} data 
       * @param {*} conf 
       */

    }, {
      key: 'put',
      value: function put(data) {
        var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return this._request(Object.assign({}, conf, { method: methods.PUT, data: data }));
      }

      /**
       * 
       * @param {*} suffix 
       */

    }, {
      key: 'url',
      value: function url() {
        var suffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var url = this._parent ? this._parent.url(false) : currentConf.baseUrl;

        if (this._name) {
          url += '/' + this._name;
        }
        if (this._id) {
          url += '/' + this._id;
        }
        if (suffix && currentConf.suffix) {
          url += '.' + currentConf.suffix;
        }

        return url;
      }

      /**
       * 
       * @param {*} reqConf 
       */

    }, {
      key: '_createReqConf',
      value: function _createReqConf(reqConf) {
        return {
          headers: Object.assign({}, {
            'Content-Type': currentConf.contentType
          }, reqConf.headers),

          onUploadProgress: reqConf.onUploadProgress || _helpers.noop,
          onDownloadProgress: reqConf.onDownloadProgress || _helpers.noop,

          method: reqConf.method,
          url: this.url(),
          params: reqConf.params,
          data: reqConf.data
        };
      }

      /**
       * 
       * @param {*} params 
       */

    }, {
      key: '_generateUrl',
      value: function _generateUrl(params) {
        var paramTrailing = params ? '?' : '';

        return this.url() + currentConf.trailing + paramTrailing + this._encodeParams(params);
      }

      /**
       * 
       * @param {*} status 
       */

    }, {
      key: '_isRequestSuccessful',
      value: function _isRequestSuccessful(status) {
        return status === 200 || status === 201 || status === 204 || status === 304;
      }

      /**
       * 
       * @param {*} userReqConf 
       */

    }, {
      key: '_request',
      value: function _request(userReqConf) {
        var _this = this;

        var handleRequest = _helpers.pipe.apply(undefined, _toConsumableArray(currentConf.interceptors.request));
        var createThenHandleReqConf = (0, _helpers.pipe)(this._createReqConf.bind(this), handleRequest);

        var currentReqConf = createThenHandleReqConf(userReqConf);

        var xhr = new XMLHttpRequest();
        xhr.open(currentReqConf.method, this._generateUrl(currentReqConf.params), true);

        xhr.upload.onprogress = currentConf.onUploadProgress;
        xhr.onprogress = currentConf.onDownloadProgress;

        /* sets all nesesarry headers for xhr obj */
        Object.keys(currentReqConf.headers).forEach(function (header) {
          return xhr.setRequestHeader(header, currentReqConf.headers[header]);
        });

        var mime = currentConf.mimes[currentReqConf.headers['Content-Type']] || {};
        var encodeOrRaw = (0, _helpers.tryCatch)(mime.encode || encodeNoop, currentReqConf.data);

        xhr.send(encodeOrRaw(currentReqConf.data));

        return new Promise(function (resolve, reject) {
          return xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              var handlerResponse = _helpers.pipe.apply(undefined, _toConsumableArray(currentConf.interceptors.response));
              var handlerSuccess = _helpers.pipe.apply(undefined, _toConsumableArray(currentConf.interceptors.success));
              var handleError = _helpers.pipe.apply(undefined, _toConsumableArray(currentConf.interceptors.error));

              var getResCntType = (0, _helpers.pipe)(xhr.getResponseHeader.bind(xhr, 'Content-Type'), getContentTypeWithoutCharset);

              var _mime = currentConf.mimes[getResCntType()] || {};
              var decodeOrRaw = (0, _helpers.tryCatch)(_mime.decode || decodeNoop, xhr.responseText);

              var res = handlerResponse({
                status: xhr.status,
                statusText: xhr.statusText,
                data: decodeOrRaw(xhr.responseText),
                config: currentReqConf
              });

              if (_this._isRequestSuccessful(res.status)) {
                resolve(handlerSuccess(res));
              } else {
                reject(handleError(res));
              }
            }
          };
        });
      }

      /**
       * 
       * @param {*} params 
       */

    }, {
      key: '_encodeParams',
      value: function _encodeParams(params) {
        var encodedParams = Object.keys(params || {}).reduce(function (acc, param) {
          return acc + encodeURIComponent(param) + '=' + encodeURIComponent(params[param]) + '&';
        }, '');

        return encodedParams.slice(0, encodedParams.length - 1);
      }

      /**
       * 
       */

    }], [{
      key: 'clone',


      /**
       * 
       * @param {*} res 
       * @param {*} id 
       */
      value: function clone(res, id) {
        var copy = new Resource(res._parent, res._name, id);
        copy._resources = res._resources;

        return copy;
      }
    }, {
      key: '_noopHandlers',
      get: function get() {
        return {
          request: [],
          response: [],
          error: [],
          success: []
        };
      }

      /**
       * 
       */

    }, {
      key: '_proxyHandler',
      get: function get() {
        return {
          get: function get(trgt, prop) {
            if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'symbol') {
              return trgt[prop];
            }
            /* Because default value of id and parent is null, we need to create
              new resource only if property is undefined */
            if (trgt[prop] !== undefined) {
              return trgt[prop];
            }

            var res = new Resource(trgt, prop);

            trgt._resources[prop] = res;
            trgt[prop] = function (id) {
              return id ? Resource.clone(res, id) : res;
            };

            return trgt[prop];
          }
        };
      }
    }]);

    return Resource;
  }();

  /* 
     after version 6.4.0 of node console.log try to call inspect method for
     custom object inspect (if it exists). So we place null to it.
   */


  Resource.prototype.inspect = null;

  return new Resource();
};

exports.createRC = createRC;

/***/ })
/******/ ]);
});
//# sourceMappingURL=proxy-rest-client.js.map