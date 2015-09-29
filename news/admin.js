var browser = require('./browser');

var admin = {
	views: {
		NewsPage: require('./client/admin/views/news-page'),
		NewsArticlePage: require('./client/admin/views/news-article-page'),
	}
};

_.each(admin, function(value, key) {
	if(browser[key]) _.extend(browser[key], value);
	else browser[key] = value;
});

module.exports = browser;
