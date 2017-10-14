const ENV_OPTIONS = require('./snippets/env');
const taskFn = ENV_OPTIONS.BUILD_TASK_FACTORY();
taskFn.deps = ["compile-es6"];

module.exports = taskFn;