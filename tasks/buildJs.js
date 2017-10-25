exports.deps = ["compile-es6"];

const ENV_OPTIONS = require('./snippets/env');
if (ENV_OPTIONS.REV) {
    exports.task = ENV_OPTIONS.BUILD_TASK_FACTORY();
} else {
    exports.task = function() {};
}