var Model = require('ridge/model').extend();

_.extend(Model.prototype, require('ridge/mixins/validate'), {
  urlRoot: '/api/newsletter-emails',

  validation: {
    email_address: {
      email: 'Inte en giltig epostadress',
      required: 'Du måste ange en epostadress'
    }
  }
});

module.exports = Model;
