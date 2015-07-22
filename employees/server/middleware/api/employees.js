var _ = require('lodash');

module.exports = function(config, mongoose) {
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
			return Employee.findById(req.params.id, function(err, employee) {
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

		update: function(req, res, next) {
			return Employee.findById(req.params.id, function(err, employee) {
				delete req.body._id;
				delete req.body.__v;

				_.extend(employee, req.body);

				return employee.save(function(err) {
					if(err) return next(err);
					return res.status(200).json(employee);
				});
			});
		},
		
		delete: function(req, res, next) {
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
