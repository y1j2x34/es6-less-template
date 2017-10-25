exports.deps = ['build'];

exports.task = () => {
    const gulp = require('gulp');
    const watch = require('gulp-watch');
    const cache = require('gulp-cached');
    const remember = require('gulp-remember');
    const browserSync = require('browser-sync').create();
    const ENV_OPTIONS = require('./snippets/env');


    watch(['src/style/**/*.less'], function(){
        gulp.start('buildLess');
    });

    watch(['src/app/**/*.js', '!src/**/*.spec.js'], function() {
        gulp.start('buildJs');
    }).on('unlink', path => {
        console.log(`file ${path} has been removed`);
        delete cache.caches.scripts[path];
        remember.forget('scripts', path);
    });

    watch('src/index.html', function(){
        gulp.start('updateIndexHtml');
    });

    watch([ENV_OPTIONS.DEST_FOLDER + '\\*.css'], function() {
        gulp.src([ENV_OPTIONS.DEST_FOLDER + '\\*.css']).pipe(browserSync.stream());
    });

    watch([ENV_OPTIONS.DEST_FOLDER + '\\*.js', ENV_OPTIONS.DEST_FOLDER + '\\*.html'])
        .on('unlink', (path) => {
            console.info("dest folder unlink ", path);
            reloadBrowser();
        })
        .on('add', (path) => {
            console.info("dest folder add ", path);
            reloadBrowser();
        })
        .on('change', (path) => {
            console.info("dest folder change ", path);
            reloadBrowser();
        });
    
    if (ENV_OPTIONS.WATCH_MOD) {
        browserSync.init({ server: ENV_OPTIONS.DEST_FOLDER });
    }

    var timmer;
    function reloadBrowser(){
        clearTimeout(timer);
        timer = setTimeout(function() {
            browserSync.reload();
        }, 500);
    }
};
