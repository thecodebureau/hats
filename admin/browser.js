module.exports = {
	collections: {
		Invites: require('./browser/collections/invites'),
		Permissions: require('./browser/collections/permissions'),
		Roles: require('./browser/collections/roles'),
		Users: require('./browser/collections/users'),
	},

	models: {
		Invite: require('./browser/models/invite'),
		Permission: require('./browser/models/permission'),
		Role: require('./browser/models/role'),
		//User: require('./browser/models/user'),
	},

	views: {
		Navigation: require('./browser/views/navigation'),
		ModelControls: require('./browser/views/model-controls'),
		Form: require('ridge/views/form'),
		Invite: require('./browser/views/invite'),
		InvitePage: require('./browser/views/invite-page'),
		InvitesPage: require('./browser/views/invites-page'),
		Permission: require('./browser/views/permission'),
		PermissionPage: require('./browser/views/permission-page'),
		PermissionsPage: require('./browser/views/permissions-page'),
		Role: require('./browser/views/role'),
		RolePage: require('./browser/views/role-page'),
		RolesPage: require('./browser/views/roles-page'),
		User: require('./browser/views/user'),
		Users: require('./browser/views/users')
	}
};
