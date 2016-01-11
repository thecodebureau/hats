module.exports = {
	'employees': {
		view: require('./views/employees-page'),
		reload: true,
		routes: {
			':id': {
				view: require('./views/employee-page'),
				reload: true
			}
		}
	}
};
