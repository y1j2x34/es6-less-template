module.exports = function(){
    require("./snippets/args");
    const argv = require("argv");

    console.log('====================== gulp build ====================== ');
    argv.help("build");
    console.log('====================== gulp watch ====================== ');
    argv.help("watch");
};