module.exports = {
	'news': {
		view: require('./views/news-page'),
		reload: true,
		routes: {
			':id': {
				view: require('./views/news-article-page'),
				reload: true
			}
		}
	}
};
