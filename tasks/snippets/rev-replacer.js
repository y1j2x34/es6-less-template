module.exports = function(){
    return function taskFn(){
        const gulp = require('gulp');
        const revReplace = require('gulp-rev-replace');
        const options = require('./gulp-options.json');
        return gulp
            .src(options.indexHtmlPath)
            .pipe(revReplace({ manifest: gulp.src(options.manifestPath) }))
            .pipe(gulp.dest(options.dest));
    }
}