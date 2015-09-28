var app = require('ridge');

module.exports = require('ridge/view').extend({
	subviews: {
		CrudCollection: {
			selector: '.collection',
			collection: 'Fields',
			modelTemplate: 'admin/models/field'
		}
	}
});
