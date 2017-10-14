module.exports = taskFn;
taskFn.deps = ["build"];

function taskFn(){
    const gulp = require("gulp");
    const cache = require("gulp-cached");
    const remember = require("gulp-remember");
    const ENV_OPTIONS = require("./snippets/env");

    gulp.watch(["src/style/*.less"], ["buildLess"]);
    const scriptsWatcher = gulp.watch(["src/app/**/*.js", "!src/**/*.spec.js"], ["buildJs"]);

    if(ENV_OPTIONS.env === "release"){
        gulp.watch("src/index.html", ["updateIndexHtml"]);
    }

    scriptsWatcher.on('change', function(event) {
        if (event.type === 'deleted') {
            delete cache.caches.scripts[event.path];
            remember.forget('scripts', event.path);
        }
    });
}