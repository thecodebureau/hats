module.exports = {
	collections: {
		GalleryImages: require('./client/collections/gallery-images')
	},

	views: {
		GalleryImagePage: require('./client/admin/views/gallery-image-page'),
		GalleryPage: require('./client/admin/views/gallery-page'),
		GalleryImage: require('./client/admin/views/gallery-image'),
	}
};
