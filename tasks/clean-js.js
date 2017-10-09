const taskFn = require('./snippets/cleaner')(['dist/*.js', 'dist/*.js.map']);
taskFn.deps = [];

module.exports = taskFn;
