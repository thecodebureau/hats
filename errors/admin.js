var ErrorsPage = require('./browser/admin/views/errors-page.js');

module.exports = {
  collections: {
    Errors: require('./browser/admin/collections/errors.js')
  },

  routes: require('./browser/admin/routes'),

  views: {
    ErrorsPage: ErrorsPage,
    Error: require('./browser/admin/views/error.js')
  }
};


