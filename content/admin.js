_.extend(require('ridge/util/validate/tests'), require('./browser/admin/tests'));
_.extend(require('ridge/util/validate/messages'), require('./browser/admin/messages'));

var ContentPage = require('./browser/admin/views/content-page');
var FieldPage = require('./browser/admin/views/field-page');

module.exports = {
  collections: {
    Fields: require('./browser/collections/fields.js')
  },

  models: {
    Field: require('./browser/models/field.js')
  },

  routes: require('./browser/admin/routes'),

  views: {
    ContentPage: ContentPage,
    FieldPage: FieldPage,
    Field: require('./browser/admin/views/field')
  }
};
