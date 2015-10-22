
module.exports = function(mw, config) {
	var isAuthenticated = mw.authorization.isAuthenticated;

	var formatQuery = mw.formatQuery;

	mw = mw.api.newsArticles;

	return [
		[ 'get', '/', [ formatQuery, mw.paginate, mw.find ]],
		[ 'post', '/', [ isAuthenticated, mw.create ]],
		[ 'get', '/:id', mw.findById ],
		[ 'put', '/:id', [ isAuthenticated, mw.put ]],
		[ 'patch', '/:id', [ isAuthenticated, mw.patch ]],
		[ 'delete', '/:id', [ isAuthenticated, mw.remove ]]
	];
};
