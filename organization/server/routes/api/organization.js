module.exports = function(mw, config) {
	var isAuthenticated = mw.authorization.isAuthenticated;
	mw = mw.api.organization;

	return [
		[ 'get', '/', mw.get ],
		[ 'put', '/', [ isAuthenticated, mw.update ]],
		[ 'patch', '/', [ isAuthenticated, mw.update ]]
	];
};
