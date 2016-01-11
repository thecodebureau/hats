var mw = require('./middleware');

module.exports = [ {
	title: 'Employees',
	middleware: [ mw.formatQuery, mw.paginate, mw.find ],
	pages: [ {
		path: ':id',
		template: 'admin/pages/employee',
		middleware: [ mw.findById ],
		nav: false
	} ]
} ];
