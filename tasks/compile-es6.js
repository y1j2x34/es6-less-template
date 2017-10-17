taskFn.deps = ['clean-js'];
taskFn.alias = [];

module.exports = taskFn;

function taskFn(callback) {
    const ENV_OPTIONS = require('./snippets/env');

    const [
        gulp, //
        rollup, //
        babel, //
        cached, //
        remember, //
        sourcemaps, //
        rename, //
        source, //
        buffer, //
        util, //
        rev, //
        uglify //
    ] = [
        'gulp',
        'rollup-stream',
        'gulp-babel',
        'gulp-cached',
        'gulp-remember',
        'gulp-sourcemaps',
        'gulp-rename',
        'vinyl-source-stream',
        'vinyl-buffer',
        'gulp-util',
        'gulp-rev',
        'gulp-uglify'
    ].map(require);

    const rollupOptions = buildRollupOptions(ENV_OPTIONS);

    let stream = rollup(rollupOptions)
        .pipe(source(rollupOptions.input))
        .pipe(cached('scripts'))
        .pipe(buffer());
    if (ENV_OPTIONS.SOURCE_MAP) {
        stream = stream.pipe(sourcemaps.init({ loadMaps: true }));
    }
    stream = stream
        .pipe(
            babel({
                presets: [
                    [
                        'env',
                        {
                            // "targets": {
                            //     ie: 8
                            // }
                            browsers: 'last 2 versions'
                        }
                    ]
                ],
                babelrc: false
            })
        )
        .on('error', util.log);
    if(ENV_OPTIONS.UGLIFY){
        stream = stram.pipe(uglify());
    }

    stream = stream.pipe(remember('scripts'))
        .pipe(rename('index.js'));
    if (ENV_OPTIONS.REV) {
        stream = stream.pipe(rev());
    }
    if (ENV_OPTIONS.SOURCE_MAP) {
        stream = stream.pipe(sourcemaps.write('.'));
    }
    stream = stream.pipe(gulp.dest(ENV_OPTIONS.DEST_FOLDER));
    if (ENV_OPTIONS.REV) {
        stream = stream //
            .pipe(require('./snippets/rev-manifest')()) //
            .pipe(gulp.dest(ENV_OPTIONS.DEST_FOLDER)); //
    }
    return stream;
}
function buildRollupOptions(ENV_OPTIONS) {
    const includePathOptions = { paths: ['src'] };
    const [
        rollupIncludePaths, //
        rollupNodeResolve, //
        rollupCommonjs, //
        rollupStrip //
    ] = [
        'rollup-plugin-includepaths',
        'rollup-plugin-node-resolve',
        'rollup-plugin-commonjs',
        'rollup-plugin-strip'
    ].map(require);
    const plugins = [
        rollupNodeResolve({
            jsnext: true,
            browser: true,
            extentions: ['.js', '.json']
        }),
        rollupCommonjs({
            include: 'node_modules/**',
            exclude: [],
            extentions: ['.js'],
            sourceMap: ENV_OPTIONS.SOURCE_MAP
        }),
        rollupIncludePaths(includePathOptions)
    ];
    if (ENV_OPTIONS.STRIP) {
        plugins.push(rollupStrip(ENV_OPTIONS.ROLLUP_STRIP_OPTIONS));
    }
    return {
        input: ENV_OPTIONS.MAIN_JS,
        sourcemap: ENV_OPTIONS.SOURCE_MAP,
        format: 'es',
        plugins: plugins
    };
}
