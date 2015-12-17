module.exports = {
	collections: {
		Errors: require('./client/admin/collections/errors.js')
	},

	routes: {
		'errors': {
			view: 'ErrorsPage',
			url: '/admin/errors'
		}
	},

	views: {
		ErrorsPage: require('./client/admin/views/errors-page.js'),
		Error: require('./client/admin/views/error.js')
	}
};


