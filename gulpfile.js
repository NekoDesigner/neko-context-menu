const { src, dest, parallel } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const minifyJS = require('gulp-minify');
const minifyCSS = require('gulp-csso');
const babel = require('gulp-babel');

function css() {
    return src('./src/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('./dist'))
}

function es6() {
    return src('src/**/*.js')
    .pipe(babel({
            presets: ['@babel/env']
        }))
    .pipe(dest('dist'))
}

// function js () {
//     return src('dist/*.js', { sourcemaps: false })
//     .pipe(concat('neko-context-menu.js'))
//     .pipe(minifyJS())
//     .pipe(dest('./dist', { sourcemaps: false }))
// }

// exports.js = js;
exports.css = css;
exports.es6 = es6;
exports.default = parallel(css, es6);