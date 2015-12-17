var mw = require('./middleware');

module.exports = [ {
	title: 'Employees',
	view: 'EmployeesPage',
	middleware: [ mw.formatQuery, mw.paginate, mw.find ],
	pages: [ {
		path: ':id',
		template: 'admin/pages/employee',
		view: 'EmployeePage',
		middleware: mw.findById,
		nav: false
	} ]
} ];