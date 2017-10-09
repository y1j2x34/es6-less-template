var rev = require("gulp-rev");
module.exports = rev.manifest('dist/rev-manifest.json', {
    base: process.cwd() + '/dist',
    merge: true
});