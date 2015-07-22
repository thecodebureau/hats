module.exports = function(mw, config) {
	var isAuthenticated = mw.authorization.isAuthenticated;
	mw = mw.api.employees;

	return [
		[ 'get', '/', mw.findAll ],
		[ 'post', '/', [ isAuthenticated, mw.create ]],
		//[ 'get', '/:id', isAuthenticated, mw.findById ],
		[ 'put', '/:id', [ isAuthenticated, mw.update ]],
		[ 'patch', '/:id', [ isAuthenticated, mw.update ]],
		[ 'delete', '/:id', [ isAuthenticated, mw.delete ]]
	];
};
