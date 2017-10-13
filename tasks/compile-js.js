taskFn.deps = ['clean-js'];
taskFn.alias = [];

module.exports = taskFn;

function taskFn(callback) {
    const includePathOptions = {
        paths: ['src']
    };
    const [
        gulp,
        rollup,
        babel,
        rollupIncludePaths,
        rollupNodeResolve,
        rollupCommonjs,
        cached,
        remember,
        sourcemaps,
        rename,
        source,
        buffer,
        util,
        rev,
        uglify,
        gulpOptions
    ] = [
        'gulp',
        'rollup-stream',
        'gulp-babel',
        'rollup-plugin-includepaths',
        'rollup-plugin-node-resolve',
        'rollup-plugin-commonjs',
        "gulp-cached",
        "gulp-remember",
        'gulp-sourcemaps',
        'gulp-rename',
        'vinyl-source-stream',
        'vinyl-buffer',
        'gulp-util',
        'gulp-rev',
        "gulp-uglify",
        './snippets/gulp-options.json'
    ].map(require);

    const rollupOptions = {
        input: gulpOptions.mainJSPath,
        sourcemap: true,
        format: 'es',
        plugins: [
            rollupNodeResolve({
                jsnext: true
            }),
            rollupCommonjs({
                include: 'node_modules/**',
                exclude: [],
                extentions: ['.js', '.coffee'],
                sourceMap: true
            }),
            rollupIncludePaths(includePathOptions)
        ]
    };
    
    return rollup(rollupOptions)
        .pipe(source('src/app/index.js'))
        .pipe(cached("scripts"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(babel({ 
            presets: [['env', { 
                // "targets": {
                //     ie: 8
                // }
                "browsers": "last 2 versions"
            }]],
            babelrc: false 
        }))
        .on('error', util.log)
        .pipe(uglify())
        .pipe(remember("scripts"))
        .pipe(rename('index.js'))
        .pipe(rev())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(gulpOptions.dest))
        .pipe(require('./snippets/rev-manifest')())
        .pipe(gulp.dest(gulpOptions.dest));
}