var app = require('ridge');

module.exports = require('ridge/view').extend({
	events: {
		'click': 'toggle',
		'click button': function(e) {
			e.preventDefault();
			e.stopPropagation();
		},
		'click button[data-command="publish"]': 'publish',
		'click button[data-command="unpublish"]': 'unpublish',
		'click button[data-command="delete"]': 'delete'
	},

	elements: {
		info: '.info'
	},

	delete: function(e) {
		this.model.destroy();
		this.remove();
	},

	initialize: function(options) {
		this.listenTo(this.model, 'destroy', this.remove);
	},

	template: 'admin/models/error',

	toggle: function() {
		if(this.elements.info.children().length > 0)
			this.elements.info.toggleClass('visible');
	}

});
