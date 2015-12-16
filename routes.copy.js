var passport = require('passport');

var isAuthenticated = mw.authorization.isAuthenticated;
var isAdmin = mw.authorization.isAdmin;
var isAuthenticated = mw.authorization.isAuthenticated;
var isCurrent = mw.authorization.isCurrent;


mw = mw.api.invites;

var routes = {
	'/api/invites': {
		get: [ isAuthenticated, mw.formatQuery, mw.paginate, mw.find ],
		post: [ isAuthenticated, mw.create ],
	},

	'/api/invites/:id': {
		delete: [ isAuthenticated, mw.remove ]
	},

	'/api/permissions/': {
		post: [ isAuthenticated, mw.create ],
		get: [ isAuthenticated, mw.formatQuery, mw.paginate, mw.find ],
	},

	'/api/permissions/:id': {
		get: [ isAuthenticated, mw.findById ],
		put: [ isAuthenticated, mw.put ],
		delete: [ isAuthenticated, mw.remove ]
	},

	'/api/roles/': {
		get: [ isAuthenticated, mw.formatQuery, mw.paginate, mw.find ],
		post: [ isAuthenticated, mw.create ]
	},

	'/api/roles/:id': {
		get: [ isAuthenticated, mw.findById ],
		delete: [ isAuthenticated, mw.remove ],
	},

	'/api/users/': {
		post: [ mw.register ],
		get: [ isAuthenticated, mw.query ],
	},

	'/api/users/:id': {
		get: [ isCurrent, mw.findOne ],
		put: [ isCurrent, mw.update ],
		patch: [ isCurrent, mw.update ],
		delete: [ isAuthenticated, mw.remove ]
	},

	'/api/users/reset-password': {
		post: [ mw.resetPassword ],
	},

	'/api/users/update-password': {
		post: [ mw.updatePassword ]
	}, 

	'/auth/local': {
		post:  [ mw.local ],
	},

	'/auth/logout': {
		get: [ mw.logout ],
	},

	'/auth/verify': {
		get: [ mw.api.users.verify ]
	}
};

passport.providers.forEach(function(provider) {
	routes['/auth/' + provider] = {
		get: [ mw[provider].login ]
	};
	routes['/auth/' + provider + '/callback'] = {
		get: [ mw[provider].callback ]
	};
	routes['/auth/' + provider + '/verify'] = {
		get: [ mw[provider].verify ]
	};
});

module.exports = routes;
