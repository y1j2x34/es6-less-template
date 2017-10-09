module.exports = function(src){
    return function taskFn() {
        const gulp = require('gulp');
        const util = require('gulp-util');
        const clean = require('gulp-clean');

        return gulp
            .src(src, { read: false })
            .pipe(clean({ force: true }))
            .on('error', util.log);
    };
};