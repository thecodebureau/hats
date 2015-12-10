module.exports = function(config, mongoose, mw) {
	var ErrorModel = mongoose.model('Error');

	return {
		getAll: function(req, res, next) {
			ErrorModel.find({}).sort('-dateCreated').exec(function(err, errors) {
				if(err) return next(err);

				res.status(200);

				res.data.errors = errors;

				next();
			});
		},

		findById: function(req, res, next) {
			ErrorModel.findById(req.params.id, function(err, page) {
				if (err) return next(err);
				if (page) res.data.page = page;
				next();
			});
		},

		find: function(req, res, next) {
			var page = Math.max(0, req.query.page) || 0;
			var perPage = Math.max(0, req.query.limit) || res.locals.perPage;

			var query = ErrorModel.find(_.omit(req.query, 'limit', 'sort', 'page'),
				null,
				{ sort: req.query.sort || '-dateCreated', lean: true });

			if (perPage)
				query.limit(perPage).skip(perPage * page);

			query.exec(function(err, errors) {
				res.data.errors = errors;
				next(err);
			});
		},


		formatQuery: mw.formatQuery([ 'sort', 'limit', 'page', 'status' ]),

		paginate: mw.paginate(ErrorModel, 200),

		removeQuery: function(req, res, next) {
			ErrorModel.remove(_.omit(req.query, 'limit', 'sort', 'page'), function(err) {
				if(err) return next(err);

				res.status(204).data.ok = true;

				next();
			});
		},

		removeByQuery: function() {
		},

		remove: function(req, res, next) {
			ErrorModel.remove({ _id: req.params.id }, function(err) {
				if(err) return next(err);

				res.status(204).data.ok = true;

				next();
			});
		}
	};
};
