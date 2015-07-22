module.exports = function(config, mongoose) {
	var Role = mongoose.model('Role');

	return {
		create: function (req, res, next) {
			Role.create(req.body, function (err, role) {
				if (err) return next(err);

				res.data.role = role;
				res.status(201);
				next();
			});
		},

		findAll: function (req, res, next) {
			Role.find({}, function (err, roles) {
				if (err) return next(err);

				res.status(200);
				res.data.roles = roles;
				next();
			});
		},

		remove: function (req, res, next) {
			Role.remove({ _id: req.params.id }, function (err, count) {
				if (err) return next(err);

				if (count > 0) 
					res.status(204);
				else 
					res.status(410);

				return next();
			});
		}
	};
};
