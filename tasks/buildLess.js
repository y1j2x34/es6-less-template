const ENV_OPTIONS = require('./snippets/env');
const taskFn = ENV_OPTIONS.BUILD_TASK_FACTORY();
taskFn.deps = ['compile-less'];

module.exports = taskFn;
