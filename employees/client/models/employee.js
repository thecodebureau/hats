module.exports = require('ridge/model').extend({
	defaults: {
		'@type': 'Person',
		address: {
			'@type': 'PostalAddress'
		}
	},

	name: 'employee',

	idAttribute: '_id'
});
