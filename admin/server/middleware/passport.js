var passport = require('passport');

function _401(str) {
	var err = new Error(str ? str.message || str : 'No message');
	err.status = 401;
	return err;
}

function local(req, res, next) {
	return function (err, user, message) {
		// message will only be set if passport strategy has encountered login
		// error (not a coding error).
		if (message) 
			err = _401(message);

		if(err)
			return next(err);

		req.login(user, function (err) {
			if (err) return next(err); 

			user = user.toObject();
			delete user.local;

			res.status(200);
			
			res.format({
				html: function() {
					res.redirect(req.session.lastPath || '/');
				},
				json: function () {
					if(req.session.lastPath) res.set('Location', req.session.lastPath);

					res.json(user);
				}
			});
		});
	};
}

function social(req, res, next) {
	return function (err, user, message) {
		function respond(err, user) {
			
			if(err)
				err = _.pick(err, 'status', 'message');

			if(req.session.loginWindow) {

				res.status(err ? err.status || 500 : 200);

				_.extend(res.locals, {
					error: err,
					user: user,
					newUser: req.session.newUser,
					redirect: req.session.lastPath
				});

				res.render('social-callback-script');
			} else {
				res.redirect(req.session.lastPath || '/');
			}

			delete req.session.lastPath;
			delete req.session.loginWindow;
		}

		// message will only be set if passport strategy has encountered login
		// error (not a coding error).
		if (message) 
			err = _401(message);

		if (err)  
			return respond(err);

		// NOTE: passport does not seem to return an error if permission's are not granted, but user === false
		if(!user) {
			if(!req.session.newUser) {
				err = new Error(config.messages.externalLoginFailed);
				err.status = 400;
			}

			return respond(err);
		}

		req.login(user, function (err) {
			respond(err, _.omit(user.toObject(), passport.providers));
		});
	};
}

module.exports = function(config) {
	config = config.passport;

	var mw = {
		local: function (req, res, next) {
			passport.authenticate('local', local(req, res, next))(req, res, next);
		},
		logout: function(req, res, next) {
			req.logout();
			res.status(200);
			res.data.ok = true;
			next();
		}
	};

	// TODO place this in server/passport.js instead... it is currently placed
	// here because of Epiphany's loader sequence (server/passport.js needs to be
	// loaded after (User) model.
	passport.providers = [];

	_.each(config.providers, function(strategyConfig, key) {
		passport.providers.push(key);

		mw[key] = {
			login: function(req, res, next) {
				delete req.session.newUser;
				req.session.loginWindow = !!req.query.loginWindow;
				passport.authenticate(key, { scope: strategyConfig.scope || config.scope })(req,res,next);
			},
			callback: function (req, res, next) {
				passport.authenticate(key, social(req, res, next))(req, res, next);
			},
			verify: function(req, res, next) {
				req.session.verifying = true;
				passport.authenticate(key)(req, res, next);
			}
		};
	});

	return mw;
};
