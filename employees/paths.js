var path = require('path');

module.exports = {
	models: path.join(__dirname, 'server', 'models'),
	mw: path.join(__dirname, 'server', 'middleware'),
	routes: path.join(__dirname, 'server', 'routes'),
	templates: path.join(__dirname, 'server', 'templates')
};
