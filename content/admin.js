_.extend(require('ridge/util/validate/tests'), require('./client/admin/tests'));
_.extend(require('ridge/util/validate/messages'), require('./client/admin/messages'));

module.exports = {
	collections: {
		Fields: require('./client/collections/fields.js')
	},

	models: {
		Field: require('./client/models/field.js')
	},

	routes: {
		'content': {
			view: 'ContentPage',
			url: '/admin/content'
		}
	},

	views: {
		ContentPage: require('./client/admin/views/content-page'),
		FieldPage: require('./client/admin/views/field-page'),
		Field: require('./client/admin/views/field')
	}
};
