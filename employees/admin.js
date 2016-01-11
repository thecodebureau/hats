var EmployeePage = require('./client/admin/views/employee-page');
var EmployeesPage = require('./client/admin/views/employees-page');

module.exports = {
	collections: {
		Employees: require('./client/collections/employees'),
	},

	models: {
		Employee: require('./client/models/employee'),
	},

	routes: require('./client/admin/routes'),

	views: {
		EmployeePage: EmployeePage,
		EmployeesPage: EmployeesPage,
		Employee: require('./client/admin/views/employee'),
	}
};
