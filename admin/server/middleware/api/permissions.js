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

		findById: function (req, res, next) {
			Permission.findById(req.params.id, function (err, permission) {
				if (err) return next(err);

				res.status(200).data.permission = permission;
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

		put: function(req, res, next) {
			var query = {};

			Permission.findById(req.params.id, function(err, permission) {
				_.difference(_.keys(permission.toObject()), _.keys(req.body)).forEach(function(key) {
					permission[key] = undefined;
				});

				_.extend(permission, _.omit(req.body, '_id', '__v'));

				return permission.save(function(err) {
					if(err) return next(err);

					return res.status(200).json(permission);
				});
			});
		},
		

		remove: function (req, res, next) {
			Permission.remove({ _id: req.params.id }, function (err, count) {
				if (err) return next(err);

				if (count > 0) {
					res.data.ok = true;
					res.status(204);
				} else
					res.status(404);

				return next();
			});
		}
	};
};
