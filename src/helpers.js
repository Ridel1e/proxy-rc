const isNull = (val) => val === null;

const isNan = (val) => val !== val;

const isUndefined = (val) => val === undefined;

const isObject = (val) => val instanceof Object;

const isArray = (val) => val instanceof Array;

const isString = (val) => typeof val === 'string';

const isSymbol = (val) => typeof val === 'symbol';

const isFunction = (val) => val instanceof Function;

const isEmptyObj = (obj) => Object.keys(obj).length === 0;

const isEmptyArray = (arr) => arr.length === 0;

const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const isEmpty = (val) => {
  if (isArray(val)) { return isEmptyArray(val); }

  if (isObject(val)) { return isEmptyObj(val); }

  return val === '' || isUndefined(val) || isNan(val) || isNull(val);
}

const tryCatch = (fn, errVal) => (...args) => {
  try {
    return fn(...args);
  }
  catch (err) {
    return errVal || err;
  }
} 

const noop = () => {};

export {
  isNull,
  isNan,
  isUndefined,
  isObject,
  isArray,
  isFunction,
  isString,
  isSymbol,
  isEmpty,
  pipe,
  tryCatch,
  noop
}
