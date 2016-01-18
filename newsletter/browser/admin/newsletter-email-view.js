var app = require('ridge');

module.exports = require('ridge/view').extend({
	template: 'admin/models/newsletter-email-row',

	events: {
		'change input': 'toggle',
		'click button[data-command="unpublish"]': 'unpublish',
		'click button[data-command="delete"]': 'delete'
	},

	toggle: function(e) {
		this.model.save({ active: e.currentTarget.checked }, { patch: true, wait: true });
	},

	initialize: function(options) {
		this.listenTo(this.model, 'sync', this.render);

		this.listenTo(this.model, 'destroy', this.remove);
	}
});
