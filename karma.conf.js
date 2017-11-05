// Karma configuration
// Generated on Thu Oct 19 2017 00:11:04 GMT+0800 (中国标准时间)

module.exports = function(config) {
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

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],

        // list of files / patterns to load in the browser
        files: [
            {
                pattern: 'src/app/**/*.js',
                watched: true, // 监听文件修改
                included: false,
                served: true
            },
            {
                pattern: 'spec/*.js',
                watched: true,
                included: true,
                served: true
            }
        ],

        // list of files to exclude
        exclude: ['**/*.swp'],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'spec/**/*.js': ['rollup'],
            'src/**/*.js': ['rollup']
        },

        rollupPreprocessor: {
            watch: true,
            plugins: [
                rollupNodeResolve({
                    jsnext: true,
                    browser: true,
                    extentions: ['.js', '.json']
                }),
                rollupCommonjs({
                    include: 'node_modules/**',
                    exclude: [],
                    extentions: ['.js'],
                    sourceMap: true
                }),
                rollupIncludePaths({
                    paths: ['src', 'spec']
                })
            ],
            format: 'es',
            sourcemap: 'inline'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots'],

        // web server port
        port: 9876,

        customContextFile: 'spec/context.html',

        customDebugFile: 'spec/debug.html',

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [/*'PhantomJS', */ 'Chrome'],

        plugins: ['karma-chrome-launcher', 'karma-mocha', 'karma-rollup-preprocessor'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
