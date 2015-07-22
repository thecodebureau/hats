module.exports = {
	initialize: function() {
	},

	attach: function() {
		var _view = this;
		this.model = new this.app.models.Organization();
		this.model.fetch({
			success: function() {
				new _view.app.views.Form({ model: _view.model, el: _view.$('.form') });
			}
		});
	}
};
