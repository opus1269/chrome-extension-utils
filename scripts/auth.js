/*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {};

/**
 * Google authorization utilities
 * @see https://developer.chrome.com/apps/identity
 * @namespace
 */
Chrome.Auth = (function() {
  'use strict';

  new ExceptionHandler();

  const chromep = new ChromePromise();

  return {
    /**
     * Get our OAuth2.0 token
     * @param {boolean} interactive - if true may block
     * @returns {Promise<string>} An access token
     * @memberOf Chrome.Auth
     */
    getToken: function(interactive = false) {
      return chromep.identity.getAuthToken({
        'interactive': interactive,
      }).then((token) => {
        return Promise.resolve(token);
      });
    },

    /**
     * Remove our cached auth token
     * @returns {Promise.<string>} the old token
     */
    removeCachedToken: function() {
      let oldToken = null;
      return this.getToken(false).then((token) => {
        oldToken = token;
        return chromep.identity.removeCachedAuthToken({'token': token});
      }).then(() => {
        return Promise.resolve(oldToken);
      });
    },
  };
})();
