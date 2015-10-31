var path = require('path');

module.exports = _.extend({
	setup: function(epiphany) {
		epiphany.mongoose.model('Organization').findOne({}).lean().exec(function(err, organization) {
			if(err) throw err;
			if (organization) epiphany.server.locals.organization = organization;
		});
	}
}, require('./paths'));
