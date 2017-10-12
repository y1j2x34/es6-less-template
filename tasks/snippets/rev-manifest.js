const rev = require('gulp-rev');
const options = require("./gulp-options.json");
module.exports = function() {
    return rev.manifest(options.manifestPath, {
        base: process.cwd() + '/dist',
        merge: true
    });
};
