var passport = require('passport');

function _401(str) {
	var err = new Error(str);
	err.status = 401;
	return err;
}

function local(req, res, next) {
	return function (err, user, message) {
		// message will only be set if local passport strategy has encountered login
		// error (not a coding error).
		if (message) {
			err = new Error(message);
			err.status = 401;
			return next(err);
		}

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

					res.json(user.toJSON());
				}
			});
		});
	};
}

function social(req, res, next) {
	return function (err, user, info) {
		function done(err) {
			
			if(err)
				err = _.pick(err, 'status', 'message');

			res.locals.script = 'if(window.opener) {' +
				'window.opener.broadcast.trigger("authenticate", ' + JSON.stringify(err) + ', ' + JSON.stringify(user) + ');' +
				'window.close();' +
				'} else {' +
					'window.history.back();' +
				'}';

			res.status(err ? err.status || 500 : 200);

			return res.render('util/script');
		}

		if (err) { 
			return done(err);
		}

		// NOTE: passport does not seem to return an error if permission's are not granted, but user === false
		if(!user && info) {
			var message;
			if(info.message === 'Permissions error') {
				message = 'Den externa inloggningen misslyckades.';
			}
			err = new Error(message || 'Den externa inloggningen misslyckades.');
			err.status = 401;
			return done(err);
		}

		if(req.session.newUser) {
			user = req.session.newUser;

			delete req.session.newUser;

			done();
		} else {
			// if(!user) should not be needed... authentication/permission error should have been called if no user

			if(!user) {
				err = new Error('Kontot är inte kopplat till doggy.');
				err.status = 401;
				return done(err);
			}

			req.login(user, function (err) {
				if (err) {
					return done(err); 
				}
				done();
			});
		}
	};
}

module.exports = function(config) {
	return {
		local: function (req, res, next) {
			passport.authenticate('local', local(req, res, next))(req, res, next);
		},
		instagram: {
			login: passport.authenticate('instagram'),
			callback: function (req, res, next) {
				passport.authenticate('instagram', social(req, res, next))(req, res, next);
			},
			verify: function(req, res, next) {
				req.session.verifying = true;
				passport.authenticate('instagram')(req, res, next);
			}
		},
		facebook: {
			login: passport.authenticate('facebook', { scope : [ 'email'] }),
			callback: function (req, res, next) {
				passport.authenticate('facebook', social(req, res, next))(req, res, next);
			},
			verify: function(req, res, next) {
				req.session.verifying = true;
				passport.authenticate('facebook', { scope : [ 'email'] })(req, res, next);
			}
		},
		logout: function(req, res, next) {
			req.logout();
			res.status(200);
			res.data.ok = true;
			next();
		}
	};
};
