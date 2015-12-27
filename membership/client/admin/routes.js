module.exports = {
	'membership': {
		view: 'Page',
		reload: true,
		routes: {
			'roles': {
				view: 'RolesPage',
				reload: true,
				routes: {
					':id': {
						view: 'RolePage',
						reload: true
					}
				}
			},
			permissions: {
				view: 'PermissionsPage',
				reload: true,
				routes: {
					':id': {
						view: 'PermissionPage',
						reload: true
					}
				}
			},
			'invites': {
				view: 'InvitesPage',
				reload: true,
				routes: {
					':id': {
						view: 'InvitePage',
						reload: true
					}
				}
			},
		},
	}
};
