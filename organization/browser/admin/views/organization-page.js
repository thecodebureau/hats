var OrganizationModel = require('../../models/organization');

var View = require('ridge/views/page').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
  events: {
    'submit form': 'preventDefault'
  },

  bindings: {
    'description': {
      '[data-name="description"]': 'html'
    }
  },

  subviews: {
    buttons: [ '.controls', require('./buttons') ],
    form: [ 'form', require('ridge/views/form-styling') ]
  },

  initialize: function(opts) {
    this.model = new OrganizationModel(this.state.get('organization') || {});

    // use properties from model validation to set up more bindings.
    // all model validation properties are assumed to be 'value' getter and setter
    this.bindings = _.defaults(this.bindings, _.mapValues(this.model.validation, function(value, key) {
      var binding = {};

      binding['[name="' + key + '"],[data-name="' + key + '"]'] = {
        both: 'value',
      };

      return binding;
    }));
  },

  attach: function() {
    this.observe({ validate: true });

    this.model.validate(null, { validateAll: true });
  }
});

module.exports = View;
