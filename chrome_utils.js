/*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {};

/**
 * Utility methods
 * @namespace
 */
Chrome.Utils = (function() {
  'use strict';

  new ExceptionHandler();

  const chromep = new ChromePromise();

  return {
    /** Get the extension's name
     * @returns {string} Extension name
     * @memberOf Chrome.Utils
     */
    getExtensionName: function() {
      return `chrome-extension://${chrome.runtime.id}`;
    },

    /**
     * Get the Extension version
     * @returns {string} Extension version
     * @memberOf Chrome.Utils
     */
    getVersion: function() {
      const manifest = chrome.runtime.getManifest();
      return manifest.version;
    },

    /**
     * Get the Chrome version
     * @see http://stackoverflow.com/a/4900484/4468645
     * @returns {int} Chrome major version
     * @memberOf Chrome.Utils
     */
    getChromeVersion: function() {
      const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
      return raw ? parseInt(raw[2], 10) : false;
    },

    /**
     * Get the full Chrome version
     * @see https://goo.gl/2ITMNO
     * @returns {string} Chrome version
     * @memberOf Chrome.Utils
     */
    getFullChromeVersion: function() {
      const raw = navigator.userAgent;
      return raw ? raw : 'Unknown';
    },

    /**
     * Get the OS as a human readable string
     * @returns {Promise.<string>} OS name
     * @memberOf Chrome.Utils
     */
    getPlatformOS: function() {
      return chromep.runtime.getPlatformInfo().then((info) => {
        let output = 'Unknown';
        const os = info.os;
        switch (os) {
          case 'win':
            output = 'MS Windows';
            break;
          case 'mac':
            output = 'Mac';
            break;
          case 'android':
            output = 'Android';
            break;
          case 'cros':
            output = 'Chrome OS';
            break;
          case 'linux':
            output = 'Linux';
            break;
          case 'openbsd':
            output = 'OpenBSD';
            break;
          default:
            break;
        }
        return Promise.resolve(output);
      });
    },

    /**
     * Determine if we are MS windows
     * @returns {Promise.<boolean>} true if MS Windows
     * @memberOf Chrome.Utils
     */
    isWindows: function() {
      return chromep.runtime.getPlatformInfo().then((info) => {
        return Promise.resolve((info.os === 'win'));
      });
    },

    /**
     * Determine if we are Chrome OS
     * @returns {Promise.<boolean>} true if ChromeOS
     * @memberOf Chrome.Utils
     */
    isChromeOS: function() {
      return chromep.runtime.getPlatformInfo().then((info) => {
        return Promise.resolve((info.os === 'cros'));
      });
    },

    /**
     * Determine if we are a Mac
     * @returns {Promise.<boolean>} true if Mac
     * @memberOf Chrome.Utils
     */
    isMac: function() {
      return chromep.runtime.getPlatformInfo().then((info) => {
        return Promise.resolve((info.os === 'mac'));
      });
    },
  };
})();
