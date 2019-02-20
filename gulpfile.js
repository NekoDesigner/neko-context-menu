const { src, dest, parallel } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const minifyJS = require('gulp-minify');
const minifyCSS = require('gulp-csso');

function css() {
    return src('./src/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('./dist'))
}

function js () {
    return src('./src/*.js', { sourcemaps: false })
    .pipe(concat('neko-context-menu.js'))
    .pipe(minifyJS())
    .pipe(dest('./dist', { sourcemaps: false }))
}

exports.js = js;
exports.css = css;
exports.default = parallel(css, js);