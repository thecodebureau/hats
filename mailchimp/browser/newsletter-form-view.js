var NewsletterEmailModel = require('./newsletter-email-model');
var FormView = require('ridge/views/form-styling');
var MessageView = require('ridge/views/message');

var View = require('ridge/view').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
  events: {
    'submit form': 'save'
  },

  elements: {
    form: 'form',
    button: 'button'
  },

  subviews: {
    form: [ 'form', FormView ]
  },

  initialize: function(opts) {
    this.model = opts && opts.model || new NewsletterEmailModel();

    this.bindings = _.mapValues(this.model.validation, function(value, key) {
      var binding = {};

      binding['[name="' + key + '"],[data-name="' + key + '"]'] = {
        both: 'value',
      };

      return binding;
    });
  },

  error: function(model, xhr, options) {
    _.result(this.message, 'remove');

    var resp = xhr.responseJSON;

    this.message = new MessageView({
      message: { 
        type: 'error',
        heading: resp.statusText || 'Oops!',
        body: resp.message || 'A problem has occured'
      }
    }).enter(this.elements.form, { method: 'prepend' });
  },

  save: function(e) {
    e.preventDefault();

    if(this.model.isValid()) {
      $(document.body).addClass('progress');

      this.elements.button.prop('disabled', true);

      this.model.set('status', 'subscribed');

      this.model.save(null, {
        error: this.error,
        success: this.success,
        complete: this.complete,
        context: this,
        validate: false
      });
    }
  },

  complete: function() {
    this.elements.button.prop('disabled', false);

    $(document.body).removeClass('progress');
  },

  success: function(model, resp, options) {
    this.form.remove();

    _.result(this.message, 'remove');

    this.message = new MessageView({
      message: {
        type: 'success',
        heading: 'Success!',
        body: 'Your email has been added'
      }
    }).enter(this.el);
  },

  attach: function() {
    this.observe({ validate: true });
  },
});

module.exports = View;
