/*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.app = window.app || {};

/**
 * Locale methods
 * @see https://developer.chrome.com/extensions/i18n
 * @namespace
 */
app.Locale = (function() {
    'use strict';

    new ExceptionHandler();

    return {
        /**
         * Get the i18n string
         * @param {string} messageName - key in messages.json
         * @returns {string} internationalized string
         * @memberOf app.Locale
         */
        localize: function(messageName) {
            return chrome.i18n.getMessage(messageName);
        },

        /**
         * Get the current locale
         * @returns {string} current locale e.g. en_US
         * @memberOf app.Locale
         */
        getLocale: function() {
            return chrome.i18n.getMessage('@@ui_locale');
        },
    };
})();
