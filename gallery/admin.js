module.exports = {
	collections: {
		GalleryImages: require('./browser/collections/gallery-images')
	},

	views: {
		GalleryImagePage: require('./browser/admin/views/gallery-image-page'),
		GalleryPage: require('./browser/admin/views/gallery-page'),
		GalleryImage: require('./browser/admin/views/gallery-image'),
	}
};
