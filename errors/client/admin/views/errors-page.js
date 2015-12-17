var app = require('ridge');

module.exports = require('ridge/views/page').extend({
	events: {
		'click button[data-command="removeAll"]': 'removeAll',
		'click button[data-command="removeFiltered"]': 'removeFiltered',
		'click button[data-command="removePage"]': 'removePage'
	},

	removeAll: function() {
		var _view = this;
		$.ajax({
			method: 'DELETE',
			url: '/api/errors',
			success: function() {
				_view.fetch(null, this.state.get('query'));
			}
		});
	},

	removeFiltered: function() {
		var _view = this;
		$.ajax({
			method: 'DELETE',
			url: '/api/errors?' + this.state.get('query'),
			success: function() {
				_view.fetch(null, this.state.get('query'));
			}
		});
	},

	removePage: function() {
		var _view = this;

		_.invoke(this.modelViews, 'delete');

		this.modelViews = [];

		this.fetch(null, this.state.get('query'));
	},


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

		this.collection = new app.collections.Errors();

		this.listenTo(this.collection, 'reset', this.reset);

		this.listenTo(this.state, 'change:query', this.fetch);
	},

	fetch: function(state, query) {
		this.collection.fetch({ reset: true, data: query });
	},

	attach: function() {
		this.collection.reset({
			totalCount: this.state.get('totalCount'),
			errors: this.state.get('errors')
		}, { parse: true });
	},

	reset: function (models, options) {
		_.invoke(this.modelViews, 'remove');

		this.modelViews = [];

		models.each(this.renderModel, this);
	},

	renderModel: function(model) {
		this.modelViews.push(new app.views.Error({
			model: model,
			data: this.data,
		}).enter(this.elements.container));
	},
});
