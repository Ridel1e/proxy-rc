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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(1);

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
      if ((0, _helpers.isEmpty)(url)) {
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
      if ((0, _helpers.isEmpty)(conf)) {
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
      if ((0, _helpers.isEmpty)(cntType)) {
        return this._conf.cntType;
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
      if ((0, _helpers.isEmpty)(suf)) {
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
      if (_trailing === undefined) {
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
/* 1 */
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

var _xr = __webpack_require__(3);

var _xr2 = _interopRequireDefault(_xr);

var _helpers = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * HTTP method constants. 
 */
var methods = {
  DELETE: _xr2.default.Methods.DELETE,
  GET: _xr2.default.Methods.GET,
  PATCH: _xr2.default.Methods.PATCH,
  POST: _xr2.default.Methods.POST,
  PUT: _xr2.default.Methods.PUT

  /**
   * 
   * @param {*} conf 
   */
};var createRC = function createRC(conf) {
  var currentConf = conf;

  var Resource = function () {
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

    _createClass(Resource, [{
      key: 'delete',
      value: function _delete() {
        var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return this._request(Object.assign({}, conf, { method: methods.DELETE }));
      }
    }, {
      key: 'get',
      value: function get(params) {
        var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return this._request(Object.assign({}, conf, { method: methods.GET, params: params }));
      }
    }, {
      key: 'patch',
      value: function patch(data) {
        var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return this._request(Object.assign({}, conf, { method: methods.PATCH, data: data }));
      }
    }, {
      key: 'post',
      value: function post(data) {
        var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return this._request(Object.assign({}, conf, { method: methods.POST, data: data }));
      }
    }, {
      key: 'put',
      value: function put(data) {
        var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return this._request(Object.assign({}, conf, { method: methods.PUT, data: data }));
      }
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
    }, {
      key: '_mapResObj',
      value: function _mapResObj(res) {
        return {
          data: JSON.parse(res.response) || null,
          status: res.status,
          statusText: res.xhr.statusText
        };
      }

      /**
       * 
       * @param {*} reqConf 
       */

    }, {
      key: '_createReqObj',
      value: function _createReqObj(reqConf) {
        return {
          headers: Object.assign({}, {
            'Content-Type': currentConf.contentType
          }, reqConf.headers),

          handlers: {
            request: [].concat(_toConsumableArray(currentConf.interceptors.request)),
            response: [].concat(_toConsumableArray(currentConf.interceptors.response)),
            success: [].concat(_toConsumableArray(currentConf.interceptors.success)),
            error: [].concat(_toConsumableArray(currentConf.interceptors.error))
          },

          processHandlers: {
            /* in progress */
          },

          method: reqConf.method,
          url: this.url(),
          params: reqConf.params,
          data: reqConf.data
        };
      }
    }, {
      key: '_generateUrl',
      value: function _generateUrl(params) {
        var paramTrailing = params ? '?' : '';

        return this.url() + currentConf.trailing + paramTrailing + this._encodeParams(params);
      }
    }, {
      key: '_isRequestSuccessful',
      value: function _isRequestSuccessful(status) {
        return status === 200 || status === 201 || status === 204 || status === 304;
      }
    }, {
      key: '_request',
      value: function _request(userReqConf) {
        var _this = this;

        var curReqConf = this._createReqObj(userReqConf);

        curReqConf = _helpers.pipe.apply(null, curReqConf.handlers.request)(curReqConf);

        var xhr = new XMLHttpRequest();

        xhr.open(curReqConf.method, this._generateUrl(curReqConf.params), true);

        Object.keys(curReqConf.headers).forEach(function (header) {
          return xhr.setRequestHeader(header, curReqConf.headers[header]);
        });

        var mimes = currentConf.mimes[curReqConf.headers['Content-Type']];

        if (!mimes) {
          throw new Error('mimes for this content-type doesn\'t exists');
        }

        xhr.send(mimes.encode(curReqConf.data));

        return new Promise(function (resolve, reject) {
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              var res = _helpers.pipe.apply(null, curReqConf.handlers.response)({
                status: xhr.status,
                statusText: xhr.statusText,
                data: xhr.responseText ? mimes.decode(xhr.responseText) : null
              });

              if (_this._isRequestSuccessful(res.status)) {
                resolve(_helpers.pipe.apply(null, curReqConf.handlers.success)(res));
              }

              reject(_helpers.pipe.apply(null, curReqConf.handlers.error)(res));
            }
          };
        });
      }
    }, {
      key: '_encodeParams',
      value: function _encodeParams() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var encodedParams = Object.keys(params).reduce(function (acc, param) {
          return acc + encodeURIComponent(param) + '=' + encodeURIComponent(params[param]) + '&';
        }, '');

        return encodedParams.slice(0, encodedParams.length - 1);
      }
    }], [{
      key: 'clone',
      value: function clone(res, id) {
        var copy = new Resource(res._parent, res._name, id);
        copy._resources = res._resources;

        return copy;
      }
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["xr.js"]=t():e["xr.js"]=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="/",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";var r=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e};Object.defineProperty(t,"__esModule",{value:!0});var o=n(2),s=n(5),a={method:s.METHODS.GET,data:void 0,headers:{Accept:"application/json","Content-Type":"application/json"},dump:JSON.stringify,load:JSON.parse,xmlHttpRequest:function(){return new XMLHttpRequest},promise:function(e){return new Promise(e)},withCredentials:!1},u=function(e,t){return{status:e.status,response:e.response,data:t,xhr:e}},i=r({},a),d=function(e){i=r({},i,e)},c=function(e,t){return(e&&e.promise?e.promise:i.promise||a.promise)(t)},p=function(e){return c(e,function(t,n){var d=r({},a,i,e),c=d.xmlHttpRequest();if(d.abort&&e.abort(function(){n(u(c)),c.abort()}),void 0===d.url)throw new Error("No URL defined");c.open(d.method,d.params?d.url.split("?")[0]+"?"+o.encode(d.params):d.url,!0),c.withCredentials=d.withCredentials,c.addEventListener(s.EVENTS.LOAD,function(){if(c.status>=200&&c.status<300){var e;c.responseText&&(e=d.raw===!0?c.responseText:d.load(c.responseText)),t(u(c,e))}else n(u(c))}),c.addEventListener(s.EVENTS.ABORT,function(){return n(u(c))}),c.addEventListener(s.EVENTS.ERROR,function(){return n(u(c))}),c.addEventListener(s.EVENTS.TIMEOUT,function(){return n(u(c))});for(var p in d.headers)({}).hasOwnProperty.call(d.headers,p)&&c.setRequestHeader(p,d.headers[p]);if(d.events)for(var p in d.events)({}).hasOwnProperty.call(d.events,p)&&c.addEventListener(p,d.events[p].bind(null,c),!1);var f="object"!=typeof d.data||d.raw?d.data:d.dump(d.data);void 0!==f?c.send(f):c.send()})};p.configure=d,p.Methods=s.METHODS,p.Events=s.EVENTS,p.get=function(e,t,n){return p(r({url:e,method:s.METHODS.GET,params:t},n))},p.put=function(e,t,n){return p(r({url:e,method:s.METHODS.PUT,data:t},n))},p.post=function(e,t,n){return p(r({url:e,method:s.METHODS.POST,data:t},n))},p.patch=function(e,t,n){return p(r({url:e,method:s.METHODS.PATCH,data:t},n))},p.del=function(e,t){return p(r({url:e,method:s.METHODS.DELETE},t))},p.options=function(e,t){return p(r({url:e,method:s.METHODS.OPTIONS},t))},t.default=p},function(e,t,n){"use strict";t.decode=t.parse=n(3),t.encode=t.stringify=n(4)},function(e,t){"use strict";function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,t,r,o){t=t||"&",r=r||"=";var s={};if("string"!=typeof e||0===e.length)return s;var a=/\+/g;e=e.split(t);var u=1e3;o&&"number"==typeof o.maxKeys&&(u=o.maxKeys);var i=e.length;u>0&&i>u&&(i=u);for(var d=0;d<i;++d){var c,p,f,l,E=e[d].replace(a,"%20"),T=E.indexOf(r);T>=0?(c=E.substr(0,T),p=E.substr(T+1)):(c=E,p=""),f=decodeURIComponent(c),l=decodeURIComponent(p),n(s,f)?Array.isArray(s[f])?s[f].push(l):s[f]=[s[f],l]:s[f]=l}return s}},function(e,t){"use strict";var n=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,r,o){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map(function(o){var s=encodeURIComponent(n(o))+r;return Array.isArray(e[o])?e[o].map(function(e){return s+encodeURIComponent(n(e))}).join(t):s+encodeURIComponent(n(e[o]))}).join(t):o?encodeURIComponent(n(o))+r+encodeURIComponent(n(e)):""}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.METHODS={GET:"GET",POST:"POST",PUT:"PUT",DELETE:"DELETE",PATCH:"PATCH",OPTIONS:"OPTIONS",HEAD:"HEAD"},t.EVENTS={READY_STATE_CHANGE:"readystatechange",LOAD_START:"loadstart",PROGRESS:"progress",ABORT:"abort",ERROR:"error",LOAD:"load",TIMEOUT:"timeout",LOAD_END:"loadend"}}])});

/***/ })
/******/ ]);
});
//# sourceMappingURL=proxy-rest-client.js.map