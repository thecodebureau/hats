var app = require('ridge');

module.exports = require('ridge/view').extend({
	initialize: function() {
	},

	attach: function() {
		var _view = this;
		this.model = new app.models.Organization();
		this.model.fetch({
			success: function() {
				new app.views.Form({ model: _view.model, el: _view.$('.form') });
			}
		});
	}
});
