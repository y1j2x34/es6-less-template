const argv = require('argv');
const SUPPORTED_TARGET_RESOURCE_TYPES = ["js", "script", "style", "less", "all"];
argv.type('target', function(value) {
    if(SUPPORTED_TARGET_RESOURCE_TYPES.indexOf(value) === -1){
        throw new Error("illegal argument(target): " + value);
    }
    return value;
});
argv.type('env', function(value) {
    if (value === true || value === 'true') {
        return 'develop';
    } else if (value !== 'develop' && value !== 'release') {
        throw new Error('illegal argument(env): ' + value);
    }
    return value;
});

argv.version("1.0.0");

argv.option({
    name: 'help',
    type: 'string',
    short: '?',
    description: `
        display this help and exit
        npm run help
    `
});

argv.mod({
    mod: "build",
    description: "compile js and less files",
    options: [
        {
            name: 'env',
            type: 'env',
            short: 'e',
            description: `
                gulp build --env=develop
                gulp build --env=release

                default: develop
            `
        },
        {
            name: 'version',
            type: 'string',
            short: 'v',
            description: `
                it works only if env equals to 'release'
                gulp build --env=release --version=1.0.0
                gulp build --env=release -v=1.0.0
            `
        },
        {
            name: 'target',
            type: 'csv,target',
            short: "t",
            description: `
                resource types for build task
                gulp build --target=js,style
                gulp build --target=script,less
                gulp build --target=all
                
                default: all
            `
        }
    ]
});

argv.mod({
    mod: "watch",
    options: [{
        name: 'target',
        type: 'csv,target',
        short: "t",
        description: `
            resource types for watch task
            gulp watch --target=js,style
            gulp watch --target=all
            
            default: all
        `
    }]
});

const args = argv.run();
const options = args.options;

if (options.help === "true") {
    
    let isBuildMod = args.targets.indexOf("build") !== -1;
    let isWatchMod = args.targets.indexOf("watch") !== -1;
    const listAll = !isBuildMod && !isWatchMod;
    if(listAll){
        isBuildMod = true;
        isWatchMod = true;
    }
    if(isBuildMod){
        console.log('====================== gulp build ====================== ');
        argv.help("build");
    } 
    if(isWatchMod){
        console.log('====================== gulp watch ====================== ');
        argv.help("watch");
    } 
    process.exit(0);
}
if(args.env === "release" && !args.version){
    console.error('--version is required when --env=release');
    process.exit(-1);
}
module.exports = options;
