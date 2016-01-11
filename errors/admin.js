var ErrorsPage = require('./client/admin/views/errors-page.js');

module.exports = {
	collections: {
		Errors: require('./client/admin/collections/errors.js')
	},

	routes: require('./client/admin/routes'),

	views: {
		ErrorsPage: ErrorsPage,
		Error: require('./client/admin/views/error.js')
	}
};


