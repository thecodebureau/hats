var mongoose = require('mongoose');

var GalleryImageSchema = new mongoose.Schema(require('warepot/schemas/image-object'));

GalleryImageSchema.plugin(require('warepot/plugins/base'));

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);
