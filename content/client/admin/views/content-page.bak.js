var app = require('ridge');

module.exports = require('ridge/view').extend({
	elements: {
		container: '.collection.container'
	},

	subviews: {
		Pagination: '.pagination',
		Search: '.search'
	},

	initialize: function(options) {
		this.modelViews = [];

		this.collection = new app.collections.Fields({
			totalCount: this.state.get('totalCount') || options.data.totalCount,
			fields: this.state.get('fields') || options.data.fields
		}, { parse: true });

		this.listenTo(this.collection, 'reset', this.reset);
		this.listenTo(this.state, 'change:query', this.fetch);

		this.collection.reset();
	},

	attach: function() {
		this.reset(this.collection);

		$('.container > .item').each(function(i) {
			new app.views.Field({ 
				el: this,
				model: this.models[i]
			});
		});
	},

	fetch: function(model, query) {
		this.collection.fetch({ reset: true, data: query });
	},

	reset: function (models, options) {
		_.invoke(this.modelViews, 'remove');

		this.modelViews = [];

		models.each(this.renderModel, this);
	},

	renderModel: function(model) {
		this.modelViews.push(new app.views.Field({
			model: model,
			data: this.data,
		}).enter(this.elements.container));
	},
});
