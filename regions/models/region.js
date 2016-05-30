'use strict';

var app = require('ridge');

var content = {
  required: false
};

var Model = require('ridge/model').extend({
  constructor: function () {
    if (_.isArray(app.languages) && app.languages.length > 1)
      app.languages.forEach(function (lang) {
        this.validation['content.' + lang] = content;
      }, this);
    else
      this.validation.content = content;

    console.log(this.validation);
    require('ridge/model').apply(this, arguments);
  }
});

_.extend(Model.prototype, require('ridge/mixins/validate'), {
  urlRoot: '/api/regions',

  validation: {
    'name': {
      required: true,
      alphanumeric: true
    },

    'path': {
      required: true
    },
  }
});

module.exports = Model;
