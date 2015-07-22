module.exports = function(config, mongoose) {
	var Permission = mongoose.model('Permission');

	return {
		create: function (req, res, next) {
			Permission.create(req.body, function (err, permission) {
				if (err) return next(err);

				res.data.permission = permission;
				res.status(201);
				next();
			});
		},

		findAll: function (req, res, next) {
			Permission.find({}, function (err, permissions) {
				if (err) return next(err);

				res.status(200);
				res.data.permissions = permissions;
				next();
			});
		},

		findAllActive: function (req, res, next) {
			Permission.find({ active: true }, function (err, permissions) {
				if (err) return next(err);

				res.status(200);
				res.data.permissions = permissions;
				next();
			});
		},

		remove: function (req, res, next) {
			Permission.remove({ _id: req.params.id }, function (err, count) {
				if (err) return next(err);

				if (count > 0)
					res.status(200);
				else
					res.status(410);

				return next();
			});
		}
	};
};
