module.exports = {
	'gallery': {
		view: require('./views/gallery-page'),
		reload: true,
		routes: {
			':id': {
				view: require('./views/gallery-image-page'),
				reload: true
			}
		}
	}
};
