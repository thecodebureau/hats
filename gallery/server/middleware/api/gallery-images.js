// load 3rd party modules
//
module.exports = function(config, mongoose, mw) {
	var GalleryImage = mongoose.model('GalleryImage');

	return {
		getAll: function(req, res, next) {
			GalleryImage.find().sort('-uploadDate').lean().exec(function(err, galleryImages) {
				if(err) return next(err);

				res.data.galleryImages = galleryImages;
				next();
			});
		}, 

		getPublished: function(req, res, next) {
			GalleryImage.find({ datePublished: { $ne: null }}).sort('-datePublished').lean().exec(function(err, galleryImages) {
				if(err) return next(err);

				res.data.galleryImages = galleryImages;
				next();
			});
		}, 

		findById: function(req, res, next) {
			GalleryImage.findById(req.params.id).lean().exec(function(err, galleryImage) {
				if(err) return next(err);
				res.data.galleryImage = galleryImage;
				next();
			});
		},

		create: function(req, res, next) {
			GalleryImage.create(req.body, function(err, galleryImage) {
				if(err) return next(err);

				res.status(201).json(galleryImage);
			});
		},

		find: function(req, res, next) {
			var page = Math.max(0, req.query.page) || 0;
			var perPage = Math.max(0, req.query.limit) || res.locals.perPage;

			var queryDocument = _.omit(req.query, 'limit', 'sort', 'page');

			if(!req.user)
				queryDocument.datePublished = { $ne: null };

			var query = GalleryImage.find(queryDocument,
				null,
				{ sort: req.query.sort || '-dateCreated', lean: true });

			if (perPage)
				query.limit(perPage).skip(perPage * page);

			query.exec(function(err, galleryImages) {
				res.data.galleryImages = galleryImages;
				next(err);
			});
		},

		paginate: mw.paginate(GalleryImage, 20),

		patch: function(req, res, next) {
			var query = {};

			query[mongoose.Types.ObjectId.isValid(req.params.id) ? '_id' : '_hid'] = req.params.id;

			GalleryImage.findOne(query, function(err, galleryImage) {
				delete req.body._id;
				delete req.body.__v;

				_.extend(galleryImages, req.body);

				return galleryImage.save(function(err) {
					if(err) return next(err);

					return res.status(200).json(galleryImage);
				});
			});
		},
		
		put: function(req, res, next) {
			var query = {};

			query[mongoose.Types.ObjectId.isValid(req.params.id) ? '_id' : '_hid'] = req.params.id;

			GalleryImage.findOne(query, function(err, galleryImage) {
				_.difference(_.keys(galleryImage.toObject()), _.keys(req.body)).forEach(function(key) {
					galleryImage[key] = undefined;
				});

				_.extend(galleryImage, _.omit(req.body, '_id', '__v'));

				return galleryImage.save(function(err) {
					if(err) return next(err);

					return res.status(200).json(galleryImage);
				});
			});
		},
		
		remove: function(req, res, next) {
			return GalleryImage.findById(req.params.id, function(err, galleryImage) {
				if(err) return next(err);
				return galleryImage.remove(function(err) {
					if(err) return next(err);
					return res.sendStatus(200);
				});
			});
		},
	};
};
