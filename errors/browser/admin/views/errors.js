module.exports = {
	events: {
		'change select[data-command="filter"]': 'errorType',
		'click button[data-command="clear"]': 'clear'
	},

	extends: 'Collection',

	initialize: function() {
		this.collection = new this.app.collections.Errors();

		this.app.views.Collection.prototype.initialize.apply(this, arguments);
	},

	attach: function() {
		this.app.views.Collection.prototype.attach.apply(this, arguments);

		this.elements.$count = this.$('.count > .value');
	},

	clear: function(e) {
		var model;

		while (model = this.collection.first()) {
			// silent model.destroy does NOT silence the 'destroy' event on
			// the model, but does silent all collection events (ie 'remove');
			model.destroy({ silent: true });
		}
		this.elements.$count.text(this.collection.length);
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
};
