import { c as commonjsGlobal, S as Stanza, d as defineStanzaElement } from './stanza-2ddafdb3.js';

var lodash_isequal = {exports: {}};

/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

(function (module, exports) {
/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;
}(lodash_isequal, lodash_isequal.exports));

function unwrapValueFromBinding(queryResult) {
  const bindings = queryResult.results.bindings;

  return bindings.map((binding) => {
    const ret = {};

    Object.keys(binding).forEach((key) => {
      ret[key] = binding[key].value;
    });

    return ret;
  });
}

class SilkwormDetailsSearch extends Stanza {
	async render() {
		try {

			//***************************************
			//  系統リソース情報
			//***************************************
			const resultsInformation = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_strain.rq.hbs',
				parameters: {
					id		: `${this.params['id']}`,
					language: `${this.params['language']}`,
				},
			});
			const resultsReference = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_reference.rq.hbs',
				parameters: {
					id		: `${this.params['id']}`,
					language: `${this.params['language']}`,
				},
			});

			//***************************************
			//  卵リソース情報
			//***************************************
			const resultsEgg = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_egg.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_egg`,
				},
			});
			const resultsEggImage = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_egg`,
				},
			});
			const resultsEggPhenotype = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_egg`,
					language: `${this.params['language']}`,
				},
			});
			const resultsEggGene = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_egg`,
				},
			});

			//***************************************
			//  幼虫リソース情報
			//***************************************
			const resultsLarva = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_larva.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
				},
			});
			const resultsLarvaImage = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
				},
			});
			const resultsLarvaPhenotype = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
					language: `${this.params['language']}`,
				},
			});
			const resultsLarvaFeeding = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_feeding_ability.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
					language: `${this.params['language']}`,
				},
			});
			const resultsLarvaGene = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
				},
			});

			//***************************************
			//  蛹リソース情報
			//***************************************
			const resultsPupa = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_pupa.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
				},
			});
			const resultsPupaImage = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
				},
			});
			const resultsPupaPhenotype = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
					language: `${this.params['language']}`,
				},
			});
			const resultsPupaGene = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
				},
			});

			//***************************************
			//  成虫リソース情報
			//***************************************
			const resultsAdult = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_adult.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
				},
			});
			const resultsAdultImage = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
				},
			});
			const resultsAdultPhenotype = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
					language: `${this.params['language']}`,
				},
			});
			const resultsAdultGene = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
				},
			});

			this.renderTemplate({
				template: 'stanza.html.hbs',
				parameters: {
					information		: unwrapValueFromBinding(resultsInformation),
					reference		: unwrapValueFromBinding(resultsReference),

					egg				: unwrapValueFromBinding(resultsEgg),
					egg_image		: unwrapValueFromBinding(resultsEggImage),
					egg_phenotype	: unwrapValueFromBinding(resultsEggPhenotype),
					egg_gene		: unwrapValueFromBinding(resultsEggGene),

					larva			: unwrapValueFromBinding(resultsLarva),
					larva_image		: unwrapValueFromBinding(resultsLarvaImage),
					larva_phenotype	: unwrapValueFromBinding(resultsLarvaPhenotype),
					larva_feeding	: unwrapValueFromBinding(resultsLarvaFeeding),
					larva_gene		: unwrapValueFromBinding(resultsLarvaGene),

					pupa			: unwrapValueFromBinding(resultsPupa),
					pupa_image		: unwrapValueFromBinding(resultsPupaImage),
					pupa_phenotype	: unwrapValueFromBinding(resultsPupaPhenotype),
					pupa_gene		: unwrapValueFromBinding(resultsPupaGene),

					adult			: unwrapValueFromBinding(resultsAdult),
					adult_image		: unwrapValueFromBinding(resultsAdultImage),
					adult_phenotype	: unwrapValueFromBinding(resultsAdultPhenotype),
					adult_gene		: unwrapValueFromBinding(resultsAdultGene),

				}
			});

		} catch (e) {
			console.error(e);
		}
	}
}

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': SilkwormDetailsSearch
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "silkworm-details-search",
	"stanza:label": "Silkworm details search",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Text",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "",
	"stanza:address": "",
	"stanza:contributor": [
],
	"stanza:created": "2021-09-09",
	"stanza:updated": "2021-09-09",
	"stanza:parameter": [
	{
		"stanza:key": "id",
		"stanza:type": "string",
		"stanza:example": "k32",
		"stanza:description": "Strain ID",
		"stanza:required": true
	},
	{
		"stanza:key": "language",
		"stanza:type": "string",
		"stanza:example": "en",
		"stanza:description": "Language",
		"stanza:required": true
	}
],
	"stanza:menu-placement": "bottom-right",
	"stanza:style": [
	{
		"stanza:key": "--greeting-color",
		"stanza:type": "color",
		"stanza:default": "#eb7900",
		"stanza:description": "text color of greeting"
	},
	{
		"stanza:key": "--greeting-align",
		"stanza:type": "single-choice",
		"stanza:choice": [
			"left",
			"center",
			"right"
		],
		"stanza:default": "center",
		"stanza:description": "text align of greeting"
	}
],
	"stanza:incomingEvent": [
],
	"stanza:outgoingEvent": [
]
};

