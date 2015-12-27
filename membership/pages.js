var mw = require('./middleware');

module.exports = [ {
	title: 'Membership',
	template: 'admin/pages/landing',
	pages: [
		{
			title: 'Roles',
			view: 'RolesPage',
			middleware: [ mw.roles.formatQuery, mw.roles.paginate, mw.roles.find ],
			pages: [ {
				title: 'Role',
				path: ':id',
				template: 'admin/pages/membership/role',
				middleware: mw.roles.findById,
				name: 'role',
				view: 'RolePage',
				nav: false
			}]
		}, {
			title: 'Permissions',
			view: 'PermissionsPage',
			middleware: [ mw.permissions.formatQuery, mw.permissions.paginate, mw.permissions.find ],
			pages: [ {
				title: 'Permission',
				path: ':id',
				template: 'admin/pages/membership/permission',
				name: 'permission',
				view: 'PermissionPage',
				middleware: [ mw.roles.getAll, function(req, res, next) {
					res.locals.allRoles = res.locals.roles;
					delete res.locals.roles;
					next();
				}, mw.permissions.findById ],
				nav: false
			}]
		}, {
			title: 'Invites',
			view: 'InvitesPage',
			middleware: [ mw.invites.formatQuery, mw.invites.paginate, mw.invites.find ],
			pages: [ {
				title: 'Invite',
				name: 'invite',
				path: ':id',
				template: 'admin/pages/membership/invite',
				view: 'InvitePage',
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
