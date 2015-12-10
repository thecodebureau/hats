module.exports = function (mw) {
	var isAuthenticated = mw.authorization.isAuthenticated;

	mw = mw.api.invites;

	return [
		[ 'get', '/', [ isAuthenticated, mw.formatQuery, mw.paginate, mw.find ]],
		[ 'post', '/', [ isAuthenticated, mw.create ]],
		//[ 'put', '/:id', [ isAuthenticated, mw.update ],
		[ 'delete', '/:id', [ isAuthenticated, mw.remove ]]
	];
};
