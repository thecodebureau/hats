var GalleryImageView = require('./gallery-image');
var GalleryImagesCollection = require('../../collections/gallery-images');

module.exports = require('ridge/views/page').extend({
	elements: {
		container: '.collection.container'
	},

	subviews: {
		paginations: [ '.pagination', require('ridge/views/pagination'), { template: 'admin/pagination', multi: true } ],
		search: [ '.search', require('ridge/views/search') ]
	},

	initialize: function(options) {
		this.collection = new GalleryImagesCollection();

		this.listenTo(this.collection, 'reset', this.reset);

		this.listenTo(this.state, 'change:query', this.fetch);
	},

	attach: function() {
		this.collection.reset({
			totalCount: this.state.get('totalCount'),
			galleryImages: this.state.get('galleryImages')
		}, { parse: true });
	},

	fetch: function(model, query) {
		this.collection.fetch({ data: query });
	},

	reset: function (models, options) {
		_.invokeMap(this.modelViews, 'remove');

		this.modelViews = [];

		models.each(this.renderModel.bind(this));
	},

	renderModel: function(model) {
		this.modelViews.push(new GalleryImageView({
			model: model,
			data: this.data,
		}).enter(this.elements.container));
	},
});
