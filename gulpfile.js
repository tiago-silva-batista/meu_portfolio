const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Compilar SCSS
function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

// Imagens
function images() {
    return gulp.src('./assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./assets/images'));
}

// Ícones
function icons() {
    return gulp.src('./assets/icons/**/*')
        .pipe(gulp.dest('./assets/icons'));
}

// PDFs
function pdf() {
    return gulp.src('./assets/pdf/**/*')
        .pipe(gulp.dest('./assets/pdf'));
}

// HTML
function html() {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./'));
}

// Servidor local
function serve() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });

    gulp.watch('./src/styles/*.scss', styles);
    gulp.watch('./assets/images/**/*', gulp.series(images, browserSync.reload));
    gulp.watch('./index.html', gulp.series(html, browserSync.reload));
}

exports.default = gulp.parallel(styles, images, icons, pdf, html);
exports.serve = gulp.series(styles, images, icons, pdf, html, serve);
