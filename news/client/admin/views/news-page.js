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
		Search: '.search'
	},

	initialize: function(options) {
		this.modelViews = [];

		this.collection = new app.collections.NewsArticles();

		this.listenTo(this.collection, 'reset', this.reset);

		console.log('about to listen');
		this.listenTo(app.router.current(), 'change:query', this.fetch);
	},

	fetch: function(model, query) {
		console.log('fetching');
		console.log(query);
		console.log(this.collection);
		this.collection.fetch({ reset: true, data: query });
	},

	attach: function() {
		this.collection.reset({
			totalCount: this.model.get('totalCount'),
			newsArticles: this.model.get('newsArticles')
		}, { parse: true });

		this.model.unset('newsArticles');

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
		this.modelViews.push(new app.views.NewsArticle({
			model: model,
			data: this.data,
		}).enter(this.elements.container));
	},
});
