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
			reload: true,
			routes: {
				':id': {
					view: 'EmployeePage',
					reload: true
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
