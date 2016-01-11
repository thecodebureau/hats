module.exports = {
	'membership': {
		view: require('ridge/views/page'),
		reload: true,
		routes: {
			'roles': {
				view: require('./views/roles-page'),
				reload: true,
				routes: {
					':id': {
						view: require('./views/role-page'),
						reload: true
					}
				}
			},
			permissions: {
				view: require('./views/permissions-page'),
				reload: true,
				routes: {
					':id': {
						view: require('./views/permission-page'),
						reload: true
					}
				}
			},
			'invites': {
				view: require('./views/invites-page'),
				reload: true,
				routes: {
					':id': {
						view: require('./views/invite-page'),
						reload: true
					}
				}
			},
		},
	}
};
