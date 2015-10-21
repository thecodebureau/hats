var browser = require('./browser');

var admin = {
	views: {
		GalleryImagePage: require('./client/admin/views/gallery-image-page'),
		GalleryPage: require('./client/admin/views/gallery-page'),
		GalleryImage: require('./client/admin/views/gallery-image'),
	}
};

_.each(admin, function(value, key) {
	if(browser[key]) _.extend(browser[key], value);
	else browser[key] = value;
});

module.exports = browser;
