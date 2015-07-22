var browser = require('./browser');

var admin = {
	//views: require('./client/admin/views')
};

_.each(admin, function(value, key) {
	if(browser[key]) _.extend(browser[key], value);
	else browser[key] = value;
});

module.exports = browser;
