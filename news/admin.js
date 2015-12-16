module.exports = {
	collections: {
		NewsArticles: require('./client/collections/news-articles')
	},

	models: {
		NewsArticle: require('./client/models/news-article')
	},

	views: {
		NewsPage: require('./client/admin/views/news-page'),
		NewsArticlePage: require('./client/admin/views/news-article-page'),
		NewsArticle: require('./client/admin/views/news-article')
	}
};
