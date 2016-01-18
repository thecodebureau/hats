module.exports = {
	collections: {
		NewsArticles: require('./browser/collections/news-articles')
	},

	models: {
		NewsArticle: require('./browser/models/news-article')
	},

	routes: require('./browser/admin/routes'),

	views: {
		NewsPage: require('./browser/admin/views/news-page'),
		NewsArticlePage: require('./browser/admin/views/news-article-page'),
		NewsArticle: require('./browser/admin/views/news-article')
	}
};
