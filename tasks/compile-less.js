exports.deps = ["clean-css"];
exports.task = () => {
    const ENV_OPTIONS = require("./snippets/env");
    const gulp = require("gulp");
    const less = require("gulp-less");
    const util = require("gulp-util");
    const rev = require("gulp-rev");
    const rename = require("gulp-rename");
    const sourcemaps = require('gulp-sourcemaps');
    const cleanCss = require("gulp-clean-css");

    const LessAutoPrefix = require("less-plugin-autoprefix");

    const autoprefix = new LessAutoPrefix({ browsers: 'last 2 versions' });

    let stream = gulp.src('./src/style/app.less');
    
    if(ENV_OPTIONS.SOURCE_MAP){
        stream = stream.pipe(sourcemaps.init());
    }
    
    stream = stream.pipe(less({
        plugins: [autoprefix]
    })).pipe(rename('app.css'));

    if(ENV_OPTIONS.UGLIFY){
        stream = stream.pipe(cleanCss());
    }

    if(ENV_OPTIONS.REV){
        stream = stream.pipe(rev());
    }

    if(ENV_OPTIONS.SOURCE_MAP){
        stream = stream.pipe(sourcemaps.write("."));
    }

    stream = stream.on('error', util.log).pipe(gulp.dest(ENV_OPTIONS.DEST_FOLDER));

    if(ENV_OPTIONS.REV){
        stream = stream.pipe(require('./snippets/rev-manifest')()).pipe(gulp.dest(ENV_OPTIONS.DEST_FOLDER));
    }
    return stream;
}