var app = require('ridge');

module.exports = require('ridge/view').extend({
	elements: {
		container: '.collection.container'
	},

	initialize: function(options) {
		this.modelViews = [];

		this.collection = new app.collections.Employees();

		this.listenTo(this.collection, 'reset', this.reset);
	},

	attach: function() {
		this.collection.fetch({ reset: true });
	},

	reset: function (models, options) {
		_.invoke(this.modelViews, 'remove');

		this.modelViews = [];

		models.each(this.renderModel, this);
	},

	// override default render function so no errors are cause by lack
	// of template but we still attach

	renderModel: function(model) {
		this.modelViews.push(new app.views.Employee({
			model: model,
			data: this.data,
		}).enter(this.elements.container));
	},
});
