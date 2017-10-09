module.exports = taskFn;
taskFn.deps = ["build"];

function taskFn(){
    var gulp = require("gulp");
    gulp.watch(["src/style/*.less"], ["build-less"]);
    gulp.watch(["src/app/**/*.js", "!src/**/*.spec.js"], ["build-js"]);

}