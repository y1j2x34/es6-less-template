const ENV_OPTIONS = require("./snippets/env");
const path = require('path');

const fileLocations = [path.join(ENV_OPTIONS.DEST_FOLDER, "*.js"), path.join(ENV_OPTIONS.DEST_FOLDER, '*.js.map')];

exports.task = require('./snippets/cleaner')(fileLocations);
