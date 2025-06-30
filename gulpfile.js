const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Compilar SCSS
function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream()); // recarrega só o CSS
}

// Otimizar imagens
function images() {
    return gulp.src('./assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/images'));
}

// Copiar ícones
function icons() {
    return gulp.src('./assets/icons/**/*')
        .pipe(gulp.dest('./dist/assets/icons'));
}

// Copiar PDF
function pdf() {
    return gulp.src('./assets/pdf/**/*')
        .pipe(gulp.dest('./dist/assets/pdf'));
}

// Copiar HTML
function html() {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./dist'));
}

// Servidor local
function serve() {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        port: 3000
    });

    gulp.watch('./src/styles/*.scss', styles);
    gulp.watch('./assets/images/**/*', gulp.series(images, browserSync.reload));
    gulp.watch('./assets/icons/**/*', gulp.series(icons, browserSync.reload));
    gulp.watch('./assets/pdf/**/*', gulp.series(pdf, browserSync.reload));
    gulp.watch('./index.html', gulp.series(html, browserSync.reload));
}

// Task padrão
exports.default = gulp.parallel(styles, images, icons, pdf, html);
exports.serve = gulp.series(styles, images, icons, pdf, html, serve);
