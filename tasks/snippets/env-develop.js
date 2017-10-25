module.exports = function(options){
    const path = require("path");
    const destFolder = path.join(process.cwd(), "dist");
    return {
        MAIN_JS: "src/app/index.js",
        DEST_FOLDER: destFolder,
        STRIP: false,
        SOURCE_MAP: true,
        UGLIFY: false,
        WATCH_MOD: options.mod === "watch",
        BUILD_TASK_FACTORY: function(){
            return function() {
                const gulp = require('gulp');
                return gulp.src('src/index.html').pipe(gulp.dest('dist'));
            };
        }
    };
};