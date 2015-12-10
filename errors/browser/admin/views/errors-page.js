var app = require('ridge');

module.exports = require('ridge/view').extend({
	events: {
		'click .collection + .pagination li:not(.current) a.nav': function() {
			this.scroll = true;
		},
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
				_view.fetch(null, app.router.current().get('query'));
			}
		});
	},

	removeFiltered: function() {
		var _view = this;
		$.ajax({
			method: 'DELETE',
			url: '/api/errors?' + app.router.current().get('query'),
			success: function() {
				_view.fetch(null, app.router.current().get('query'));
			}
		});
	},

	removePage: function() {
		var _view = this;

		_.invoke(this.modelViews, 'delete');

		this.modelViews = [];

		this.fetch(null, app.router.current().get('query'));
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

		this.listenTo(app.router.current(), 'change:query', this.fetch);
	},

	fetch: function(model, query) {
		this.collection.fetch({ reset: true, data: query });
	},

	attach: function() {
		this.collection.reset({
			totalCount: this.model.get('totalCount'),
			errors: this.model.get('errors')
		}, { parse: true });

		this.model.unset('errors');

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
		this.modelViews.push(new app.views.Error({
			model: model,
			data: this.data,
		}).enter(this.elements.container));
	},
});
