module.exports = function(mw, config) {
	var isAuthenticated = mw.authorization.isAuthenticated;

	mw = mw.api.employees;

	return [
		[ 'get', '/', [ mw.formatQuery, mw.paginate, mw.find ]],
		[ 'post', '/', [ isAuthenticated, mw.create ]],
		[ 'get', '/:id', [ isAuthenticated, mw.findById ]],
		[ 'put', '/:id', [ isAuthenticated, mw.put ]],
		[ 'patch', '/:id', [ isAuthenticated, mw.patch ]],
		[ 'delete', '/:id', [ isAuthenticated, mw.remove ]]
	];
};
