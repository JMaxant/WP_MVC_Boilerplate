// dependencies

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    hash = require('gulp-hash'),
    clean = require('gulp-clean'),
    merge = require('merge-stream'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    named = require('vinyl-named'),
    browserSync = require('browser-sync').create();

// Variable paths

const src = {
    scss: 'scss/styles.scss',
    critical: 'scss/critical.scss',
    js: 'js/app.js',
    fonts: 'fonts/*.*',
    icons: 'icons/*.*',
    images: 'img/*.*',
};

const dest = {
    css: {
        rep: '../dist/css',
        files: '../dist/css/*.*'
    },
    js: {
        rep: '../dist/js',
        files: '../dist/js/*.*'
    },
    icons: {
        rep: '../dist/icons',
        files: '../dist/icons/*.*'
    },
    img: {
        rep: '../dist/img',
        files: '../dist/img/*.*'
    }
};

// css task

gulp.task('css', () => {
    let cleanCSS = gulp.src(dest.css.files, {read: false})
        .pipe(clean({ force: true }));

    let scss = gulp.src(src.scss)
        .pipe(sourcemaps.init())
        .pipe(hash({
            hashLength: 6,
            template: '<%= name %>.<%= hash %><%= ext %>'
        }))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest.css.rep))
        .pipe(browserSync.stream());

    return merge(cleanCSS, scss);
});

// script task

gulp.task('scripts', () => {
   let cleanJs = gulp.src(dest.js.files, { read: false })
       .pipe(clean({ force: true }));

   let webpackJs = gulp.src(src.js)
           .pipe(named())
           .pipe(webpackStream({
               mode: 'production',
               devtool: 'source-map',
               plugins: [
                   new Webpack.ProvidePlugin({
                       $: 'jquery',
                       jQuery: 'jquery', 'window.jQuery': 'jquery',
                   }),
               ],
               output: {
                   filename: '[name].[chunckhash:6].js'
               },
               optimization: {
                   splitChunks:{
                       automaticNameDelimiter: '-',
                       cacheGroups: {
                           vendors: {
                               name: 'vendors',
                               chunks: 'all',
                               test: /[\\/]node_modules[\\/](highlight.js|jquery)[\\/]/,
                               maxSize: 90000
                           }
                       }
                   }
               }
           }))
           .pipe(gulp.dest(dest.js.rep))
           .pipe(browserSync.stream());

   return merge(cleanJs, webpackJs);
});

// copy:assets task
gulp.task('copy:assets', () => {
    let fonts = gulp.src(src.fonts)
        .pipe(changed(dest.fonts.rep))
        .pipe(gulp.dest(dest.fonts.rep));

    let img = gulp.src(src.img)
        .pipe(changed(dest.img.rep))
        .pipe(gulp.dest(dest.img.rep));

    let icons = gulp.src(src.icons)
        .pipe(changed(dest.icons.rep))
        .pipe(gulp.dest(dest.icons.rep));

    return merge(fonts, img, icons);
});

// browserSync task
gulp.task('serve', () => {
    browserSync.init({
        proxy: 'http://localhost/wordpress',
        ws: true
    });

    gulp.watch('scss/**/*.scss', ['css']);
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('../*.php').on('change', browserSync.reload);
});

// default task
gulp.task('default',['copy:assets','serve']);