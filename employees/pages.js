var mw = require('./middleware');

module.exports = [ {
	title: 'Employees',
	middleware: [ mw.formatQuery, mw.paginate, mw.find ],
	template: 'admin/pages/employees',
	reload: true,
	pages: [ {
		path: ':id',
		template: 'admin/pages/employee',
		middleware: [ mw.findById ],
		reload: true,
		nav: false
	} ]
} ];
