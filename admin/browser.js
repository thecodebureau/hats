module.exports = {
	collections: {
		Invites: require('./browser/collections/invites.js'),
		Permissions: require('./browser/collections/permissions.js'),
		Roles: require('./browser/collections/roles.js'),
		Users: require('./browser/collections/users.js'),
	},

	views: {
		Navigation: require('./browser/views/navigation'),
		//ImageUpload: require('./browser/views/image-upload'),
		//CrudForm: require('./browser/views/crud-form'),
		//Crud: require('./browser/views/crud'),
		//CrudModel: require('./browser/views/crud-model'),
		//CrudCollection: require('./browser/views/crud-collection'),
		User: require('./browser/views/user'),
		Users: require('./browser/views/users')
	}
};
