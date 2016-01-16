var Model = require('ridge/model').extend();

_.extend(Model.prototype, require('ridge/mixins/validate'), {
	urlRoot: '/kontakt',

	validation: {
		name: {
			required: 'Du måste ange ditt namn',
		},
		email: {
			email: 'Inte en giltig epostadress',
			required: 'Du måste ange en epostadress'
		},
		telephone: false,
		message: {
			required: 'Du måste ange ett meddelande'
		}
	}
});

module.exports = Model;
