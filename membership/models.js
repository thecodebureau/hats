var requireDir = require('require-dir');

module.exports = requireDir('./models', { camelcase: true });
