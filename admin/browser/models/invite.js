var Model = require('ridge/model').extend();

_.extend(Model.prototype, require('ridge/mixins/validate'), {
	urlRoot: '/api/invites',

	validation: {
		email: { 
			email: true,
			required: true
		},
		roles: {
			required: true
		}
	}
});

module.exports = Model;
