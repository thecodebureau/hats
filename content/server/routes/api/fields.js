module.exports = function(mw, config) {
	var isAuthenticated = mw.authorization.isAuthenticated;
	mw = mw.api.fields;

	return [
		[ 'get', '/', [ isAuthenticated, mw.queryConstructor() ]],
		[ 'post', '/', [ isAuthenticated, mw.create ]],
		[ 'get', '/:id', [ isAuthenticated, mw.findById ]],
		[ 'put', '/:id', [ isAuthenticated, mw.update ]],
		[ 'patch', '/:id', [ isAuthenticated, mw.update ]],
		[ 'delete', '/:id', [ isAuthenticated, mw.remove ]],
	];
};
