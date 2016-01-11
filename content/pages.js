var mw = require('./middleware');

module.exports = [ {
	title: 'Content',
	middleware: [ mw.formatQuery, mw.paginate, mw.find, mw.paths ],
	pages: [ {
		path: ':id',
		template: 'admin/pages/field',
		middleware: [ mw.findById, mw.lang, mw.paths ],
		nav: false
	} ]
} ];
