// const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const browserSync = require('browser-sync').create();

// // Compila SCSS
// function styles() {
//     return gulp.src('./src/styles/*.scss')
//         .pipe(sass({ outputStyle: 'compressed' }))
//         .pipe(gulp.dest('./public/css'))
//         .pipe(browserSync.stream()); // injeta o CSS sem recarregar a página
// }

// // Otimiza imagens
// // function images() {
// //     return gulp.src('./assets/images/**/*')
// //         .pipe(gulp.dest('./public/assets/images'));
// // }

// function copiarImagens() {
//     return gulp.src('./assets/images/**/*')
//         .pipe(gulp.dest('./public/assets/images'));
// }


// // Copias as fontes
// function fonts() {
//     return gulp.src('assets/fonts/**/*')
//         .pipe(gulp.dest('public/assets/fonts'));
// }


// // Copia ícones
// function icons() {
//     return gulp.src('./assets/icons/**/*')
//         .pipe(gulp.dest('./public/assets/icons'));
// }

// // Copia arquivos PDF
// function pdf() {
//     return gulp.src('./assets/pdf/**/*')
//         .pipe(gulp.dest('./public/assets/pdf'));
// }

// // Copia HTML
// function html() {
//     return gulp.src('./index.html')
//         .pipe(gulp.dest('./public'));
// }

// // Inicia servidor com hot reload
// function serve() {
//     browserSync.init({
//         server: {
//             baseDir: './public'
//         },
//         notify: false, // remove "BrowserSync is connected"
//         ui: false      // remove painel extra na porta 3001
//     });

//     gulp.watch('./src/styles/*.scss', styles);
//     gulp.watch('./index.html', html).on('change', browserSync.reload);
//     gulp.watch('./assets/images/**/*', images).on('change', browserSync.reload);
//     gulp.watch('./assets/icons/**/*', icons).on('change', browserSync.reload);
//     gulp.watch('./assets/pdf/**/*', pdf).on('change', browserSync.reload);
// }

// // Task padrão (compila tudo)
// exports.default = gulp.parallel(styles, images, icons, pdf, html, fonts);

// // Task para desenvolvimento com hot reload
// exports.serve = gulp.series(
//     gulp.parallel(styles, images, icons, pdf, html, fonts),
//     serve
// );

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
    return gulp.src('./assets/images/**/*.{jpg,jpeg,png}')
        .pipe(gulp.dest('./public/assets/images'));
}

// Copia ícones, fontes, PDF e HTML normalmente
function fonts() {
    return gulp.src('./assets/fonts/**/*')
        .pipe(gulp.dest('./public/assets/fonts'));
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


