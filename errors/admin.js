module.exports = {
	collections: {
		Errors: require('./client/admin/collections/errors.js')
	},

	routes: {
		'errors': {
			reload: true,
			view: 'ErrorsPage'
		}
	},

	views: {
		ErrorsPage: require('./client/admin/views/errors-page.js'),
		Error: require('./client/admin/views/error.js')
	}
};


