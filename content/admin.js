var browser = require('./browser');

var admin = {
	views: {
		ContentPage: require('./browser/admin/views/content-page'),
		FieldPage: require('./browser/admin/views/field-page'),
		Field: require('./browser/admin/views/field')
	}
};

_.each(admin, function(value, key) {
	if(browser[key]) _.extend(browser[key], admin[key]);

	else browser[key] = admin[key];
});

module.exports = browser;