var templates = [
  ["stanza.html.hbs", {"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<table class=\"table table-sm table-striped table-bordered table-information\">\n		<thead class=\"thead-dark\">\n			<th colspan=\"2\"><h4>Information</h4></th>\n		</thead>\n		<tr>\n			<th class=\"sub-title\">Strain</th>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"strain") : stack1), depth0))
    + "</td>\n		</tr>\n		<tr>\n			<th class=\"sub-title\">Taxonomy ID</th>\n			<td><a href=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"taxonomy_id") : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"taxonomy_id") : stack1), depth0))
    + "</a></td>\n		</tr>\n		<tr>\n			<th class=\"sub-title\">Origin</th>\n			<td>"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"origin") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n		</tr>\n		<tr>\n			<th class=\"sub-title\">Description</th>\n			<td>"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"description") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n		</tr>\n		<tr>\n			<th class=\"sub-title\">Reference</th>\n			<td>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"author_name") : stack1), depth0))
    + " ("
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"date") : stack1), depth0))
    + "). "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"puclication_name") : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"volume") : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"number") : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"starting_page") : stack1), depth0))
    + "-"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"ending_page") : stack1), depth0))
    + ".\n				<a href=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "</a><br/>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			</td>\n		</tr>\n		<tr>\n			<th class=\"sub-title\">RRC</th>\n			<td>"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"rrc") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n		</tr>\n		<tr>\n			<th class=\"sub-title\">HomePage</th>\n			<td><a href=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"homepage") : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"homepage") : stack1), depth0))
    + "</a></td>\n		</tr>\n	</table>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "	<p>No data found.</p>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<table class=\"table table-sm table-striped table-bordered table-egg\">\n		<thead class=\"thead-dark\">\n			<th colspan=\"4\"><h4>Egg</h4></th>\n		</thead>\n		<tr>\n			<th colspan=\"1\" class=\"sub-title\">Resource State</th>\n			<td colspan=\"3\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"resource_state") : stack1), depth0))
    + "</td>\n		</tr>\n		<tr>\n			<th colspan=\"1\" class=\"sub-title\">Image</th>\n			<td colspan=\"3\">\n";
},"11":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"egg_image") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":72,"column":2},"end":{"line":74,"column":11}}})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<img width=\"120px\" src=\""
    + container.escapeExpression(container.lambda(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"image") : stack1), depth0))
    + "\">\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "			</td>\n		</tr>\n";
},"16":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<thead class=\"thead-dark\">\n			<th colspan=4\">Phenotype</th>\n		</thead>\n		<tr>\n			<th>Phenotype</th>\n			<th>BMPO</th>\n			<th>DPO</th>\n			<th>Reference</th>\n		</tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"egg_phenotype") : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":90,"column":2},"end":{"line":97,"column":11}}})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<tr>\n			<td>"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"label") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n			<td>"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"bmpo") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n			<td>"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"dpo") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n			<td>"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"reference") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n		</tr>\n";
},"19":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<thead class=\"thead-dark\">\n			<th colspan=4\">Gene</th><\n		/thead>\n		<tr>\n			<th>Gene ID</th>\n			<th>Name</th>\n			<th>Synonym</th>\n			<th>URL</th>\n		</tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"egg_gene") : depth0),{"name":"each","hash":{},"fn":container.program(20, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":109,"column":2},"end":{"line":116,"column":11}}})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<tr>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"synonym") : stack1), depth0))
    + "</td>\n			<td>"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"url") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n		</tr>\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "	</table>\n";
},"24":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<table class=\"table table-sm table-striped table-bordered table-larva\">\n		<thead class=\"thead-dark\">\n			<th colspan=\"9\"><h4>Larva</h4></th>\n		</thead>\n		<tr>\n			<th colspan=\"1\" class=\"sub-title\">Resource State</th>\n			<td colspan=\"8\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"resource_state") : stack1), depth0))
    + "</td>\n		</tr>\n		<tr>\n			<th colspan=\"1\" class=\"sub-title\">Image</th>\n			<td colspan=\"8\">\n";
},"26":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"larva_image") : depth0),{"name":"each","hash":{},"fn":container.program(27, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":139,"column":2},"end":{"line":141,"column":11}}})) != null ? stack1 : "");
},"27":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<img width=\"120px\" src=\""
    + container.escapeExpression(container.lambda(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"image") : stack1), depth0))
    + "\">\n";
},"29":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<thead class=\"thead-dark\">\n			<th colspan=\"9\">Phenotype</th>\n		</thead>\n		<tr>\n			<th colspan=\"1\">Phenotype</th>\n			<th colspan=\"2\">BMPO</th>\n			<th colspan=\"2\">DPO</th>\n			<th colspan=\"4\">Reference</th>\n		</tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"larva_phenotype") : depth0),{"name":"each","hash":{},"fn":container.program(30, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":157,"column":2},"end":{"line":164,"column":11}}})) != null ? stack1 : "");
},"30":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<tr>\n			<td colspan=\"1\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"label") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n			<td colspan=\"2\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"bmpo") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n			<td colspan=\"2\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"dpo") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n			<td colspan=\"4\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"reference") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n		</tr>\n";
},"32":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<thead class=\"thead-dark\">\n			<th colspan=\"9\">Feeding ability of artificial diets</th>\n		</thead>\n		<tr>\n			<th colspan=\"3\">Feeding ability</th>\n			<th colspan=\"3\">BMPO</th>\n			<th colspan=\"3\">Description</th>\n		</tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"larva_feeding") : depth0),{"name":"each","hash":{},"fn":container.program(33, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":175,"column":2},"end":{"line":181,"column":11}}})) != null ? stack1 : "");
},"33":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<tr>\n			<td colspan=\"3\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"label") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n			<td colspan=\"3\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"bmpo") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n			<td colspan=\"3\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"description") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n		</tr>\n";
},"35":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<thead class=\"thead-dark\">\n			<th colspan=\"9\">Larva Period : "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"larva_period") : stack1), depth0))
    + " (hour)</th>\n		</thead>\n		<tr>\n			<th>1st instar</th>\n			<th>1st diapause</th>\n			<th>2nd instar</th>\n			<th>2nd diapause</th>\n			<th>3th instar</th>\n			<th>3th diapause</th>\n			<th>4th instar</th>\n			<th>4th diapause</th>\n			<th>5th instar</th>\n		</tr>\n		<tr>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"1st_instar") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"1st_diapause") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"2nd_instar") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"2nd_diapause") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"3th_instar") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"3th_diapause") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"4th_instar") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"4th_diapause") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"5th_instar") : stack1), depth0))
    + "</td>\n		</tr>\n";
},"37":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<thead class=\"thead-dark\">\n			<th colspan=9\">Gene</th>\n		</thead>\n		<tr>\n			<th colspan=\"1\">Gene ID</th>\n			<th colspan=\"2\">Name</th>\n			<th colspan=\"2\">Synonym</th>\n			<th colspan=\"4\">URL</th>\n		</tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"larva_gene") : depth0),{"name":"each","hash":{},"fn":container.program(38, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":220,"column":2},"end":{"line":227,"column":11}}})) != null ? stack1 : "");
},"38":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<tr>\n			<td colspan=\"1\">"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "</td>\n			<td colspan=\"2\">"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</td>\n			<td colspan=\"2\">"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"synonym") : stack1), depth0))
    + "</td>\n			<td colspan=\"4\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"url") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n		</tr>\n";
},"40":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<table class=\"table table-sm table-striped table-bordered table-pupa\">\n		<thead class=\"thead-dark\">\n			<th colspan=\"4\"><h4>Pupa</h4></th>\n		</thead>\n		<tr>\n			<th colspan=\"1\" class=\"sub-title\">Resource State</th>\n			<td colspan=\"3\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"resource_state") : stack1), depth0))
    + "</td>\n		</tr>\n		<tr>\n			<th colspan=\"1\" class=\"sub-title\">Image</th>\n			<td colspan=\"3\">\n";
},"42":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"pupa_image") : depth0),{"name":"each","hash":{},"fn":container.program(43, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":250,"column":2},"end":{"line":252,"column":11}}})) != null ? stack1 : "");
},"43":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<img width=\"120px\" src=\""
    + container.escapeExpression(container.lambda(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"image") : stack1), depth0))
    + "\">\n";
},"45":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<thead class=\"thead-dark\">\n			<th colspan=4\">Phenotype</th>\n		</thead>\n		<tr>\n			<th colspan=\"1\">Phenotype</th>\n			<th colspan=\"2\">BMPO</th>\n			<th colspan=\"1\">DPO</th>\n		</tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"pupa_phenotype") : depth0),{"name":"each","hash":{},"fn":container.program(46, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":267,"column":2},"end":{"line":273,"column":11}}})) != null ? stack1 : "");
},"46":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<tr>\n			<td colspan=\"1\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"label") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n			<td colspan=\"2\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"bmpo") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n			<td colspan=\"1\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"dpo") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n		</tr>\n";
},"48":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<thead class=\"thead-dark\">\n			<th colspan=4\">Gene</th>\n		</thead>\n		<tr>\n			<th>Gene ID</th>\n			<th>Name</th>\n			<th>Synonym</th>\n			<th>URL</th>\n		</tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"pupa_gene") : depth0),{"name":"each","hash":{},"fn":container.program(49, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":285,"column":2},"end":{"line":292,"column":11}}})) != null ? stack1 : "");
},"49":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<tr>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"synonym") : stack1), depth0))
    + "</td>\n			<td>"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"url") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n		</tr>\n";
},"51":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<table class=\"table table-sm table-striped table-bordered table-adult\">\n		<thead class=\"thead-dark\">\n			<th colspan=\"4\"><h4>Adult</h4></th>\n		</thead>\n		<tr>\n			<th colspan=\"1\" class=\"sub-title\">Resource State</th>\n			<td colspan=\"3\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"resource_state") : stack1), depth0))
    + "</td>\n		</tr>\n		<tr>\n			<th colspan=\"1\" class=\"sub-title\">Image</th>\n			<td colspan=\"3\">\n";
},"53":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"adult_image") : depth0),{"name":"each","hash":{},"fn":container.program(54, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":315,"column":2},"end":{"line":317,"column":11}}})) != null ? stack1 : "");
},"54":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<img width=\"120px\" src=\""
    + container.escapeExpression(container.lambda(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"image") : stack1), depth0))
    + "\">\n";
},"56":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<thead class=\"thead-dark\">\n			<th colspan=4\">Phenotype</th>\n		</thead>\n		<tr>\n			<th colspan=\"1\">Phenotype</th>\n			<th colspan=\"2\">BMPO</th>\n			<th colspan=\"1\">DPO</th>\n		</tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"adult_phenotype") : depth0),{"name":"each","hash":{},"fn":container.program(57, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":332,"column":2},"end":{"line":338,"column":11}}})) != null ? stack1 : "");
},"57":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<tr>\n			<td colspan=\"1\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"label") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n			<td colspan=\"2\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"bmpo") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n			<td colspan=\"1\">"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"dpo") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n		</tr>\n";
},"59":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<thead class=\"thead-dark\">\n			<th colspan=4\">Gene</th>\n		</thead>\n		<tr>\n			<th>Gene ID</th>\n			<th>Name</th>\n			<th>Synonym</th>\n			<th>URL</th>\n		</tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"adult_gene") : depth0),{"name":"each","hash":{},"fn":container.program(60, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":350,"column":2},"end":{"line":357,"column":11}}})) != null ? stack1 : "");
},"60":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<tr>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</td>\n			<td>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"synonym") : stack1), depth0))
    + "</td>\n			<td>"
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"url") : stack1), depth0)) != null ? stack1 : "")
    + "</td>\n		</tr>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<style>\n@import url('https://rcshige3.nig.ac.jp/rdf/css/bootstrap.min.css');\n</style>\n\n<div class=\"table-responsive\">\n\n	<!--\n		系統リソース情報\n	-->\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"information") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":10,"column":1},"end":{"line":34,"column":13}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"reference") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":35,"column":4},"end":{"line":38,"column":13}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"information") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 1, blockParams),"inverse":container.program(7, data, 0, blockParams),"data":data,"blockParams":blockParams,"loc":{"start":{"line":39,"column":4},"end":{"line":53,"column":10}}})) != null ? stack1 : "")
    + "\n	<!--\n		卵リソース情報\n	-->\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"egg") : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":58,"column":1},"end":{"line":70,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"egg_image") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":71,"column":1},"end":{"line":75,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"egg") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":76,"column":1},"end":{"line":79,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"egg_phenotype") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":80,"column":1},"end":{"line":98,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"egg_gene") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":99,"column":1},"end":{"line":117,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"egg") : depth0),{"name":"each","hash":{},"fn":container.program(22, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":118,"column":1},"end":{"line":120,"column":10}}})) != null ? stack1 : "")
    + "\n	<!--\n		幼虫リソース情報\n	-->\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"larva") : depth0),{"name":"each","hash":{},"fn":container.program(24, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":125,"column":1},"end":{"line":137,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"larva_image") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":138,"column":1},"end":{"line":142,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"larva") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":143,"column":1},"end":{"line":146,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"larva_phenotype") : depth0),{"name":"if","hash":{},"fn":container.program(29, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":147,"column":1},"end":{"line":165,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"larva_feeding") : depth0),{"name":"if","hash":{},"fn":container.program(32, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":166,"column":1},"end":{"line":182,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"larva") : depth0),{"name":"each","hash":{},"fn":container.program(35, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":183,"column":1},"end":{"line":209,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"larva_gene") : depth0),{"name":"if","hash":{},"fn":container.program(37, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":210,"column":1},"end":{"line":228,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"larva") : depth0),{"name":"each","hash":{},"fn":container.program(22, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":229,"column":1},"end":{"line":231,"column":10}}})) != null ? stack1 : "")
    + "\n	<!--\n		蛹リソース情報\n	-->\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"pupa") : depth0),{"name":"each","hash":{},"fn":container.program(40, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":236,"column":1},"end":{"line":248,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"pupa_image") : depth0),{"name":"if","hash":{},"fn":container.program(42, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":249,"column":1},"end":{"line":253,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"pupa") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":254,"column":1},"end":{"line":257,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"pupa_phenotype") : depth0),{"name":"if","hash":{},"fn":container.program(45, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":258,"column":1},"end":{"line":274,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"pupa_gene") : depth0),{"name":"if","hash":{},"fn":container.program(48, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":275,"column":1},"end":{"line":293,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"pupa") : depth0),{"name":"each","hash":{},"fn":container.program(22, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":294,"column":1},"end":{"line":296,"column":10}}})) != null ? stack1 : "")
    + "\n	<!--\n		成虫リソース情報\n	-->\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"adult") : depth0),{"name":"each","hash":{},"fn":container.program(51, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":301,"column":1},"end":{"line":313,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"adult_image") : depth0),{"name":"if","hash":{},"fn":container.program(53, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":314,"column":1},"end":{"line":318,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"adult") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":319,"column":1},"end":{"line":322,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"adult_phenotype") : depth0),{"name":"if","hash":{},"fn":container.program(56, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":323,"column":1},"end":{"line":339,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"adult_gene") : depth0),{"name":"if","hash":{},"fn":container.program(59, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":340,"column":1},"end":{"line":358,"column":8}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"adult") : depth0),{"name":"each","hash":{},"fn":container.program(22, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":359,"column":1},"end":{"line":361,"column":10}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true,"useBlockParams":true}],
["stanza_adult.rq.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "PREFIX brso: <http://purl.jp/bio/10/brso/>\r\nPREFIX sio: <http://semanticscience.org/resource/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX so: <http://purl.obolibrary.org/obo/so#>\r\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX faldo: <http://biohackathon.org/resource/faldo#>\r\nPREFIX dcterms: <http://purl.org/dc/terms/>\r\nPREFIX insdc: <http://ddbj.nig.ac.jp/ontologies/nucleotide/>\r\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\nPREFIX org: <http://www.w3.org/ns/org#>\r\nPREFIX bibo: <http://purl.org/ontology/bibo/>\r\nPREFIX obo: <http://purl.obolibrary.org/obo/>\r\n\r\n\r\nSELECT\r\n	?name\r\n	?resource_state\r\nFROM <http://iruddat2.nig.ac.jp:8120/silkworm>\r\nWHERE {\r\n	?Resource a brso:BiologicalResourceAdult ;\r\n		dcterms:identifier \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":21,"column":22},"end":{"line":21,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\" ;\r\n		rdfs:label ?name ;\r\n		brso:resource_state _:b_resource_state .\r\n\r\n	_:b_resource_state a brso:ResourceState ;\r\n		rdfs:label ?resource_state .\r\n}\r\nLIMIT 1\r\n";
},"useData":true}],
["stanza_egg.rq.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "PREFIX brso: <http://purl.jp/bio/10/brso/>\r\nPREFIX sio: <http://semanticscience.org/resource/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX so: <http://purl.obolibrary.org/obo/so#>\r\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX faldo: <http://biohackathon.org/resource/faldo#>\r\nPREFIX dcterms: <http://purl.org/dc/terms/>\r\nPREFIX insdc: <http://ddbj.nig.ac.jp/ontologies/nucleotide/>\r\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\nPREFIX org: <http://www.w3.org/ns/org#>\r\nPREFIX bibo: <http://purl.org/ontology/bibo/>\r\nPREFIX obo: <http://purl.obolibrary.org/obo/>\r\n\r\n\r\nSELECT\r\n	?name\r\n	?resource_state\r\nFROM <http://iruddat2.nig.ac.jp:8120/silkworm>\r\nWHERE {\r\n	?Resource a brso:BiologicalResourceEgg ;\r\n		dcterms:identifier \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":21,"column":22},"end":{"line":21,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\" ;\r\n		rdfs:label ?name ;\r\n		brso:resource_state _:b_resource_state .\r\n\r\n	_:b_resource_state a brso:ResourceState ;\r\n		rdfs:label ?resource_state .\r\n}\r\nLIMIT 1\r\n";
},"useData":true}],
["stanza_feeding_ability.rq.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "PREFIX brso: <http://purl.jp/bio/10/brso/>\r\nPREFIX sio: <http://semanticscience.org/resource/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX so: <http://purl.obolibrary.org/obo/so#>\r\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX faldo: <http://biohackathon.org/resource/faldo#>\r\nPREFIX dcterms: <http://purl.org/dc/terms/>\r\nPREFIX insdc: <http://ddbj.nig.ac.jp/ontologies/nucleotide/>\r\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\nPREFIX org: <http://www.w3.org/ns/org#>\r\nPREFIX bibo: <http://purl.org/ontology/bibo/>\r\nPREFIX obo: <http://purl.obolibrary.org/obo/>\r\nPREFIX prism: <http://prismstandard.org/namespaces/basic/2.0/>\r\n\r\n\r\nSELECT distinct\r\n	?label\r\n	(group_concat(distinct ?bmpo;separator = \"<br/>\") AS ?bmpo)\r\n	?description\r\nFROM <http://iruddat2.nig.ac.jp:8120/silkworm>\r\nWHERE {\r\n\r\n	?Resource dcterms:identifier \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":23,"column":31},"end":{"line":23,"column":37}}}) : helper))) != null ? stack1 : "")
    + "\" ;\r\n		sio:SIO_001279 _:b_phenotype .\r\n\r\n	_:b_phenotype a sio:SIO_010056 ;\r\n		rdfs:label ?label .\r\n	filter(LANG(?label) = '"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"language") || (depth0 != null ? lookupProperty(depth0,"language") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"language","hash":{},"data":data,"loc":{"start":{"line":28,"column":24},"end":{"line":28,"column":36}}}) : helper))) != null ? stack1 : "")
    + "')\r\n\r\n	OPTIONAL{\r\n		_:b_phenotype sio:SIO_000255 ?bmpo.\r\n	}\r\n	OPTIONAL{\r\n		_:b_phenotype dcterms:description ?description.\r\n		filter(LANG(?description) = '"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"language") || (depth0 != null ? lookupProperty(depth0,"language") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"language","hash":{},"data":data,"loc":{"start":{"line":35,"column":31},"end":{"line":35,"column":43}}}) : helper))) != null ? stack1 : "")
    + "')\r\n	}\r\n\r\n}\r\n\r\n";
},"useData":true}],
["stanza_gene.rq.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "PREFIX brso: <http://purl.jp/bio/10/brso/>\r\nPREFIX sio: <http://semanticscience.org/resource/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX so: <http://purl.obolibrary.org/obo/so#>\r\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX faldo: <http://biohackathon.org/resource/faldo#>\r\nPREFIX dcterms: <http://purl.org/dc/terms/>\r\nPREFIX insdc: <http://ddbj.nig.ac.jp/ontologies/nucleotide/>\r\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\nPREFIX org: <http://www.w3.org/ns/org#>\r\nPREFIX bibo: <http://purl.org/ontology/bibo/>\r\nPREFIX obo: <http://purl.obolibrary.org/obo/>\r\nPREFIX prism: <http://prismstandard.org/namespaces/basic/2.0/>\r\n\r\n\r\nSELECT distinct\r\n	?id\r\n	?name\r\n	(group_concat(distinct ?synonym;separator = \", \") AS ?synonym)\r\n	(group_concat(distinct ?url;separator = \"<br/>\") AS ?url)\r\nFROM <http://iruddat2.nig.ac.jp:8120/silkworm>\r\nWHERE {\r\n	?Resource dcterms:identifier \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":23,"column":31},"end":{"line":23,"column":37}}}) : helper))) != null ? stack1 : "")
    + "\" ;\r\n		brso:genomic_feature _:b_genomic_feature .\r\n\r\n	_:b_genomic_feature a brso:GenomicFeature ;\r\n		brso:has_genomic_segment _:b_genomic_segment .\r\n\r\n	_:b_genomic_segment a brso:GenomicSegment ;\r\n		dcterms:identifier ?id ;\r\n		skos:altLabel ?synonym ;\r\n		rdfs:seeAlso ?url .\r\n\r\n	OPTIONAL{\r\n		_:b_genomic_segment rdfs:label ?name.\r\n	}\r\n}\r\n\r\n";
},"useData":true}],
["stanza_image.rq.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "PREFIX brso: <http://purl.jp/bio/10/brso/>\r\nPREFIX sio: <http://semanticscience.org/resource/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX so: <http://purl.obolibrary.org/obo/so#>\r\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX faldo: <http://biohackathon.org/resource/faldo#>\r\nPREFIX dcterms: <http://purl.org/dc/terms/>\r\nPREFIX insdc: <http://ddbj.nig.ac.jp/ontologies/nucleotide/>\r\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\nPREFIX org: <http://www.w3.org/ns/org#>\r\nPREFIX bibo: <http://purl.org/ontology/bibo/>\r\nPREFIX obo: <http://purl.obolibrary.org/obo/>\r\n\r\n\r\nSELECT distinct\r\n	?image\r\nFROM <http://iruddat2.nig.ac.jp:8120/silkworm>\r\nWHERE {\r\n	?Resource dcterms:identifier \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":19,"column":31},"end":{"line":19,"column":37}}}) : helper))) != null ? stack1 : "")
    + "\" ;\r\n		foaf:depiction ?image .\r\n}\r\n";
},"useData":true}],
["stanza_larva.rq.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "PREFIX brso: <http://purl.jp/bio/10/brso/>\r\nPREFIX sio: <http://semanticscience.org/resource/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX so: <http://purl.obolibrary.org/obo/so#>\r\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX faldo: <http://biohackathon.org/resource/faldo#>\r\nPREFIX dcterms: <http://purl.org/dc/terms/>\r\nPREFIX insdc: <http://ddbj.nig.ac.jp/ontologies/nucleotide/>\r\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\nPREFIX org: <http://www.w3.org/ns/org#>\r\nPREFIX bibo: <http://purl.org/ontology/bibo/>\r\nPREFIX obo: <http://purl.obolibrary.org/obo/>\r\nPREFIX bmpo: <http://purl.bioontology.org/ontology/BMPO/>\r\n\r\nSELECT\r\n	?name\r\n	?resource_state\r\n	?larva_period\r\n	?1st_instar\r\n	?1st_diapause\r\n	?2nd_instar\r\n	?2nd_diapause\r\n	?3th_instar\r\n	?3th_diapause\r\n	?4th_instar\r\n	?4th_diapause\r\n	?5th_instar\r\nFROM <http://iruddat2.nig.ac.jp:8120/silkworm>\r\nWHERE {\r\n	?Resource a brso:BiologicalResourceLarva ;\r\n		dcterms:identifier \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":31,"column":22},"end":{"line":31,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\" ;\r\n		rdfs:label ?name ;\r\n		brso:resource_state _:b_resource_state .\r\n\r\n	_:b_resource_state a brso:ResourceState ;\r\n		rdfs:label ?resource_state .\r\n\r\n	OPTIONAL {\r\n		?Resource sio:SIO_001279 _:b_larva_period.\r\n\r\n		_:b_larva_period a bmpo:LarvaPeriod ;\r\n			sio:SIO_000300 ?larva_period ;\r\n			bmpo:1st_instar _:b_1st_instar ;\r\n			bmpo:1st_diapause _:b_1st_diapause ;\r\n			bmpo:2nd_instar _:b_2nd_instar ;\r\n			bmpo:2nd_diapause _:b_2nd_diapause ;\r\n			bmpo:3th_instar _:b_3th_instar ;\r\n			bmpo:3th_diapause _:b_3th_diapause ;\r\n			bmpo:4th_instar _:b_4th_instar ;\r\n			bmpo:4th_diapause _:b_4th_diapause ;\r\n			bmpo:5th_instar _:b_5th_instar .\r\n\r\n		_:b_1st_instar sio:SIO_000300 ?1st_instar .\r\n		_:b_1st_diapause sio:SIO_000300 ?1st_diapause .\r\n		_:b_2nd_instar sio:SIO_000300 ?2nd_instar .\r\n		_:b_2nd_diapause sio:SIO_000300 ?2nd_diapause .\r\n		_:b_3th_instar sio:SIO_000300 ?3th_instar .\r\n		_:b_3th_diapause sio:SIO_000300 ?3th_diapause .\r\n		_:b_4th_instar sio:SIO_000300 ?4th_instar .\r\n		_:b_4th_diapause sio:SIO_000300 ?4th_diapause .\r\n		_:b_5th_instar sio:SIO_000300 ?5th_instar .\r\n	}\r\n}\r\nLIMIT 1\r\n";
},"useData":true}],
["stanza_larva_period.rq.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "PREFIX brso: <http://purl.jp/bio/10/brso/>\r\nPREFIX sio: <http://semanticscience.org/resource/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX so: <http://purl.obolibrary.org/obo/so#>\r\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX faldo: <http://biohackathon.org/resource/faldo#>\r\nPREFIX dcterms: <http://purl.org/dc/terms/>\r\nPREFIX insdc: <http://ddbj.nig.ac.jp/ontologies/nucleotide/>\r\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\nPREFIX org: <http://www.w3.org/ns/org#>\r\nPREFIX bibo: <http://purl.org/ontology/bibo/>\r\nPREFIX obo: <http://purl.obolibrary.org/obo/>\r\nPREFIX prism: <http://prismstandard.org/namespaces/basic/2.0/>\r\nPREFIX bmpo: <http://purl.bioontology.org/ontology/BMPO/>\r\n\r\n\r\nSELECT distinct\r\n	?larva_period\r\n	?1st_instar\r\n	?1st_diapause\r\n	?2nd_instar\r\n	?2nd_diapause\r\n	?3th_instar\r\n	?3th_diapause\r\n	?4th_instar\r\n	?4th_diapause\r\n	?5th_instar\r\nFROM <http://iruddat2.nig.ac.jp:8120/silkworm>\r\nWHERE {\r\n\r\n	?Resource a brso:BiologicalResourceLarva ;\r\n		dcterms:identifier \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":32,"column":22},"end":{"line":32,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\" ;\r\n		sio:SIO_001279 _:b_larva_period .\r\n\r\n	_:b_larva_period a bmpo:LarvaPeriod ;\r\n		sio:SIO_000300 ?larva_period ;\r\n		bmpo:1st_instar _:b_1st_instar ;\r\n		bmpo:1st_diapause _:b_1st_diapause ;\r\n		bmpo:2nd_instar _:b_2nd_instar ;\r\n		bmpo:2nd_diapause _:b_2nd_diapause ;\r\n		bmpo:3th_instar _:b_3th_instar ;\r\n		bmpo:3th_diapause _:b_3th_diapause ;\r\n		bmpo:4th_instar _:b_4th_instar ;\r\n		bmpo:4th_diapause _:b_4th_diapause ;\r\n		bmpo:5th_instar _:b_5th_instar .\r\n	\r\n	_:b_1st_instar a bmpo:1stInstar ;\r\n		sio:SIO_000300 ?1st_instar .\r\n	_:b_1st_diapause a bmpo:1stDiapause ;\r\n		sio:SIO_000300 ?1st_diapause .\r\n	\r\n	_:b_2nd_instar a bmpo:2ndInstar ;\r\n		sio:SIO_000300 ?2nd_instar .\r\n	_:b_2nd_diapause a bmpo:2ndDiapause ;\r\n		sio:SIO_000300 ?2nd_diapause .\r\n		\r\n	_:b_3th_instar a bmpo:3thInstar ;\r\n		sio:SIO_000300 ?3th_instar .\r\n	_:b_3th_diapause a bmpo:3thDiapause ;\r\n		sio:SIO_000300 ?3th_diapause .\r\n		\r\n	_:b_4th_instar a bmpo:4thInstar ;\r\n		sio:SIO_000300 ?4th_instar .\r\n	_:b_4th_diapause a bmpo:4thDiapause ;\r\n		sio:SIO_000300 ?4th_diapause .\r\n\r\n	_:b_5th_instar a bmpo:5thInstar ;\r\n		sio:SIO_000300 ?5th_instar .\r\n}\r\n\r\n";
},"useData":true}],
["stanza_phenotype.rq.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "PREFIX brso: <http://purl.jp/bio/10/brso/>\r\nPREFIX sio: <http://semanticscience.org/resource/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX so: <http://purl.obolibrary.org/obo/so#>\r\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX faldo: <http://biohackathon.org/resource/faldo#>\r\nPREFIX dcterms: <http://purl.org/dc/terms/>\r\nPREFIX insdc: <http://ddbj.nig.ac.jp/ontologies/nucleotide/>\r\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\nPREFIX org: <http://www.w3.org/ns/org#>\r\nPREFIX bibo: <http://purl.org/ontology/bibo/>\r\nPREFIX obo: <http://purl.obolibrary.org/obo/>\r\nPREFIX prism: <http://prismstandard.org/namespaces/basic/2.0/>\r\n\r\n\r\nSELECT distinct\r\n	?label\r\n	?bmpo\r\n	?dpo\r\n	(group_concat(distinct ?reference;separator = \"<br/>\") AS ?reference)\r\nWHERE {\r\n	SELECT distinct\r\n		?label\r\n		(group_concat(distinct ?bmpo;separator = \"<br/>\") AS ?bmpo)\r\n		(group_concat(distinct ?dpo;separator = \"<br/>\") AS ?dpo)\r\n		(concat(\r\n			group_concat(distinct ?author_name;separator = \", \") ,\r\n			\" (\",\r\n			?date,\r\n			\"). \",\r\n			?puclication_name,\r\n			\", \",\r\n			?volume,\r\n			\", \",\r\n			?number,\r\n			\", \",\r\n			?starting_page,\r\n			\"-\",\r\n			?ending_page,\r\n			\". \",\r\n			\"<a href='\",\r\n			?url,\r\n			\"'>\",\r\n			?url,\r\n			\"</a>\"\r\n			) AS ?reference)\r\n	WHERE {\r\n		?Resource dcterms:identifier \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":48,"column":32},"end":{"line":48,"column":38}}}) : helper))) != null ? stack1 : "")
    + "\" ;\r\n			sio:SIO_001279 _:b_phenotype .\r\n\r\n		_:b_phenotype a sio:SIO_010056 ;\r\n			rdfs:label ?label ;\r\n			dcterms:reference _:b_reference .\r\n		filter(LANG(?label) = '')\r\n\r\n		_:b_reference a bibo:Article ;\r\n			prism:publicationName ?puclication_name ;\r\n			prism:volume ?volume ;\r\n			prism:number ?number ;\r\n			prism:startingPage ?starting_page ;\r\n			prism:endingPage ?ending_page ;\r\n			dcterms:date ?date ;\r\n			rdfs:seeAlso ?url .\r\n		filter(LANG(?puclication_name) = '"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"language") || (depth0 != null ? lookupProperty(depth0,"language") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"language","hash":{},"data":data,"loc":{"start":{"line":64,"column":36},"end":{"line":64,"column":48}}}) : helper))) != null ? stack1 : "")
    + "')\r\n\r\n		OPTIONAL{\r\n			_:b_phenotype sio:SIO_000255 ?bmpo.\r\n		}\r\n		OPTIONAL{\r\n			_:b_phenotype rdfs:seeAlso ?dpo.\r\n		}\r\n\r\n		OPTIONAL {\r\n			_:b_reference dc:creater ?author .\r\n			?author a foaf:Person ;\r\n				foaf:name ?author_name .\r\n			filter(LANG(?author_name) = '"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"language") || (depth0 != null ? lookupProperty(depth0,"language") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"language","hash":{},"data":data,"loc":{"start":{"line":77,"column":32},"end":{"line":77,"column":44}}}) : helper))) != null ? stack1 : "")
    + "')\r\n		}\r\n	}\r\n}\r\n";
},"useData":true}],
["stanza_phenotype_reference.rq.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "PREFIX brso: <http://purl.jp/bio/10/brso/>\r\nPREFIX sio: <http://semanticscience.org/resource/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX so: <http://purl.obolibrary.org/obo/so#>\r\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX faldo: <http://biohackathon.org/resource/faldo#>\r\nPREFIX dcterms: <http://purl.org/dc/terms/>\r\nPREFIX insdc: <http://ddbj.nig.ac.jp/ontologies/nucleotide/>\r\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\nPREFIX org: <http://www.w3.org/ns/org#>\r\nPREFIX bibo: <http://purl.org/ontology/bibo/>\r\nPREFIX obo: <http://purl.obolibrary.org/obo/>\r\nPREFIX prism: <http://prismstandard.org/namespaces/basic/2.0/>\r\n\r\n\r\nSELECT distinct\r\n	?puclication_name\r\n	?volume\r\n	?number\r\n	?starting_page\r\n	?ending_page\r\n	?date\r\n	?url\r\n	(group_concat(distinct ?author_name;separator = \", \") AS ?author_name)\r\nFROM <http://iruddat2.nig.ac.jp:8120/silkworm>\r\nWHERE {\r\n	?Resource dcterms:identifier \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":27,"column":31},"end":{"line":27,"column":37}}}) : helper))) != null ? stack1 : "")
    + "\" ;\r\n		sio:SIO_001279 _:b_phenotype .\r\n\r\n	_:b_phenotype a sio:SIO_010056 ;\r\n		rdfs:label ?label ;\r\n		dcterms:reference _:b_reference .\r\n	filter(LANG(?label) = '')\r\n\r\n	_:b_reference a bibo:Article ;\r\n		prism:publicationName ?puclication_name ;\r\n		prism:volume ?volume ;\r\n		prism:number ?number ;\r\n		prism:startingPage ?starting_page ;\r\n		prism:endingPage ?ending_page ;\r\n		dcterms:date ?date ;\r\n		rdfs:seeAlso ?url .\r\n	filter(LANG(?puclication_name) = '"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"language") || (depth0 != null ? lookupProperty(depth0,"language") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"language","hash":{},"data":data,"loc":{"start":{"line":43,"column":35},"end":{"line":43,"column":47}}}) : helper))) != null ? stack1 : "")
    + "')\r\n\r\n	OPTIONAL {\r\n		_:b_reference dc:creater ?author .\r\n		?author a foaf:Person ;\r\n			foaf:name ?author_name .\r\n		filter(LANG(?author_name) = '"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"language") || (depth0 != null ? lookupProperty(depth0,"language") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"language","hash":{},"data":data,"loc":{"start":{"line":49,"column":31},"end":{"line":49,"column":43}}}) : helper))) != null ? stack1 : "")
    + "')\r\n	}\r\n}\r\n\r\n";
},"useData":true}],
["stanza_pupa.rq.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "PREFIX brso: <http://purl.jp/bio/10/brso/>\r\nPREFIX sio: <http://semanticscience.org/resource/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX so: <http://purl.obolibrary.org/obo/so#>\r\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX faldo: <http://biohackathon.org/resource/faldo#>\r\nPREFIX dcterms: <http://purl.org/dc/terms/>\r\nPREFIX insdc: <http://ddbj.nig.ac.jp/ontologies/nucleotide/>\r\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\nPREFIX org: <http://www.w3.org/ns/org#>\r\nPREFIX bibo: <http://purl.org/ontology/bibo/>\r\nPREFIX obo: <http://purl.obolibrary.org/obo/>\r\n\r\n\r\nSELECT\r\n	?name\r\n	?resource_state\r\nFROM <http://iruddat2.nig.ac.jp:8120/silkworm>\r\nWHERE {\r\n	?Resource a brso:BiologicalResourcePupa ;\r\n		dcterms:identifier \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":21,"column":22},"end":{"line":21,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\" ;\r\n		rdfs:label ?name ;\r\n		brso:resource_state _:b_resource_state .\r\n\r\n	_:b_resource_state a brso:ResourceState ;\r\n		rdfs:label ?resource_state .\r\n}\r\nLIMIT 1\r\n";
},"useData":true}],
["stanza_reference.rq.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "PREFIX brso: <http://purl.jp/bio/10/brso/>\r\nPREFIX sio: <http://semanticscience.org/resource/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX so: <http://purl.obolibrary.org/obo/so#>\r\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX faldo: <http://biohackathon.org/resource/faldo#>\r\nPREFIX dcterms: <http://purl.org/dc/terms/>\r\nPREFIX insdc: <http://ddbj.nig.ac.jp/ontologies/nucleotide/>\r\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\nPREFIX org: <http://www.w3.org/ns/org#>\r\nPREFIX bibo: <http://purl.org/ontology/bibo/>\r\nPREFIX obo: <http://purl.obolibrary.org/obo/>\r\nPREFIX prism: <http://prismstandard.org/namespaces/basic/2.0/>\r\n\r\n\r\nSELECT distinct\r\n	?puclication_name\r\n	?volume\r\n	?number\r\n	?starting_page\r\n	?ending_page\r\n	?date\r\n	?url\r\n	(group_concat(distinct ?author_name;separator = \", \") AS ?author_name)\r\nFROM <http://iruddat2.nig.ac.jp:8120/silkworm>\r\nWHERE {\r\n	?Resource a brso:BiologicalResource ;\r\n		dcterms:identifier \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":28,"column":22},"end":{"line":28,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\" ;\r\n		dcterms:reference _:b_reference .\r\n\r\n	_:b_reference a bibo:Article ;\r\n		prism:publicationName ?puclication_name ;\r\n		prism:volume ?volume ;\r\n		prism:number ?number ;\r\n		prism:startingPage ?starting_page ;\r\n		prism:endingPage ?ending_page ;\r\n		dcterms:date ?date ;\r\n		rdfs:seeAlso ?url .\r\n	filter(LANG(?puclication_name) = '"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"language") || (depth0 != null ? lookupProperty(depth0,"language") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"language","hash":{},"data":data,"loc":{"start":{"line":39,"column":35},"end":{"line":39,"column":47}}}) : helper))) != null ? stack1 : "")
    + "')\r\n\r\n	OPTIONAL {\r\n		_:b_reference dc:creater ?author .\r\n		?author a foaf:Person ;\r\n			foaf:name ?author_name .\r\n		filter(LANG(?author_name) = '"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"language") || (depth0 != null ? lookupProperty(depth0,"language") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"language","hash":{},"data":data,"loc":{"start":{"line":45,"column":31},"end":{"line":45,"column":43}}}) : helper))) != null ? stack1 : "")
    + "')\r\n	}\r\n}\r\n\r\n";
},"useData":true}],
["stanza_strain.rq.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "PREFIX brso: <http://purl.jp/bio/10/brso/>\r\nPREFIX sio: <http://semanticscience.org/resource/>\r\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX so: <http://purl.obolibrary.org/obo/so#>\r\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX faldo: <http://biohackathon.org/resource/faldo#>\r\nPREFIX dcterms: <http://purl.org/dc/terms/>\r\nPREFIX insdc: <http://ddbj.nig.ac.jp/ontologies/nucleotide/>\r\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\nPREFIX org: <http://www.w3.org/ns/org#>\r\nPREFIX bibo: <http://purl.org/ontology/bibo/>\r\nPREFIX obo: <http://purl.obolibrary.org/obo/>\r\n\r\nSELECT\r\n	?strain\r\n	?taxonomy_id\r\n	?description\r\n	(group_concat(distinct ?origin;separator = \", \") AS ?origin)\r\n	(group_concat(distinct ?rrc;separator = \"<br/>\") AS ?rrc)\r\n	?homepage\r\nFROM <http://iruddat2.nig.ac.jp:8120/silkworm>\r\nWHERE {\r\n	?Resource a brso:BiologicalResource ;\r\n		dcterms:identifier \""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":24,"column":22},"end":{"line":24,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\" ;\r\n		rdfs:label ?strain ;\r\n		brso:organism _:b_organism ;\r\n		dcterms:description ?description ;\r\n		foaf:homepage ?homepage .\r\n	filter(LANG(?description) = '"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"language") || (depth0 != null ? lookupProperty(depth0,"language") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"language","hash":{},"data":data,"loc":{"start":{"line":29,"column":30},"end":{"line":29,"column":42}}}) : helper))) != null ? stack1 : "")
    + "')\r\n\r\n	_:b_organism a sio:SIO_010000 ;\r\n		obo:RO_0002162 ?taxonomy_id .\r\n\r\n	OPTIONAL {\r\n		?Resource brso:derived_from ?origin .\r\n	}\r\n	OPTIONAL {\r\n		?Resource dcterms:isReferencedBy ?rrc .\r\n	}\r\n}\r\nLIMIT 1\r\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=silkworm-details-search.js.map
