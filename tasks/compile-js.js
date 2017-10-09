taskFn.deps = ['clean-js'];
taskFn.alias = [];

module.exports = taskFn;

function taskFn() {
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
        sourcemaps,
        rename,
        source,
        buffer,
        util,
        rev,
        gulpOptions
    ] = [
        'gulp',
        'rollup-stream',
        'gulp-babel',
        'rollup-plugin-includepaths',
        'rollup-plugin-node-resolve',
        'rollup-plugin-commonjs',
        'gulp-sourcemaps',
        'gulp-rename',
        'vinyl-source-stream',
        'vinyl-buffer',
        'gulp-util',
        'gulp-rev',
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
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(babel({ presets: [['es2015', { modules: false }]], babelrc: false }))
        .on('error', util.log)
        .pipe(rename('index.js'))
        .pipe(rev())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(gulpOptions.dest))
        .pipe(require('./snippets/rev-manifest'))
        .pipe(gulp.dest(gulpOptions.dest));
}