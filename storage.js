/*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {};

/**
 * Manage items in localStorage
 * @namespace
 */
Chrome.Storage = (function() {
  'use strict';

  new ExceptionHandler();

  return {
    /**
     * Get a JSON parsed value from localStorage
     * @param {!string} key - key to get value for
     * @param {Object} [def=null] - return value if key not found
     * @returns {?Object} JSON object, null if key does not exist
     * @memberOf Chrome.Storage
     */
    get: function(key, def = null) {
      let value = def;
      let item = localStorage.getItem(key);
      if (item !== null) {
        value = Chrome.JSONUtils.parse(item);
      }
      return value;
    },

    /**
     * Get integer value from localStorage
     * @param {!string} key - key to get value for
     * @param {?int} [def=null] - optional value to return, if NaN
     * @returns {int} value as integer, NaN on error
     * @memberOf Chrome.Storage
     */
    getInt: function(key, def = null) {
      let item = localStorage.getItem(key);
      let value = parseInt(item, 10);
      if (Number.isNaN(value)) {
        value = (def === null) ? value : def;
        if (def === null) {
          Chrome.GA.error(`NaN value for: ${key}`, 'Storage.getInt');
        }
      }
      return value;
    },

    /**
     * Get boolean value from localStorage
     * @param {!string} key - key to get value for
     * @returns {?boolean} value as boolean, null if key does not exist
     * @memberOf Chrome.Storage
     */
    getBool: function(key) {
      return Chrome.Storage.get(key);
    },

    /**
     * JSON stringify and save a value to localStorage
     * @param {!string} key - key to set value for
     * @param {?Object} [value=null] - new value, if null remove item
     * @memberOf Chrome.Storage
     */
    set: function(key, value = null) {
      let val = value;
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        val = JSON.stringify(value);
        localStorage.setItem(key, val);
      }
    },

    /**
     * Save a value to localStorage only if there is enough room
     * @param {!string} key - localStorage Key
     * @param {Object} value - value to save
     * @param {string} [keyBool] - key to a boolean value
     *                 that is true if the primary key has non-empty value
     * @returns {boolean} true if value was set successfully
     * @memberOf Chrome.Storage
     */
    safeSet: function(key, value, keyBool) {
      let ret = true;
      const oldValue = Chrome.Storage.get(key);
      try {
        Chrome.Storage.set(key, value);
      } catch (e) {
        ret = false;
        if (oldValue) {
          // revert to old value
          Chrome.Storage.set(key, oldValue);
        }
        if (keyBool) {
          // revert to old value
          if (oldValue && oldValue.length) {
            Chrome.Storage.set(keyBool, true);
          } else {
            Chrome.Storage.set(keyBool, false);
          }
        }
        // notify listeners
        Chrome.Msg.send(Chrome.Msg.STORAGE_EXCEEDED).catch(() => {
        });
      }
      return ret;
    },
  };
})();
