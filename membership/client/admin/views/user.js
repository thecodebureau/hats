var app = require('ridge');

module.exports = require('ridge/view').extend({
	events: {
		'click': 'toggle'
	},

	template: 'admin/models/user',

	attach: function() {
		app.views.Model.prototype.attach.apply(this, arguments);

		this.elements.$info = this.$('.info');
	},

	toggle: function() {
		if(this.elements.$info.children().length > 0)
			this.elements.$info.toggleClass('visible');
	}

});
