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

		findById: function (req, res, next) {
			Role.findById(req.params.id, function (err, role) {
				if (err) return next(err);

				res.status(200);
				res.data.role = role;
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
			Role.remove({ _id: req.params.id }, function (err, query) {
				console.log(query instanceof mongoose.Query);
				if (err) return next(err);

				if (conn.result.ok > 0) {
					res.data.result = conn.result;
				}

				return next();
			});
		}
	};
};
