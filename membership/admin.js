module.exports = {
	collections: {
		Invites: require('./client/admin/collections/invites'),
		Permissions: require('./client/admin/collections/permissions'),
		Roles: require('./client/admin/collections/roles'),
		Users: require('./client/admin/collections/users'),
	},

	models: {
		Invite: require('./client/admin/models/invite'),
		Permission: require('./client/admin/models/permission'),
		Role: require('./client/admin/models/role'),
		//User: require('./client/admin/models/user'),
	},

	routes: {
		'membership': {
			view: 'Page',
			reload: true,
			routes: {
				'roles': {
					view: 'RolesPage',
					reload: true
				},
				permissions: {
					view: 'PermissionsPage',
					reload: true
				},
				'invites': {
					view: 'InvitesPage',
					reload: true
				},
			},
		}
	},


	views: {
		Form: require('ridge/views/form'),
		Invite: require('./client/admin/views/invite'),
		InvitePage: require('./client/admin/views/invite-page'),
		InvitesPage: require('./client/admin/views/invites-page'),
		Permission: require('./client/admin/views/permission'),
		PermissionPage: require('./client/admin/views/permission-page'),
		PermissionsPage: require('./client/admin/views/permissions-page'),
		Role: require('./client/admin/views/role'),
		RolePage: require('./client/admin/views/role-page'),
		RolesPage: require('./client/admin/views/roles-page'),
		User: require('./client/admin/views/user'),
		Users: require('./client/admin/views/users')
	}
};
