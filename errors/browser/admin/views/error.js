var app = require('ridge');

module.exports = require('ridge/views/model').extend({
	events: {
		'click': 'toggle'
	},

	template: 'admin/models/error',

	attach: function() {
		app.views.Model.prototype.attach.apply(this, arguments);

		this.$el.addClass(this.model.get('status') < 500 ? 'client' : 'server');

		if(!this.elements) this.elements = {};

		this.elements.$info = this.$('.info');
	},

	toggle: function() {
		if(this.elements.$info.children().length > 0)
			this.elements.$info.toggleClass('visible');
	}

});
