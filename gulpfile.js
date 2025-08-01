// exports.default = copiarImagens;

const gulp = require('gulp');

// SCSS
const sass = require('gulp-sass')(require('sass'));

// BrowserSync
const browserSync = require('browser-sync').create();

// Compila SCSS
function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
}

// Copia imagens SEM NENHUM PROCESSAMENTO
function images() {
    return gulp.src('./assets/images/**/*.*', { encoding: false })
        .pipe(gulp.dest('./public/assets/images'))
        .pipe(browserSync.stream());
}

// Copia ícones, fontes, PDF e HTML normalmente
function fonts() {
    return gulp.src('./assets/fonts/**/*')
        .pipe(gulp.dest('./public/assets/fonts'));
}

function icons() {
    return gulp.src('./assets/icons/**/*.*', { encoding: false })
        .pipe(gulp.dest('./public/assets/icons'))
        .pipe(browserSync.stream());
}

function pdf() {
    return gulp.src('./assets/pdf/**/*.*', { encoding: false })
        .pipe(gulp.dest('./public/assets/pdf'))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./public'));
}

// Serve com hot reload
function serve() {
    browserSync.init({
        server: {
            baseDir: './public'
        },
        notify: false,
        ui: false
    });

    gulp.watch('./src/styles/*.scss', styles);
    gulp.watch('./index.html', html).on('change', browserSync.reload);
    gulp.watch('./assets/images/**/*', images).on('change', browserSync.reload);
    gulp.watch('./assets/icons/**/*', icons).on('change', browserSync.reload);
    gulp.watch('./assets/pdf/**/*', pdf).on('change', browserSync.reload);
}

// Exportações
exports.images = images;
exports.default = gulp.parallel(styles, images, icons, pdf, html, fonts);
exports.serve = gulp.series(
    gulp.parallel(styles, images, icons, pdf, html, fonts),
    serve
);


