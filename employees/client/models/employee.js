var Model = require('ridge/model').extend();

_.extend(Model.prototype, require('ridge/mixins/validate'), {

	validation: {
		'givenName': {
			required: true
		},
		'familyName': {
			required: true
		},
		'email': {
			email: true,
			required: true
		},
		'telephone': {
			required: true
		},
		'jobTitle': {
			required: true
		},
	}
});

module.exports = Model;
