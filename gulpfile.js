const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');

function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ ouputStyle: 'compressed' }))
        .pipe(gulp.dest('./dist/css'));
}

function images() {
    return gulp.src('./assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function html() {
    return gulp.src('./src/*.html') // ou onde estiver seu HTML
        .pipe(gulp.dest('./dist'));
}

exports.default = gulp.parallel(styles, images, html);
exports.watch = function () {
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles))
}