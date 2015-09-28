var browser = require('./browser');

var admin = {
	views: {
		EmployeePage: require('./client/admin/views/employee-page'),
		EmployeesPage: require('./client/admin/views/employees-page'),
	}
};

_.each(admin, function(value, key) {
	if(browser[key]) _.extend(browser[key], value);
	else browser[key] = value;
});

module.exports = browser;
