var Model = require('ridge/model').extend();

_.extend(Model.prototype, require('ridge/mixins/validate'), {
	validation: {
		'headline': {
			required: true
		}
	}
});

module.exports = Model;
