module.exports = function(mw, config) {
	var isAuthenticated = mw.authorization.isAuthenticated;

	mw = mw.api.permissions;

	return [
		[ 'get', '/', [ isAuthenticated, mw.formatQuery, mw.paginate, mw.find ]],
		[ 'get', '/:id', [ isAuthenticated, mw.findById ]],
		[ 'post', '/', [ isAuthenticated, mw.create ]],
		[ 'put', '/:id', [ isAuthenticated, mw.put ]],
		[ 'delete', '/:id', [ isAuthenticated, mw.remove ]],
	];
};
