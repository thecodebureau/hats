var mongoose = require('mongoose');

var GalleryImageSchema = new mongoose.Schema(require('epiphany/schemas/imageObject'));

GalleryImageSchema.plugin(require('epiphany/plugins/base'));

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);
