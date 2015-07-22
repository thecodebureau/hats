// comment 
var browser = require('./browser');

var admin = {
	views: {
		Users: require('./browser/admin/views/users'),
		User: require('./browser/admin/views/user')
	}
};

_.each(admin, function(value, key) {
	if(browser[key]) _.extend(browser[key], admin[key]);

	else browser[key] = admin[key];
});

module.exports = browser;
