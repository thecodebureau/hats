var mongoose = require('mongoose');

var GalleryImageSchema = new mongoose.Schema(require('mongopot/schemas/image-object'));

GalleryImageSchema.plugin(require('mongopot/plugins/base'));

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);
