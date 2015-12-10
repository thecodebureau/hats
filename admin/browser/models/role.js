var Model = require('ridge/model').extend();

_.extend(Model.prototype, require('ridge/mixins/validate'), {
	urlRoot: '/api/roles',

	validation: {
		'name': {
			required: true
		}
	}
});

module.exports = Model;
