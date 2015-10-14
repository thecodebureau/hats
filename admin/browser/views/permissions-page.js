var app = require('ridge');

module.exports = require('ridge/view').extend({
	subviews: {
		CrudCollection: {
			selector: '.collection',
			collection: 'Permissions',
			modelTemplate: 'admin/models/permission'
		}
	}
});
