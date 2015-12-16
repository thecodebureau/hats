var app = require('ridge');

module.exports = require('ridge/view').extend({
	elements: {
		container: '.collection.container'
	},

	subviews: {
		Pagination: {
			selector: '.pagination',
			template: 'admin/pagination'
		},
		Search: '.search'
	},

	initialize: function(options) {
		this.modelViews = [];

		this.collection = new app.collections.Roles();

		this.listenTo(this.collection, 'reset', this.reset);

		this.listenTo(app.router.current(), 'change:query', this.fetch);
	},

	fetch: function(model, query) {
		this.collection.fetch({ reset: true, data: query });
	},

	attach: function() {
		console.log(this.model.get('roles'));
		this.collection.reset({
			totalCount: this.model.get('totalCount'),
			roles: this.model.get('roles')
		}, { parse: true });
	},

	reset: function (models, options) {
		_.invoke(this.modelViews, 'remove');

		this.modelViews = [];

		models.each(this.renderModel, this);
	},

	renderModel: function(model) {
		this.modelViews.push(new app.views.Role({
			model: model,
			data: this.data,
		}).enter(this.elements.container));
	},
});
