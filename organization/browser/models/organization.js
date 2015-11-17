var Model = require('ridge/model').extend();

_.extend(Model.prototype, require('ridge/mixins/validate'), {
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
		'address.addressRegion': false,
		'address.addressCountry': {
			required: true
		}
	}
});

module.exports = Model;
