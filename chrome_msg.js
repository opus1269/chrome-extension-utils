/*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.app = window.app || {};

/**
 * Wrapper for chrome messages
 * @namespace
 */
app.CMsg = (function() {
	'use strict';

	new ExceptionHandler();

    /**
     * A Chrome message
     * @typedef {{}} app.CMsg.Message
     * @property {string} message - Unique name
     * @property {Error} error - an error
     * @property {string|Object} item - a message specific item
     * @property {boolean} updated - item is new or updated
     * @property {string} key - key name
     * @property {?Object} value - value of key
     * @memberOf app.CMsg
     */

    return {
		/**
		 * Send a chrome message
		 * @param {app.CMsg.Message} type - type of message
		 * @returns {Promise<JSON>} response JSON
		 * @memberOf app.CMsg
		 */
		send: function(type) {
			const chromep = new ChromePromise();
			return chromep.runtime.sendMessage(type, null).then((response) => {
				return Promise.resolve(response);
			}).catch((err) => {
				if (err.message &&
					!err.message.includes('port closed') &&
					!err.message.includes('Receiving end does not exist')) {
					const msg = `type: ${type.message}, ${err.message}`;
					app.CGA.error(msg, 'Msg.send');
				}
				return Promise.reject(err);
			});
		},

		/**
		 * Add a listener for chrome messages
		 * @param {Function} listener - function to receive messages
		 * @memberOf app.CMsg
		 */
		listen: function(listener) {
			chrome.runtime.onMessage.addListener(listener);
		},
	};
})();
