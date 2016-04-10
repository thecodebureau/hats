var mw = require('./middleware');

module.exports = [ {
	title: 'News',
	middleware: [ mw.formatQuery, mw.paginate, mw.find ],
	template: 'admin/pages/news',
	pages: [{
		path: ':id',
		template: 'admin/pages/news-article',
		title: 'News Article',
		middleware: mw.findById,
		nav: false
	}]
} ];
