var path = require('path');

module.exports = {
  models: {
    GalleryImage: require('./model')
  },

  middleware: {
    galleryImages: require('./middleware')
  },

  pages: require('./pages'),

  routes: require('./routes')
};
