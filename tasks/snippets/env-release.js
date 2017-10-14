module.exports = function(options){
    const {
        version
    } = options;
    const path = require("path");
    const fs = require("fs");
    var releasesDir = path.join(process.cwd(), "releases");
    var destFolder = path.join(releasesDir, version);

    if(!fs.existsSync(releasesDir)){
        fs.mkdirSync(releasesDir, 0777);
    }

    if(fs.existsSync(destFolder)){
        throw new Error(`Destination folder '${destFolder}' already exists!`);
    } else {
        fs.mkdirSync(destFolder);
    }

    return {
        MAIN_JS: "src/app/index.js",
        DEST_FOLDER: destFolder,
        SOURCE_MAP: false,
        REV: true,
        STRIP: true,
        ROLLUP_STRIP_OPTIONS: {
            debugger: true,
            functions: [
                "console.log",
                "console.debug",
                "alert"
            ],
            sourceMap: false
        },
        BUILD_TASK_FACTORY: require("./rev-replacer")
    };
};