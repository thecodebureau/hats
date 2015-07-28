module.exports = {
	collections: {
		Invites: require('./collections/invites.js'),
		Permissions: require('./collections/permissions.js'),
		Roles: require('./collections/roles.js'),
		Users: require('./collections/users.js'),
	},
	views: {
		ModelControls: require('./views/model-controls'),
		ImageUpload: require('./views/image-upload'),
		Form: require('./views/form'),
		Crud: require('./views/crud'),
		CrudModel: require('./views/crud-model'),
		CrudCollection: require('./views/crud-collection'),
	}
};
