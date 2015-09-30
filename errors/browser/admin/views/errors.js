var app = require('ridge');

module.exports = require('ridge/view').extend({
	events: {
		'change select[data-command="filter"]': 'errorType',
		'click button[data-command="clear"]': 'clear'
	},

	initialize: function() {
		this.collection = new app.collections.Errors();

		this.listenTo(this.collection, 'reset', this.reset);
	},

	attach: function() {
		this.container = this.$('.container');
		this.collection.fetch({ reset: true });
	},

	clear: function(e) {
		var model;

		while ((model = this.collection.first())) {
			// silent model.destroy does NOT silence the 'destroy' event on
			// the model, but does silent all collection events (ie 'remove');
			model.destroy({ silent: true });
		}
		this.elements.$count.text(this.collection.length);
	},

	reset: function (models, options) {
		models.each(this.renderModel, this);
	},

	renderModel: function(model) {
		new app.views.Error({
			model: model
		}).enter(this.container);
	},

	errorType: function(e) {
		var _view = this;
		var type = e.currentTarget.value;

		_view.collection.fetch({silent: true}).done(function() {
			var filtered = _.filter(_view.collection.models, function(item) {
				return !type ? true : type === 'server' ? item.get('status') >= 500 : item.get('status') < 500;
			});

			// trigger reset again
			// but this time trigger the event so the collection view is rerendered
			_view.collection.reset(filtered);
		});

	}
});
