module.exports = taskFn;
taskFn.deps = ["clean-css"];

function taskFn(){
    const ENV_OPTIONS = require("./snippets/env");
    const gulp = require("gulp");
    const less = require("gulp-less");
    const util = require("gulp-util");
    const rev = require("gulp-rev");
    const rename = require("gulp-rename");
    const sourcemaps = require('gulp-sourcemaps');
    
    let stream = gulp.src('./src/style/app.less');
    
    if(ENV_OPTIONS.SOURCE_MAP){
        stream = stream.pipe(sourcemaps.init());
    }

    stream = stream.pipe(less()).pipe(rename('app.css'));

    if(ENV_OPTIONS.REV){
        stream = stream.pipe(rev())
    }
    if(ENV_OPTIONS.SOURCE_MAP){
        stream = stream.pipe(sourcemaps.write("."))
    }

    stream = stream.on('error', util.log).pipe(gulp.dest(ENV_OPTIONS.DEST_FOLDER))

    if(ENV_OPTIONS.REV){
        stream = stream.pipe(require('./snippets/rev-manifest')()).pipe(gulp.dest(ENV_OPTIONS.DEST_FOLDER));
    }
    return stream;
}