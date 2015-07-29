
module.exports = function(config, mongoose) {
	var Organization = mongoose.model('Organization');

	return {
		get: function(req, res, next) {
			res.data.organization = res.app.locals.organization;
			next();
		},

		update: function(req, res, next) {
			Organization.findOne({}, function(err, organization) {
				delete req.body._id;
				delete req.body.__v;

				_.extend(organization, req.body);

				return organization.save(function(err) {
					if(err) return next(err);

					if (organization) res.app.locals.organization = organization;

					return res.status(200).json(organization);
				});
			});
		}
	};
};
