var passport = require('passport');

var mw = require('./middleware');

var isAuthenticated = mw.authorization.isAuthenticated,
	isAdmin = mw.authorization.isAdmin,
	isAuthenticated = mw.authorization.isAuthenticated,
	isCurrent = mw.authorization.isCurrent;


var routes = [
	[ '/api/invites/',				'get',		[ isAuthenticated, mw.invites.formatQuery, mw.invites.paginate, mw.invites.find ]],
	[ '/api/invites/',				'post',		[ isAuthenticated, mw.invites.create ]],
	[ '/api/invites/:id',			'delete',	[ isAuthenticated, mw.invites.remove ]],
	[ '/api/permissions/',		'get',		[ isAuthenticated, mw.permissions.formatQuery, mw.permissions.paginate, mw.permissions.find ]],
	[ '/api/permissions/',		'post',		[ isAuthenticated, mw.permissions.create ]],
	[ '/api/permissions/:id',	'get',		[ isAuthenticated, mw.permissions.findById ]],
	[ '/api/permissions/:id', 'delete',	[ isAuthenticated, mw.permissions.remove ]],
	[ '/api/permissions/:id', 'put',		[ isAuthenticated, mw.permissions.put ]],
	[ '/api/roles/',					'get',		[ isAuthenticated, mw.roles.formatQuery, mw.roles.paginate, mw.roles.find ]],
	[ '/api/roles/',					'post',		[ isAuthenticated, mw.roles.create ]],
	[ '/api/roles/:id',				'delete', [ isAuthenticated, mw.roles.remove ]],
	[ '/api/roles/:id',				'get',		[ isAuthenticated, mw.roles.findById ]],
	[ '/api/roles/:id',				'put',		[ isAuthenticated, mw.roles.put ]],
	[ '/api/users/',					'get',		[ isAuthenticated, mw.users.query ] ],
	[ '/api/users/',					'post',		[ mw.users.register ]],
	[ '/api/users/:id',				'delete', [ isAuthenticated, mw.users.remove ]],
	[ '/api/users/:id',				'get',		[ isCurrent, mw.users.findOne ] ],
	[ '/api/users/:id',				'patch',	[ isCurrent, mw.users.update ] ],
	[ '/api/users/:id',				'put',		[ isCurrent, mw.users.update ] ],
	[ '/api/users/reset-password',	'post', [ mw.users.resetPassword ] ],
	[ '/api/users/update-password', 'post', [ mw.users.updatePassword ] ],
	[ '/auth/local',					'post',		[ mw.passport.local ]],
	[ '/auth/logout',					'get',		[ mw.passport.logout ]],
	[ '/auth/verify',					'get',		[ mw.users.verify ]]
];

passport.providers.forEach(function(provider) {
	routes.push([ '/auth/' + provider, 'get', mw.passport[provider].login ]);
	routes.push([ '/auth/' + provider + '/callback', 'get', mw.passport[provider].callback ]);
	routes.push([ '/auth/' + provider + '/verify', 'get', mw.passport[provider].verify ]);
});

module.exports = routes;
