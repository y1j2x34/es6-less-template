const args = require('./args');

const { env, version } = args;

if (env === 'release' && !version) {
    console.error('version parameter is required for release evironment');
    process.exit(-1);
    return;
}

module.exports = require('./env-' + (env || "develop"))(args);
