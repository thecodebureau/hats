var mw = require('./middleware');

module.exports = [ {
	title: 'News',
	view: 'NewsPage',
	middleware: [ mw.formatQuery, mw.paginate, mw.find ],
	pages: [{
		path: ':id',
		template: 'admin/pages/news-article',
		title: 'News Article',
		middleware: mw.findById,
		view: 'NewsArticlePage',
		nav: false
	}]
} ];
