function extractLang(fields, lang) {
	return _.mapValues(fields, function(value, key) {
		return value[lang];
	});
}

var Field = require('./model');

var mw = {
	formatQuery: require('epiphany/middleware/format-query'),
	paginate: require('epiphany/middleware/paginate')
};

var cache = {};

module.exports = {
	create: function(req, res, next) {
		Field.create(req.body, function (err, field) {
			if (err) return next(err);

			res.data.field = field;

			res.status(201);
			next();
		});
	},

	find: function(req, res, next) {
		var page = Math.max(0, req.query.page) || 0;
		var perPage = Math.max(0, req.query.limit) || res.locals.perPage;

		var query = Field.find(_.omit(req.query, 'limit', 'sort', 'page'),
			null,
			{ sort: req.query.sort || 'path', lean: true });

		if (perPage)
			query.limit(perPage).skip(perPage * page);

		query.exec(function(err, fields) {
			res.data.fields = fields;
			next(err);
		});
	},

	findById: function(req, res, next) {
		if(req.params.id === 'new') return next();

		Field.findOne({ _id: req.params.id }).lean().exec(function (err, field) {
			if (err) return next(err);

			res.status(200);

			res.data.field = field;

			next();
		});
	},

	findByPath: function(req, res, next) {
		var page = res.locals.page,
			path = page && page.path || req.path ;

		if(_.has(cache, path)) {
			res.data.fields = cache[path];

			if(res.lang)
				res.data.fields = extractLang(res.data.fields, res.lang);
				
			return next();
		}

		var paths = page ? _.compact(_.pluck(page.pages, 'path')) : [];

		paths.push(path);

		Field.find({ path: { $in: paths } }).lean().exec(function (err, fields) {
			if (err) return next(err);

			res.status(200);

			cache[path] = res.data.fields = fields.reduce(function(out, value) {
				out[value.name] = value.content;

				return out;
			}, {});

			if(res.lang)
				res.data.fields = extractLang(res.data.fields, res.lang);

			next();
		});
	},

	findByPage: function(nested) {
		function fnc(page, lang, nested, cb) {
			if(!page) 
				return cb();

			var path = page.path;

			if(_.has(cache, path)) {
				page.fields = cache[path];

				if(lang)
					page.fields = extractLang(page.fields, lang);
					
				if(nested && page.pages) {
					page.pages = page.pages.map(_.clone);
				
					cb = _.after(page.pages.length, cb);

					page.pages.forEach(function(_page) {
						fnc(_page, lang, nested, cb);
					});
				} else {
					cb();
				}
			} else {
				Field.find({ path: path }).lean().exec(function (err, fields) {
					cache[path] = page.fields = fields.reduce(function(result, value) {
						result[value.name] = value.content;

						return result;
					}, {});

					if(lang)
						page.fields = extractLang(page.fields, lang);

					if(nested && page.pages) {
						page.pages = page.pages.map(_.clone);
					
						cb = _.after(page.pages.length, cb);

						page.pages.forEach(function(_page) {
							fnc(_page, lang, nested, cb);
						});
					} else {
						cb();
					}
				});
			}
		}

		return Object.defineProperty(function(req, res, next) {
			res.locals.page = _.clone(res.locals.page);

			fnc(res.locals.page, res.lang, nested, next);
		}, 'name', { value: 'findByPage' });
	},

	formatQuery: mw.formatQuery([ 'page', 'sort', 'path', 'name' ], {
		'name': 'regex'
	}),

	paginate: mw.paginate(Field, 20),

	patch: function(req, res, next) {
		Field.findById(req.params.id, function(err, field) {
			delete req.body._id;
			delete req.body.__v;

			_.extend(field, req.body);

			if(cache[field.path])
				delete cache[field.path];

			return field.save(function(err) {
				if(err) return next(err);

				return res.status(200).json(field);
			});
		});
	},
	
	put: function(req, res, next) {
		Field.findById(req.params.id, function(err, field) {
			_.difference(_.keys(field.toObject()), _.keys(req.body)).forEach(function(key) {
				field[key] = undefined;
			});

			_.extend(field, _.omit(req.body, '_id', '__v'));

			if(cache[field.path])
				delete cache[field.path];

			return field.save(function(err) {
				if(err) return next(err);

				return res.status(200).json(field);
			});
		});
	},

	remove: function(req, res, next) {
		Field.findByIdAndRemove(req.params.id, function (err, field) {
			if (err) return next(err);

			if (field) {
				res.status(204);
				res.data.field = field;
			}

			return next();
		});
	}
};
