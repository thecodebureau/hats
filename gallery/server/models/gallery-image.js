var _ = require('lodash');

module.exports = function(mongoose, schemas, plugins) {
	var GalleryImageSchema = new mongoose.Schema(schemas.ImageObject.objectify());

	GalleryImageSchema.plugin(plugins.base);

	mongoose.model('GalleryImage', GalleryImageSchema);
};
