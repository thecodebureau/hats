var browser = require('./browser');

var admin = {
	views: {
		Organization: require('./browser/admin/views/organization.js')
	}
};

_.each(admin, function(value, key) {
	if(browser[key]) _.extend(browser[key], admin[key]);

	else browser[key] = admin[key];
});

module.exports = browser;
