module.exports = function(config, mongoose) {
	var ErrorModel = mongoose.model('Error');

	return {
		findAll: function(req, res, next) {
			ErrorModel.find({}).sort('-dateCreated').exec(function(err, errors) {
				if(err) return next(err);

				res.status(200);

				res.data.errors = errors;

				next();
			});
		},

		findOne: function(req, res, next) {
			var id = req.params.id || req.path.slice(1) || 'index';
			Page.findOne({ _id: id }, function(err, page) {
				if (err) return next(err);
				if (page) res.data.page = page;
				next();
			});
		},

		delete: function(req, res, next) {
			ErrorModel.remove({ _id: req.params.id }, function(err) {
				if(err) return next(err);

				res.status(204);

				next();
			});
		}
	};
};
