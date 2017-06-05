/*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
'use strict';

// paths and files
const base = {
	app: 'chrome-extension-utils',
	src: './',
	dest: '.tmp/',
};
const path = {
	scripts: `${base.src}`,
};
const files = {
	scripts: `${path.scripts}*.js`,
};

const gulp = require('gulp');
const gutil = require('gulp-util');
// load the rest
const plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/,
});

/**
 * regex to remove path from filename
 * @const
 * @type {RegExp}
 */
const regex = new RegExp(`^(.*?)${base.app}\\\\`, 'g');

/**
 * Output filenames that changed
 * @param {Event} event - change event
 */
function onChange(event) {
	gutil.log('File', gutil.colors.cyan(event.path.replace(regex, '')),
		'was', gutil.colors.magenta(event.type));
}

// Default - watch for changes in development
gulp.task('default', ['watch']);

// track changes in development
gulp.task('watch', ['lintjs'],
	function() {
		gulp.watch([files.scripts, 'gulpfile.js', '.eslintrc.js'],
			['lintjs']).on('change', onChange);
	});

// lint Javascript
gulp.task('lintjs', function() {
	return gulp.src([files.scripts, './gulpfile.js', './.eslintrc.js'])
		.pipe(plugins.changed(base.dest))
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failAfterError())
    .pipe(gulp.dest(base.dest));
});
