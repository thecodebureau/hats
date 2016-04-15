var Model = require('ridge/model').extend();

_.extend(Model.prototype, require('ridge/mixins/validate'), {
  urlRoot: '/api/news-articles',

  validation: {
    'headline': {
      required: true
    },
    articleBody: {
      required: true
    }
  }
});

module.exports = Model;
