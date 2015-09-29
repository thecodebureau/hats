var app = require('ridge');

module.exports = require('ridge/view').extend({
	subviews: {
		CrudCollection: {
			selector: '.collection',
			collection: 'NewsArticles',
			modelTemplate: 'admin/models/news-article'
		}
	}
});
