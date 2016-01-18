var Model = require('ridge/model').extend();

_.extend(Model.prototype, require('ridge/mixins/validate'), {
	urlRoot: '/api/employees',

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
		'address.streetAddress': false,
		'address.postalCode': false,
		'address.addressLocality': false,
		'address.addressRegion': false,
		'address.addressCountry': false,
		'description': false
	}
});

module.exports = Model;
