const rev = require('gulp-rev');
const path = require("path");
const ENV_OPTIONS = require("./env");
module.exports = function() {
    return rev.manifest(path.join(ENV_OPTIONS.DEST_FOLDER, "rev-manifest.json"), {
        base: ENV_OPTIONS.DEST_FOLDER,
        merge: true
    });
};
