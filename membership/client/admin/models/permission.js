var Model = require('ridge/model').extend();

_.extend(Model.prototype, require('ridge/mixins/validate'), {
	urlRoot: '/api/permissions',

	validation: {
		'regex': {
			required: true
		},
		roles: {
			required: true
		}
	}
});

module.exports = Model;
