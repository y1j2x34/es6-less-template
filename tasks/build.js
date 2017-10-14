let {
    target
} = require("./snippets/args");

if(!target || target.length < 1){
    target = ["all"];
}

const ENV_OPTIONS = require('./snippets/env');
const taskFn = ENV_OPTIONS.BUILD_TASK_FACTORY();

const buildAll = contains(target, "all");
const buildLess = buildAll || contains(target, 'style') || contains(target, 'less');
const buildJs = buildAll || contains(target, 'js') || contains(target, 'script');

function contains(array, value){
    return array.indexOf(value) !== -1;
}

const deps = [];

if(buildLess){
    deps.push("compile-less");
}

if(buildJs){
    deps.push("compile-es6");
}

taskFn.deps = deps;

module.exports = taskFn;