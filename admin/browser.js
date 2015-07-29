module.exports = {
	collections: {
		Invites: require('./browser/collections/invites.js'),
		Permissions: require('./browser/collections/permissions.js'),
		Roles: require('./browser/collections/roles.js'),
		Users: require('./browser/collections/users.js'),
	},
	views: {
		ModelControls: require('./browser/views/model-controls'),
		ImageUpload: require('./browser/views/image-upload'),
		Form: require('./browser/views/form'),
		Crud: require('./browser/views/crud'),
		CrudModel: require('./browser/views/crud-model'),
		CrudCollection: require('./browser/views/crud-collection'),
	}
};
