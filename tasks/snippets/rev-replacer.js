module.exports = function(){
    return function taskFn(){
        const gulp = require('gulp');
        const path = require("path");
        const revReplace = require('gulp-rev-replace');
        const ENV_OPTIONS = require("./env");

        return gulp
            .src("src/index.html")
            .pipe(revReplace({ manifest: gulp.src(path.join(ENV_OPTIONS.DEST_FOLDER, 'rev-manifest.json')) }))
            .pipe(gulp.dest(ENV_OPTIONS.DEST_FOLDER));
    }
}