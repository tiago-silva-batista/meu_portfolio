const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');

function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./public/css'));
}

function images() {
    return gulp.src('./assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/assets/images'));
}

function icons() {
    return gulp.src('./assets/icons/**/*')
        .pipe(gulp.dest('./public/assets/icons'));
}

function pdf() {
    return gulp.src('./assets/pdf/**/*')
        .pipe(gulp.dest('./public/assets/pdf'));
}

function html() {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./public'));
}

exports.default = gulp.parallel(styles, images, icons, pdf, html);
