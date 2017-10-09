const taskFn = require("./snippets/cleaner")(["dist/*.css", "dist/*.css.map"])
taskFn.deps = [];

module.exports = taskFn;
