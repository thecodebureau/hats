module.exports = require('ridge/model').extend({
	url: '/api/organization',

	validation: {
		'name': {
			required: true
		},
		'legalName': {
			required: true
		},
		'email': {
			email: true,
			required: true
		},
		'telephone': {
			required: true
		},
		'address.streetAddress': {
			required: true
		},
		'address.postalCode': {
			required: true
		},
		'address.addressLocality': {
			required: true
		},
		'address.addressCountry': {
			required: true
		}
	}
});
