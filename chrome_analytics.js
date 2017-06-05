/*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {};

/**
 * Google Analytics tracking
 * @namespace
 */
Chrome.GA = (function() {
  'use strict';

  /**
   * Google Analytics Event
   * @typedef {Object} Chrome.GA.Event
   * @property {string} eventCategory - category
   * @property {string} eventAction - action
   * @property {string} eventLabel - label
   * @memberOf Chrome.GA
   */

  /**
   * Event: called when document and resources are loaded<br />
   * Initialize Google Analytics
   * @private
   * @memberOf Chrome.GA
   */
  function _onLoad() {
    // Standard Google Universal Analytics code
    // noinspection OverlyComplexFunctionJS
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      // noinspection CommaExpressionJS
      i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments);
          }, i[r].l = 1 * new Date();
      // noinspection CommaExpressionJS
      a = s.createElement(o),
          m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script',
        'https://www.google-analytics.com/analytics.js', 'ga');
  }

  // listen for document and resources loaded
  window.addEventListener('load', _onLoad);

  return {
    /**
     * Initialize analytics
     * @param {string} trackingId - tracking id
     * @param {string} appName - extension name
     * @param {string} appId - extension Id
     * @param {string} appVersion - extension version
     * @memberOf Chrome.GA
     */
    initialize: function(trackingId, appName, appId, appVersion) {
      ga('create', trackingId, 'auto');
      // see: http://stackoverflow.com/a/22152353/1958200
      ga('set', 'checkProtocolTask', function() {
      });
      ga('set', 'appName', appName);
      ga('set', 'appId', appId);
      ga('set', 'appVersion', appVersion);
      ga('require', 'displayfeatures');
    },

    /**
     * Send a page
     * @param {string} page - page path
     * @memberOf Chrome.GA
     */
    page: function(page) {
      if (page) {
        ga('send', 'pageview', page);
      }
    },

    /**
     * Send an event
     * @param {Chrome.GA.Event} event - the event type
     * @param {?string} [label=null] - override label
     * @param {?string} [action=null] - override action
     * @memberOf Chrome.GA
     */
    event: function(event, label = null, action = null) {
      if (event) {
        const ev = Chrome.JSONUtils.shallowCopy(event);
        ev.hitType = 'event';
        ev.eventLabel = label ? label : ev.eventLabel;
        ev.eventAction = action ? action : ev.eventAction;
        ga('send', ev);
      }
    },

    /**
     * Send an error
     * @param {?string} [label=null] - override label
     * @param {?string} [action=null] - override action
     * @memberOf Chrome.GA
     */
    error: function(label = null, action = null) {
      const ev = {
        hitType: 'event',
        eventCategory: 'error',
        eventAction: 'unknownMethod',
        eventLabel: 'Err: unknown',
      };
      ev.eventLabel = label ? `Err: ${label}` : ev.eventLabel;
      ev.eventAction = action ? action : ev.eventAction;
      ga('send', ev);
      console.error('Error: ', ev);
    },

    /**
     * Send an exception
     * @param {string} message - the error message
     * @param {?string} [stack=null] - error stack
     * @param {boolean} [fatal=null] - true if fatal
     * @memberOf Chrome.GA
     */
    exception: function(message, stack = null, fatal = true) {
      try {
        let msg = '';
        if (message) {
          msg += message;
        }
        if (stack) {
          msg += `\n${stack}`;
        }
        const ex = {
          hitType: 'exception',
          exDescription: msg,
          exFatal: fatal,
        };
        ga('send', ex);
        console.error('Exception caught: ', ex);
      } catch (err) {
        // noinspection BadExpressionStatementJS
        Function.prototype;
      }
    },
  };
})();


