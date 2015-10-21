var app = require('ridge');

module.exports = require('ridge/view').extend({
	elements: {
		container: '.collection.container'
	},

	initialize: function(options) {
		this.modelViews = [];

		this.collection = new app.collections.GalleryImages();

		this.listenTo(this.collection, 'update', this.reset);
	},

	attach: function() {
		this.collection.fetch();
	},

	reset: function (models, options) {
		_.invoke(this.modelViews, 'remove');

		models.each(this.renderModel, this);
	},

	// override default render function so no errors are cause by lack
	// of template but we still attach

	renderModel: function(model) {
		this.modelViews.push(new app.views.GalleryImage({
			model: model,
			data: this.data,
		}).enter(this.elements.container));
	},
});