var Organization = require('./model');

module.exports =  {
	get: function(req, res, next) {
		if(!res.app.locals.organization) {
			Organization.findOne({}, function(err, organization) {
				res.data.organization = res.app.locals.organization = organization;

				next();
			});
		} else {
			res.data.organization = res.app.locals.organization;
			next();
		}
	},

	update: function(req, res, next) {
		Organization.findOne({}, function(err, organization) {
			_.difference(_.keys(organization.toObject()), _.keys(req.body)).forEach(function(key) {
				organization[key] = undefined;
			});

			_.extend(organization, _.omit(req.body, '_id', '__v'));

			return organization.save(function(err) {
				if(err) return next(err);

				if (organization) res.app.locals.organization = organization;

				return res.status(200).json(organization);
			});
		});
	}
};
