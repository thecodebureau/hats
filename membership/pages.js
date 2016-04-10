var mw = require('./middleware');

module.exports = [ {
	title: 'Membership',
	template: 'admin/pages/landing',
	pages: [
		{
			title: 'Roles',
			middleware: [ mw.roles.formatQuery, mw.roles.paginate, mw.roles.find ],
			template: 'admin/pages/membership/roles',
			pages: [ {
				title: 'Role',
				path: ':id',
				template: 'admin/pages/membership/role',
				middleware: mw.roles.findById,
				name: 'role',
				nav: false
			}]
		}, {
			title: 'Permissions',
			middleware: [ mw.permissions.formatQuery, mw.permissions.paginate, mw.permissions.find ],
			template: 'admin/pages/membership/permissions',
			pages: [ {
				title: 'Permission',
				path: ':id',
				template: 'admin/pages/membership/permission',
				name: 'permission',
				middleware: [ mw.roles.getAll, function(req, res, next) {
					res.locals.allRoles = res.locals.roles;
					delete res.locals.roles;
					next();
				}, mw.permissions.findById ],
				nav: false
			}]
		}, {
			title: 'Invites',
			middleware: [ mw.invites.formatQuery, mw.invites.paginate, mw.invites.find ],
			template: 'admin/pages/membership/invites',
			pages: [ {
				title: 'Invite',
				name: 'invite',
				path: ':id',
				template: 'admin/pages/membership/invite',
				middleware: [ mw.roles.getAll, function(req, res, next) {
					res.locals.allRoles = res.locals.roles;
					delete res.locals.roles;
					next();
				}, mw.invites.findById ],
				nav: false
			}]
		}, {
			title: 'Users'
		}
	]
} ];
