
module.exports = function(mongoose, schemas, plugins) {
	var GalleryImageSchema = new mongoose.Schema(schemas.imageObject);

	GalleryImageSchema.plugin(plugins.base);

	mongoose.model('GalleryImage', GalleryImageSchema);
};
