var requireDir = require('require-dir');

module.exports = requireDir('./middleware', { camelcase: true, recurse: true });
