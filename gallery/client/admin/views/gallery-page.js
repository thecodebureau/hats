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
		Pagination: '.pagination',
		Search: '.search'
	},

	initialize: function(options) {
		this.modelViews = [];

		this.collection = new app.collections.GalleryImages();

		this.listenTo(this.collection, 'update', this.reset);

		this.listenTo(this.model, 'change:query', this.fetch);
	},

	attach: function() {
		this.collection.set({
			totalCount: this.model.get('totalCount'),
			galleryImages: this.model.get('galleryImages')
		}, { parse: true });

		this.model.unset('galleryImages');

		var state = window.history && window.history.state;

		if (_.has(state, 'scrollX'))
			window.scrollTo(state.scrollX, state.scrollY);
		else if (this.scroll)
			this.el.scrollIntoView();

		this.scroll = false;
	},

	fetch: function(model, query) {
		this.collection.fetch({ data: query });
	},

	reset: function (models, options) {
		_.invoke(this.modelViews, 'remove');

		models.each(this.renderModel, this);
	},

	renderModel: function(model) {
		this.modelViews.push(new app.views.GalleryImage({
			model: model,
			data: this.data,
		}).enter(this.elements.container));
	},
});
