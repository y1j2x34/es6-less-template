module.exports = taskFn;
taskFn.deps = ["clean-css"];

function taskFn(){
    const options = require("./snippets/gulp-options.json");
    const gulp = require("gulp");
    const less = require("gulp-less");
    const util = require("gulp-util");
    const rev = require("gulp-rev");
    const rename = require("gulp-rename");
    const sourcemaps = require('gulp-sourcemaps');
    
    return gulp
        .src('./src/style/app.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(rename('app.css'))
        .pipe(rev())
        .pipe(sourcemaps.write("."))
        .on('error', util.log)
        .pipe(gulp.dest(options.dest))
        .pipe(require("./snippets/rev-manifest")())
        .pipe(gulp.dest(options.dest));
}