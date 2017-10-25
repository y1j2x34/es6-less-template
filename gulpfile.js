const gulp = require('gulp');
const requireDir = require('require-dir');

const taskModules = requireDir('./tasks');

registerTasks(taskModules);

function registerTasks(taskModules) {
    Object.entries(taskModules) //
        .filter(([, { task }]) => task instanceof Function) //
        .forEach(([name, { deps, alias, task }]) => {
            deps = deps || [];
            alias = alias || [];
            alias.unshift(name);
            alias.forEach(aliaName => gulp.task(aliaName, deps, task));
        });
}
