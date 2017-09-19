/*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */

module.exports = {
	'extends': [
		'eslint:recommended',
		'google',
		'plugin:promise/recommended',
	],

	'env': {
		'browser': true,
		'es6': true,
	},

	'plugins': [
		'promise',
	],

	'globals': {
		'Chrome': true,
		'chrome': true,
		'require': true,
		'ChromePromise': true,
		'ExceptionHandler': true,
		'Headers': true,
		'ga': true,
	},

	'rules': {
		'linebreak-style': ['off', 'windows'],
		'max-len': ['warn', 80],
		'eqeqeq': ['error', 'always'],
		'no-var': 'warn',
		'no-console': ['warn', {'allow': ['error']}],
		'no-unused-vars': 'warn',
		'comma-dangle': ['warn', 'always-multiline'],
		'no-trailing-spaces': 'off',
		'padded-blocks': 'off',
		'require-jsdoc': 'warn',
		'new-cap': ['error', {'capIsNewExceptions': ['Polymer']}],
		'quotes': ['error', 'single'],
		'quote-props': ['error', 'consistent'],
		'prefer-rest-params': 'off',
		'valid-jsdoc': ['error', {
			'requireReturn': false,
			'prefer': {
				'return': 'returns',
			},
			'preferType': {
				'Boolean': 'boolean',
				'Number': 'number',
				'object': 'Object',
				'String': 'string',
				'Integer': 'int',
			},
		}],
	},

};
