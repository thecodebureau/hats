var Model = require('ridge/model').extend();

_.extend(Model.prototype, require('ridge/mixins/validate'), {
  urlRoot: '/api/gallery-images',

  validation: {
    'caption': false,
  }
});

module.exports = Model;
