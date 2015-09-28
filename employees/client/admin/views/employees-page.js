var app = require('ridge');

module.exports = require('ridge/view').extend({
	subviews: {
		CrudCollection: {
			selector: '.collection',
			collection: 'Employees',
			modelTemplate: 'admin/models/employee'
		}
	}
});
