module.exports = {
	collections: {
		Invites: require('./browser/admin/collections/invites'),
		Permissions: require('./browser/admin/collections/permissions'),
		Roles: require('./browser/admin/collections/roles'),
		Users: require('./browser/admin/collections/users'),
	},

	models: {
		Invite: require('./browser/admin/models/invite'),
		Permission: require('./browser/admin/models/permission'),
		Role: require('./browser/admin/models/role'),
		//User: require('./browser/admin/models/user'),
	},

	routes: require('./browser/admin/routes'),

	views: {
		Form: require('ridge/views/form'),
		Invite: require('./browser/admin/views/invite'),
		InvitePage: require('./browser/admin/views/invite-page'),
		InvitesPage: require('./browser/admin/views/invites-page'),
		Permission: require('./browser/admin/views/permission'),
		PermissionPage: require('./browser/admin/views/permission-page'),
		PermissionsPage: require('./browser/admin/views/permissions-page'),
		Role: require('./browser/admin/views/role'),
		RolePage: require('./browser/admin/views/role-page'),
		RolesPage: require('./browser/admin/views/roles-page'),
		User: require('./browser/admin/views/user'),
		Users: require('./browser/admin/views/users')
	}
};
