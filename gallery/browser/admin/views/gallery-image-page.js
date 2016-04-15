var GalleryImageModel = require('../../models/gallery-image');

var View = require('ridge/views/page').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
  events: {
    'submit form': 'preventDefault'
  },

  subviews: {
    buttons: [ '.controls', require('./buttons') ],
    imageUpload: [ '.image-upload', require('hats/image-upload/browser/image-upload-view'), {
      imageOptions: {
        type: "gallery",
        maxWidth: "1024",
        mediumWidth: "600",
        thumbWidth: "300",
        ratio: "1.333" 
      }
    } ],
    spytextFields: [ '[data-spytext]', require('spytext/field'), { multi: true } ],
  },

  initialize: function(opts) {
    this.model = new GalleryImageModel(this.state.get('galleryImage') || {});
  }
});

module.exports = View;
