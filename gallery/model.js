var mongoose = require('mongoose');

var GalleryImageSchema = new mongoose.Schema(require('epiphany/schemas/image-object'));

GalleryImageSchema.plugin(require('epiphany/plugins/base'));

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);
