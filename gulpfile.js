const gulp = require("gulp");
const requireDir = require("require-dir");

const tasks = requireDir("./tasks");

registerTasks(tasks);

function registerTasks(tasks){
    for (var name in tasks) {
        var taskFn = tasks[name];

        if (taskFn instanceof Function) {
            gulp.task(name, taskFn.deps || [], taskFn);
            var alias = taskFn.alias;
            if (alias) {
                alias.forEach(aliaName => gulp.task(aliaName, taskFn.deps || [], taskFn)); // jshint ignore: line
            }
        }
    }
}