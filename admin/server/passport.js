var passport = require('passport');

var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var req = require('http').IncomingMessage.prototype;

req.hasRoles = function(roles) {
	if(!_.isArray(roles)) roles = [ roles ];

	return this.isAuthenticated() && roles.every(this.user.hasRole);
};

req.isAdmin = function() {
	return req.hasRoles([ 'admin' ]);
};

req._login = req.login;

req.login = function(user) {
	user.login();
	this._login.apply(this, arguments);
};

module.exports = function(epiphany) {
	config = epiphany.config.passport;

	var User = epiphany.mongoose.model('User');

	passport.use('local', new LocalStrategy(config.local, function(email, password, done) {
		User.findOne({ email: email.toLowerCase() }, function(err, user) {
			if(err) 
				return done(err);

			var message;

			if(user) {
				if (user.isBanned) {
					user = null;
					message = config.messages.banned;
				}

				if (user.isBlocked) {
					user = null;
					message = config.messages.blocked;
				}

				if(!user.local || !user.local.password) {
					user = null;
					message = config.messages.notLocal;
				} else if(!user.authenticate(password)) {
					user = null;
					message = config.messages.wrongPassword;
				}
			} else {
				message = config.messages.noUser;
			}
			
			done(null, user, { message: message });
		});
	}));

	passport.use('facebook', new FacebookStrategy(config.facebook, socialCallback));

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	function socialCallback(req, token, refreshToken, profile, done) {
		process.nextTick(function() {
			var query = {};
			query[profile.provider + '.id'] = profile.id;

			User.findOne(query, function(err, user) {

				// if there is an error, stop everything and return that
				// ie an error connecting to the database
				if (err)
					return done(err);

				// if the user is found, then log them in
				if(req.session.verifying) {
					req.session.verifying = undefined;

					if (user) {
						err = new Error('Kontot är redan kopplat.');
						err.status = 409;
						return done(err);
					}

					var newUser;

					switch(profile.provider) {
						case 'instagram':
							newUser = {
								instagram: {
									id: profile.id, // set the users facebook id                   
									token: token, // we will save the token that facebook provides to the user                    
									username: profile.username.givenName
								}
							};
							break;
						case 'facebook':
							newUser = {
								facebook: {
									id: profile.id, // set the users facebook id                   
									token: token, // we will save the token that facebook provides to the user                    
									name: profile.name.givenName + ' ' + profile.name.familyName, // look at the passport user profile to see how names are returned
									email: profile.emails ? profile.emails[0].value : null // facebook can return multiple emails so we'll take the first
								}
							};
							break;
					}

					if(!req.session.newUser)
						req.session.newUser = newUser;
					else
						_.merge(req.session.newUser, newUser);

					return done(null,true,null);
				}

				// is not verifying, simply login or give login error
				if (user) {
					return done(null, user); // user found, return that user
				}

				done(null,null);
			});
		});
	}

	epiphany.preware([ passport.initialize(), passport.session() ], 'after', epiphany.mw.session);
	epiphany.preware([ '/uploads', epiphany.express.static(epiphany.config.dir.server.uploads) ], 'after', epiphany.mw.static);
};
