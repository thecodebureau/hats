_.extend(require('ridge/util/validate/tests'), require('./client/admin/tests'));
_.extend(require('ridge/util/validate/messages'), require('./client/admin/messages'));

var ContentPage = require('./client/admin/views/content-page');
var FieldPage = require('./client/admin/views/field-page');

module.exports = {
	collections: {
		Fields: require('./client/collections/fields.js')
	},

	models: {
		Field: require('./client/models/field.js')
	},

	routes: require('./client/admin/routes'),

	views: {
		ContentPage: ContentPage,
		FieldPage: FieldPage,
		Field: require('./client/admin/views/field')
	}
};
