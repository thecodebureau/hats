module.exports = {
	collections: {
		Invites: require('./browser/collections/invites.js'),
		Permissions: require('./browser/collections/permissions.js'),
		Roles: require('./browser/collections/roles.js'),
		Users: require('./browser/collections/users.js'),
	},

	views: {
		Navigation: require('./browser/views/navigation'),
		ModelControls: require('./browser/views/model-controls'),
		Form: require('ridge/views/form'),
		PermissionPage: require('./browser/views/permission-page.js'),
		PermissionsPage: require('./browser/views/permissions-page.js'),
		RolePage: require('./browser/views/role-page.js'),
		RolesPage: require('./browser/views/roles-page.js'),
		User: require('./browser/views/user'),
		Users: require('./browser/views/users')
	}
};
