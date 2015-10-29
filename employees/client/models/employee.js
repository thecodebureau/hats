module.exports = require('ridge/model').extend({
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
