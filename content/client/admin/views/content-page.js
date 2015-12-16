var app = require('ridge');

module.exports = require('ridge/view').extend({
	events: {
		'click .collection + .pagination li:not(.current) a.nav': function() {
			this.scroll = true;
		}
	},

	elements: {
		container: '.collection.container'
	},

	subviews: {
		Pagination: {
			selector: '.pagination',
			template: 'admin/pagination'
		},
		Search: {
			selector: '.search',
			model: null
		}
	},

	initialize: function(options) {
		this.modelViews = [];

		this.collection = new app.collections.Fields();

		this.listenTo(this.collection, 'reset', this.reset);

		this.listenTo(this.model, 'change:query', this.fetch);
	},

	fetch: function(model, query) {
		this.collection.fetch({ reset: true, data: query });
	},

	attach: function() {
		this.collection.reset({
			totalCount: this.model.get('totalCount'),
			fields: this.model.get('fields')
		}, { parse: true });

		this.model.unset('fields');

		var state = window.history && window.history.state;

		if (_.has(state, 'scrollX'))
			window.scrollTo(state.scrollX, state.scrollY);
		else if (this.scroll)
			this.el.scrollIntoView();

		this.scroll = false;
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
