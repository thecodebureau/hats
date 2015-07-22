// load 3rd party modules
var _ = require('lodash');

module.exports = function(config, mongoose) {
	var GalleryImage = mongoose.model('GalleryImage');

	return {
		findAll: function(req, res, next) {
			var query = {};

			if(!req.user)
				query.datePublished = { $ne: null }

			GalleryImage.find(query).sort('-uploadDate').lean().exec(function(err, galleryImages) {
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

		update: function(req, res, next) {
			GalleryImage.findById(req.params.id, function(err, galleryImage) {
				delete req.body._id;
				delete req.body.__v;

				_.extend(galleryImage, req.body);

				return galleryImage.save(function(err) {
					if(err) return next(err);

					return res.status(200).json(galleryImage);
				});
			});
		},
		
		delete: function(req, res, next) {
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
