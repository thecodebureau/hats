var queryConstructor = require('query-constructor');

module.exports = function(config, mongoose) {
	var NewsArticle = mongoose.model('NewsArticle');

	return {
		getLatest: function(howMany) {
			howMany = howMany || 5;
			return function(req, res, next) {
				// TODO only return needed shit.
				var query = {};
				if(!req.user) {
					query.datePublished = { $exists: true };
				}

				NewsArticle.find(query).sort('-dateCreated').limit(howMany).lean().exec(function(err, newsArticles) {
					if(err) return next(err);

					res.data.newsArticles = newsArticles;
					next();
				});

			};
		},

		findAll: function(req, res, next) {
			var query = {};

			if(!req.user) 
				query.datePublished = { $ne: null };

			NewsArticle.find(query).sort('-dateCreated').exec(function(err, newsArticles) {
				if(err) return next(err);

				res.data.newsArticles = newsArticles;
				next();
			});
		}, 

		findById: function(req, res, next) {
			var query = {};

			query[mongoose.Types.ObjectId.isValid(req.params.id) ? '_id' : '_hid'] = req.params.id;

			return NewsArticle.findOne(query, function(err, newsArticle) {
				if(err) return next(err);
				res.data.newsArticle = newsArticle;
				next();
			});
		},

		create: function(req, res, next) {
			NewsArticle.create(req.body, function(err, newsArticle) {
				if(err) return next(err);

				res.status(201).json(newsArticle);
			});
		},

		queryConstructor: queryConstructor(NewsArticle),

		patch: function(req, res, next) {
			var query = {};

			query[mongoose.Types.ObjectId.isValid(req.params.id) ? '_id' : '_hid'] = req.params.id;

			NewsArticle.findOne(query, function(err, newsArticle) {
				delete req.body._id;
				delete req.body.__v;

				_.extend(newsArticle, req.body);

				return newsArticle.save(function(err) {
					if(err) return next(err);

					return res.status(200).json(newsArticle);
				});
			});
		},
		
		put: function(req, res, next) {
			var query = {};

			query[mongoose.Types.ObjectId.isValid(req.params.id) ? '_id' : '_hid'] = req.params.id;

			NewsArticle.findOne(query, function(err, newsArticle) {
				_.difference(_.keys(newsArticle.toObject()), _.keys(req.body)).forEach(function(key) {
					newsArticle[key] = undefined;
				});

				_.extend(newsArticle, _.omit(req.body, '_id', '__v'));

				return newsArticle.save(function(err) {
					if(err) return next(err);

					return res.status(200).json(newsArticle);
				});
			});
		},
		
		remove: function(req, res, next) {
			return NewsArticle.findById(req.params.id, function(err, newsArticle) {
				if(err) return next(err);
				return newsArticle.remove(function(err) {
					if(err) return next(err);
					return res.sendStatus(204);
				});
			});
		},
	};
};
