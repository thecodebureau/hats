'use strict';

var RegionModel = require('../../models/region');

var View = require('ridge/views/page').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
  events: {
    'submit form': 'preventDefault'
  },

  subviews: {
    buttons: [ '.controls', require('./region-page-buttons') ],
    spytextFields: [ '[data-spytext]', require('spytext/field'), { multi: true } ],
    form: [ 'form', require('ridge/views/form-styling') ]
  },

  initialize: function (opts) {
    if (this.state.get('languages'))
      this.data.getContent = function (chunk, context, bodies, params) {
        return chunk.write(context.get('content.' + context.get('iso')));
      };

    this.model = new RegionModel(this.state.get('region') || {});

    // use properties from model validation to set up more bindings.
    // all model validation properties are assumed to be 'value' getter and setter
    this.bindings = _.mapValues(this.model.validation, function(value, key) {
      var binding = {};

      binding['[name="' + key + '"],[data-name="' + key + '"]'] = {
        both: /^content/.test(key) ? 'html' : 'value',
      };

      return binding;
    });
  },

  attach: function () {
    this.observe({ validate: true });

    if (!this.model.isNew())
      this.model.validate();
  }
});

module.exports = View;
