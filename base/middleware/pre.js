var async = require('async');

module.exports = function(config, mongoose) {
	return function(req, res, next) {
		res.data = {};

		req.analytics = {userEvents: []}; 

		if(!req.xhr) {
			res.locals.user = req.user;
		}

		if (ENV === 'development' && global.LOGIN_USER && !req.user) {
			var User = mongoose.model('User');

			User.findOne({ email: LOGIN_USER }, function (err, user) {
				if (err) return next(err);

				req.login(user, function (err) {
					if (err) return next(err);
					
					next();
				});
			});
		} else {
			next();
		}

	};
};
