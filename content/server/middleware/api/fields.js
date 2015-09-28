var queryConstructor = require('query-constructor');

module.exports = function(config, mongoose) {
	var Field = mongoose.model('Field');

	function create(req, res, next) {
		Field.create(req.body, function (err, field) {
			if (err) return next(err);

			res.data.field = field;
			res.status(201);
			next();
		});
	}

	function findById(req, res, next) {
		if(req.params.id === 'new') return next();

		Field.findOne({ _id: req.params.id }).lean().exec(function (err, field) {
			if (err) return next(err);

			res.status(200);

			res.data.field = field;

			next();
		});
	}

	function findByPath(req, res, next) {
		Field.find({ path: req.path }).lean().exec(function (err, fields) {
			if (err) return next(err);

			res.status(200);

			res.data.fields = fields.reduce(function(out, value) {
				out[value.name] = value.content;

				return out;
			}, {});
			next();
		});
	}

	function update(req, res, next) {
		return Field.findById(req.params.id, function(err, field) {
			delete req.body._id;
			delete req.body.__v;

			_.extend(field, req.body);

			return field.save(function(err) {
				if(err) return next(err);
				res.status(200);

				res.data.field = field;
				next();
			});
		});
	}

	function remove(req, res, next) {
		Field.findByIdAndRemove(req.params.id, function (err, field) {
			if (err) return next(err);

			if (field) {
				res.status(204);
				res.data.field = field;
			}

			return next();
		});
	}

	return {
		create: create,
		findByPath: findByPath,
		findById: findById,
		queryConstructor: queryConstructor(Field),
		update: update,
		remove: remove
	};
};
