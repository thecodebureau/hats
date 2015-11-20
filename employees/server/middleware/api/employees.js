
module.exports = function(config, mongoose, mw) {
	var Employee = mongoose.model('Employee');

	return {
		findAll: function(req, res, next) {
			var query = {};

			if(!req.user) 
				query.datePublished = { $ne: null };

			Employee.find(query, function(err, employees) {
				if(err) return next(err);

				res.data.employees = employees;
				next();
			});
		}, 

		findById: function(req, res, next) {
			if(req.params.id === 'new') return next();

			var query = {};

			query[mongoose.Types.ObjectId.isValid(req.params.id) ? '_id' : '_hid'] = req.params.id;

			return Employee.findOne(query, function(err, employee) {
				if(err) return next(err);
				res.data.employee = employee;
				next();
			});
		},

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
				res.data.employees = employees;
				next(err);
			});
		},

		paginate: mw.paginate(Employee, 20),

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
		},
	};
};
