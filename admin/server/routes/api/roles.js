module.exports = function(mw, config) {
	var isAuthenticated = mw.authorization.isAuthenticated;

	mw = mw.api.roles;

	return [
		[ 'get', '/', [ isAuthenticated, mw.formatQuery, mw.paginate, mw.find ]],
		[ 'get', '/:id', [ isAuthenticated, mw.findById ]],
		[ 'post', '/', [ isAuthenticated, mw.create ]],
		//[ 'put', '/:id', mw.api.roles.update ],
		[ 'delete', '/:id', [ isAuthenticated, mw.remove ]]
	];
};
