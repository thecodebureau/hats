var app = require('ridge');

module.exports = require('ridge/view').extend({
	subviews: {
		//CrudForm: '.form',
		CrudCollection: {
			el: '.collection',
			collection: 'Fields',
			modelTemplate: 'admin/models/field'
		}
	},

	initialize: function() { 
		console.log('hello good sir');
	}
});
