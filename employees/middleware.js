var mw = {
	formatQuery: require('epiphany/middleware/format-query'),
	paginate: require('epiphany/middleware/paginate')
};

var mongoose = require('mongoose');

var Employee = require('./model');

module.exports = {
	create: function(req, res, next) {
		Employee.create(req.body, function(err, employee) {
			if(err) return next(err);
			res.status(201).json(employee);
		});
	},

	find: function(req, res, next) {
		var page = Math.max(0, req.query.page) || 0;
		var perPage = Math.max(0, req.query.limit) || res.locals.perPage;

		var query = Employee.find(_.omit(req.query, 'limit', 'sort', 'page'),
			null,
			{ sort: req.query.sort || '-dateCreated', lean: true });

		if (perPage)
			query.limit(perPage).skip(perPage * page);

		query.exec(function(err, employees) {
			res.locals.employees = employees;
			next(err);
		});
	},

	findAll: function(req, res, next) {
		var query = {};

		if(!req.user) 
			query.datePublished = { $ne: null };

		Employee.find(query, function(err, employees) {
			if(err) return next(err);

			res.locals.employees = employees;
			next();
		});
	}, 

	findById: function(req, res, next) {
		if(req.params.id === 'new') return next();

		var query = {};

		query[mongoose.Types.ObjectId.isValid(req.params.id) ? '_id' : '_hid'] = req.params.id;

		Employee.findOne(query, function(err, employee) {
			if(err) return next(err);
			res.locals.employee = employee;
			next();
		});
	},

	formatQuery: mw.formatQuery([ 'page', 'limit', 'sort' ]),

	paginate: mw.paginate(Employee, 10),

	patch: function(req, res, next) {
		var query = {};

		query[mongoose.Types.ObjectId.isValid(req.params.id) ? '_id' : '_hid'] = req.params.id;

		Employee.findOne(query, function(err, employee) {
			delete req.body._id;
			delete req.body.__v;

			_.extend(employee, req.body);

			return employee.save(function(err) {
				if(err) return next(err);

				return res.status(200).json(employee);
			});
		});
	},
	
	put: function(req, res, next) {
		var query = {};

		query[mongoose.Types.ObjectId.isValid(req.params.id) ? '_id' : '_hid'] = req.params.id;

		Employee.findOne(query, function(err, employee) {
			_.difference(_.keys(employee.toObject()), _.keys(req.body)).forEach(function(key) {
				employee[key] = undefined;
			});

			_.extend(employee, _.omit(req.body, '_id', '__v'));

			return employee.save(function(err) {
				if(err) return next(err);

				return res.status(200).json(employee);
			});
		});
	},

	remove: function(req, res, next) {
		return Employee.findById(req.params.id, function(err, employee) {
			if(err) return next(err);
			return employee.remove(function(err) {
				if(err) return next(err);
				return res.sendStatus(200);
			});
		});
	}
};
