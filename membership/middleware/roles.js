var Role = require('mongoose').model('Role');

var mw = {
	formatQuery: require('epiphany/middleware/format-query'),
	paginate: require('epiphany/middleware/paginate')
};

module.exports = {
	create: function (req, res, next) {
		Role.create(req.body, function (err, role) {
			if (err) return next(err);

			res.status(201);
			res.locals.role = role;
			next();
		});
	},

	find: function(req, res, next) {
		var page = Math.max(0, req.query.page) || 0;
		var perPage = Math.max(0, req.query.limit) || res.locals.perPage;

		var query = Role.find(_.omit(req.query, 'limit', 'sort', 'page'),
			null,
			{ sort: req.query.sort || 'name', lean: true });

		if (perPage)
			query.limit(perPage).skip(perPage * page);

		query.exec(function(err, roles) {
			res.locals.roles = roles;
			next(err);
		});
	},

	findById: function (req, res, next) {
		if(req.params.id === 'new') return next();

		Role.findById(req.params.id, function (err, role) {
			if (err) return next(err);

			res.status(200);
			res.locals.role = role;
			next();
		});
	},

	formatQuery: mw.formatQuery([ 'limit', 'sort', 'page' ]),

	getAll: function (req, res, next) {
		Role.find({}, function (err, roles) {
			if (err) return next(err);

			res.status(200);
			res.locals.roles = roles;
			next();
		});
	},

	paginate: mw.paginate(Role, 20),

	remove: function (req, res, next) {
		Role.remove({ _id: req.params.id }, function (err, query) {
			if (err) return next(err);

			res.locals.ok = true;

			return next();
		});
	}
};
