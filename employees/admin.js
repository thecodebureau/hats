module.exports = {
	collections: {
		Employees: require('./client/collections/employees'),
	},

	models: {
		Employee: require('./client/models/employee'),
	},

	routes: {
		'employees': {
			view: 'EmployeesPage',
			routes: {
				':id': {
					view: 'EmployeePage',
				}
			}
		}
	},

	views: {
		EmployeePage: require('./client/admin/views/employee-page'),
		EmployeesPage: require('./client/admin/views/employees-page'),
		Employee: require('./client/admin/views/employee'),
	}
};
