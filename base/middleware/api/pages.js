
module.exports = function(config, mongoose) {
	var Page = mongoose.model('Page');

	return {
		findOne: function(req, res, next) {
			var id = req.params.id || req.path.slice(1) || 'index';
			Page.findOne({ _id: id }, function(err, page) {
				if (err) return next(err);
				if (page) res.data.page = page;
				next();
			});
		}
	};
};
