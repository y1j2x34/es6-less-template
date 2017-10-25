let {
    target
} = require("./snippets/args");

if(!target || target.length < 1){
    target = ["all"];
}

const deps = [];

const ENV_OPTIONS = require('./snippets/env');
const buildAll = contains(target, "all");
const buildLess = buildAll || contains(target, 'style') || contains(target, 'less');
const buildJs = buildAll || contains(target, 'js') || contains(target, 'script');

if(buildLess){
    deps.push("compile-less");
}
if(buildJs){
    deps.push("compile-es6");
}

exports.deps = deps;
exports.task = ENV_OPTIONS.BUILD_TASK_FACTORY();

function contains(array, value){
    return array.indexOf(value) !== -1;
}