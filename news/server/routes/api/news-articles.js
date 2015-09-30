module.exports = function(mw, config) {
	var isAuthenticated = mw.authorization.isAuthenticated;
	mw = mw.api.newsArticles;

	return [
		[ 'get', '/', mw.findAll ],
		[ 'post', '/', [ isAuthenticated, mw.create ]],
		[ 'get', '/:id', mw.findById ],
		[ 'put', '/:id', [ isAuthenticated, mw.put ]],
		[ 'patch', '/:id', [ isAuthenticated, mw.patch ]],
		[ 'delete', '/:id', [ isAuthenticated, mw.remove ]]
	];
};
