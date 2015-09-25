var app = require('ridge');

module.exports = require('ridge/views/collection').extend({
	events: {
		'submit form.filter': 'filter',
	},

	extends: 'Collection',

	initialize: function() {
		this.collection = new app.collections.Users(null, { 
			defaultFilter: {
				_limit: 50,
				_sort: '-dateCreated'
			}
		});

		app.views.Collection.prototype.initialize.apply(this, arguments);
	},

	filter: function(e) {
		e.preventDefault();

		this.collection.setFilter($(e.currentTarget).JSONify());

		var _view = this;

		var type = e.currentTarget.value;

		_view.collection.fetch({ reset: true });
	}
});
