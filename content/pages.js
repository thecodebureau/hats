var mw = require('./middleware');

module.exports = [ {
	title: 'Content',
	view: 'ContentPage',
	middleware: [ mw.formatQuery, mw.paginate, mw.find, mw.paths ],
	pages: [ {
		path: ':id',
		view: 'FieldPage',
		template: 'admin/pages/field',
		middleware: [ mw.findById, mw.paths ],
		nav: false
	} ]
} ];
