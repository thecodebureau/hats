module.exports = function(config, mongoose, mw) {
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

		find: function(req, res, next) {
			var page = Math.max(0, req.query.page) || 0;
			var perPage = Math.max(0, req.query.limit) || res.locals.perPage;

			var query = Permission.find(_.omit(req.query, 'limit', 'sort', 'page'),
				null,
				{ sort: req.query.sort || '-dateCreated', lean: true });

			if (perPage)
				query.limit(perPage).skip(perPage * page);

			query.exec(function(err, permissions) {
				res.data.permissions = permissions;
				next(err);
			});
		},

		findById: function (req, res, next) {
			if(req.params.id === 'new') return next();

			Permission.findById(req.params.id, function (err, permission) {
				if (err) return next(err);

				res.status(200).data.permission = permission;
				next();
			});
		},

		formatQuery: mw.formatQuery([ 'limit', 'sort', 'page' ]),

		getAll: function (req, res, next) {
			Permission.find({}, function (err, permissions) {
				if (err) return next(err);

				res.status(200).data.permissions = permissions;
				next();
			});
		},

		getActive: function (req, res, next) {
			Permission.find({ active: true }, function (err, permissions) {
				if (err) return next(err);

				res.status(200).data.permissions = permissions;
				next();
			});
		},

		paginate: mw.paginate(Permission, 20),

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

				res.data.ok = true;

				return next();
			});
		}
	};
};
