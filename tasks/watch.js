module.exports = taskFn;
taskFn.deps = ["build"];

function taskFn(){
    const gulp = require("gulp");
    const cache = require("gulp-cached");
    const remember = require("gulp-remember");

    gulp.watch(["src/style/*.less"], ["build-less"]);
    const scriptsWatcher = gulp.watch(["src/app/**/*.js", "!src/**/*.spec.js"], ["build-js"]);
    gulp.watch("src/index.html", ["replace-html-res"]);

    scriptsWatcher.on('change', function(event) {
        if (event.type === 'deleted') {
            delete cache.caches.scripts[event.path];
            remember.forget('scripts', event.path);
        }
    });
}