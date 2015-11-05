var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var reqProto = require('http').IncomingMessage.prototype;

reqProto.hasRoles = function(roles) {
	if(!_.isArray(roles)) roles = [ roles ];

	return this.isAuthenticated() && roles.every(this.user.hasRole);
};

reqProto.isAdmin = function() {
	return req.hasRoles([ 'admin' ]);
};

reqProto._login = reqProto.login;

reqProto.login = function(user, req) {
	user.login();
	if(this.session && this.session.newUser)
		delete req.session.newUser;	

	this._login.apply(this, arguments);
};

function extractProfile(profile, token) {
	var user = {};

	var provider;

	switch(profile.provider) {
		case 'instagram':
			provider = {
				id: profile.id, // set the users facebook id                   
				token: token, // we will save the token that facebook provides to the user                    
			};
			break;
		default:
			provider = {
				id: profile.id, // set the users facebook id                   
				token: token, // we will save the token that facebook provides to the user                    
				email: profile.emails ? profile.emails[0].value : null,
				displayName: profile.displayName// facebook can return multiple emails so we'll take the first
			};
			
			user = {
				givenName: profile.name.givenName, // look at the passport user profile to see how names are returned
				familyName: profile.name.familyName,
				email: provider.email
			};

			break;
	}

	user[profile.provider] = provider;

	return user;
}

module.exports = function(epiphany) {
	config = epiphany.config.passport;

	var User = epiphany.mongoose.model('User');
	
	function localCallback(email, password, done) {
		User.findOne({ email: email.toLowerCase() }, function(err, user) {
			if(err) 
				return done(err);

			var message;

			if(user) {
				if(!user.local || !user.local.password) {
					message = config.messages.notLocal;
				} else if (!user.isVerified) {
					message = config.messages.unverified;
				} else if (user.isBlocked) {
					message = config.messages.blocked;
				} else if (user.isBanned) {
					message = config.messages.banned;
				} else if(!user.authenticate(password)) {
					message = config.messages.wrongPassword;
				}
			} else {
				message = config.messages.noLocalUser;
			}
			
			done(null, user, message);
		});
	}
	
	function socialCallback(req, token, refreshToken, profile, done) {
		process.nextTick(function() {
			var query = {};
			query[profile.provider + '.id'] = profile.id;

			User.findOne(query, function(err, user) {
				// if there is an error, stop everything and return that
				// ie an error connecting to the database
				if(err)
					return done(err);

				var message;

				if(!user) {
					message = config.messages.noExternalUser;
					req.session.newUser = extractProfile(profile, token);
				} else if (user.isBanned) {
					message = config.messages.banned;
				}
				
				done(null, user, message);
			});
		});
	}

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

	passport.use('local', new LocalStrategy(config.local, localCallback));

	_.each(config.providers, function(config, key) {
		var Strategy = key === 'google' ? require('passport-google-oauth').OAuth2Strategy : require('passport-' + _.kebabCase(key)).Strategy;

		passport.use(key, new Strategy(config, socialCallback));
	});

	epiphany.preware([ passport.initialize(), passport.session() ], 'after', epiphany.mw.session);
	epiphany.preware([ '/uploads', epiphany.express.static(epiphany.config.dir.server.uploads) ], 'after', epiphany.mw.static);
};
