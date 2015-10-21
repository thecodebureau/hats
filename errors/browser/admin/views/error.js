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

	delete: function(e) {
		this.model.destroy();
		this.remove();
	},

	initialize: function(options) {
		this.listenTo(this.model, 'destroy', this.remove);
	},

	template: 'admin/models/error',

	attach: function() {
		app.views.CrudModel.prototype.attach.apply(this, arguments);

		this.elements = {
			$info: this.$('.info')
		};
	},

	toggle: function() {
		if(this.elements.$info.children().length > 0)
			this.elements.$info.toggleClass('visible');
	}

});
