module.exports = function(mw, config) {
	var isAdmin = mw.authorization.isAdmin;
	var isAuthenticated = mw.authorization.isAuthenticated;
	var isCurrent = mw.authorization.isCurrent;
	mw = mw.api.users;

	return [
		[ 'post', '/', mw.register ],
		// TODO implement 'current' and enable authorization to fetch and update other users.
		[ 'get', '/', [ isAuthenticated, mw.query ] ],
		[ 'get', '/:id', [ isCurrent, mw.findOne ] ],
		[ 'put', '/:id', [ isCurrent, mw.update ] ],
		[ 'patch', '/:id', [ isCurrent, mw.update ] ],
		[ 'delete', '/:id', [ isAuthenticated, mw.remove ]],

		[ 'post', '/reset-password', [ mw.resetPassword ] ],
		[ 'post', '/update-password', [ mw.updatePassword ] ]
	];

};
