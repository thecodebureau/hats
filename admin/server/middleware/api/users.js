var nodemailer = require('nodemailer');
var passport = require('passport');

module.exports = function(config, mongoose) {
	var transport = nodemailer.createTransport(config.mail);

	function getPermissions(req, email, callback) {
		if (! req.body.roles) {
			Invite.findOne({ email: email }, function (err, invite) {
				if (err) return callback(err);

				var roles = invite ? invite.roles : [];

				Permission.findMatches(email, function (err, permissions) {
					if (err) callback(err);

					for (var i = 0; i < permissions.length; i++) {
						roles = _.union(roles, permissions[i].roles);
					}

					return callback(null, roles);
				});
			});
		} else if(req.isAdmin()) {
			return callback(null, req.body.roles);
		} else {
			return callback(null, []);
		}
	}

	var User = mongoose.model('User');
	var Permission = mongoose.model('Permission');
	var Invite = mongoose.model('Invite');

	return {
		register: function (req, res, next) {
			if(!req.body.email) {
				if(req.body.facebook && req.body.facebook.email)
					req.body.email = req.body.facebook.email;
				else
					return next(new Error('Incomplete body'));
			}


			User.findOne({ email: req.body.email }, function(err, user) {
				if(err) next(err);

				else if(user) {
					err = new Error('The email address has already been used.');
					err.status = 409;
					next(err);
				} else {

					req.body.email = req.body.email.toLowerCase();

					var provider = _.pick(req.body, passport.providers);

					if(!_.isEmpty(provider) && (!req.session.newUser || !_.matches(provider)(_.pick(req.session.newUser, passport.providers)))) {
						err = new Error('The supplied user credentials does not match those retrieved from ' + _.keys(provider)[0] + '.');
						err.status = 400;
						return next(err);
					}

					delete req.session.newUser;

					newUser = new User(req.body);

					getPermissions(req, req.body.email, function(err, roles) {
						if(err) return next(err);

						if(roles.length < 1) {
							err = new Error('The supplied email address is not authorized to register on this website.');
							err.status = 401;
							return next(err);
						}

						newUser.roles = roles;

						newUser.save(function(err) {
							function respond() {
								if(req.xhr) {
									res.json(_.isEmpty(provider) ? null : _.omit(newUser.toJSON(), [ 'local' ].concat(passport.providers) ));
								} else {
									res.redirect('/registered');
								}
							}
						
							if(err) return next(err);

							res.status(201);

							if(!_.isEmpty(provider)) {
								newUser.isVerified = true;
								req.login(newUser, respond);
							} else {
								res.data.ok = true;
								newUser.generateVerificationCode();
								res.render('emails/verify-email', { user: newUser }, function (err, html) {
									transport.sendMail({
										from: config.details.title + ' <' + config.mail.emails.robot + '>',
										to: newUser.email,
										subject: 'Verify ' + config.details.title + ' account',
										html: html
									}, function (err) {
									 // TODO handle error... should not be sent
									 if(err) return next(err);

									 respond();
									});
								});
							}
						});
					});
				}
			});
		},

		query: function(req, res, next) {
			var options = [];

			var queryDocument = _.object(_.pairs(req.query).filter(function(arr) {
				if(/^_/.test(arr[0])) {
					arr[0] = arr[0].slice(1);
					options.push(arr);
					return false;
				}

				return true;
			}));

			options = _.object(options);

			var query = User.find(queryDocument);

			_.each(options, function(value, key) {
				query[key](value);
			});
			
			query.exec(function (err, users) {
				if (err) return next(err);

				res.data.users = users;

				User.count(queryDocument, function(err, count) {
					if(err) return next(err);

					res.set('X-Collection-Length', count);

					next();
				});
			});
		},

		findOne: function (req, res, next) {
			if(req.user && (req.params.id === req.user._id.toString())) {
				res.data.user = _.omit(req.user.toJSON(), [ 'local', 'facebook' ]);
				return next();
			} else {
				User.findById(req.params.id).lean().exec(function(err, user) {
					if(err) return next(err);

					res.data.user = _.omit(user, [ 'local', 'facebook' ]);
					next();
				});
			}
		},

		findAll: function (req, res, next) {
			User.find(req.query, function (err, users) {
				if (err) return next(err);
				res.data.users = users;
				return next();
			});
		},

		exists: function(property) {
			return function(req, res) {
				// TODO maybe return true?
				if(!req.query[property])
					return res.json(false);

				var query = {};
				query[property] = req.query[property];

				User.findOne(query, function(err, user) {
					if(err) return next(err);

					if(user)
						return res.json(false);

					return res.json(true);
				});
			};
		},

		// middleware that checks if an email and reset code are valid
		verify: function(req, res, next) {
			User.findOne({ email: req.query.email, 'local.verificationCode': req.query.code }, function(err, user) {
				if(err) return next(err);

				if(!user) {
					err = new Error('Verification code not found for user.');
					err.status = 404;
					err.details = req.query;
					return next(err);
				}

				if(user.dateCreated.getTime() + 24 * 60 * 60 * 1000 < Date.now()) {
					err = new Error('Verification code has expired.');
					err.status = 410;
					err.details = req.query;
					return next(err);
				}

				user.isVerified = true;
				delete user.local.verificationCode;
				user.save(function() {
					req.login(user, function() {
						res.redirect('/registered');
					});
				});
			});
		},
		// middleware that checks if an email and reset code are valid
		checkReset: function(req, res, next) {
			User.findOne({ email: req.query.email, 'local.reset.code': req.query.code }, function(err, user) {
				if(err) return next(err);

				if(!user) {
					err = new Error('Reset code not found for user.');
					err.status = 404;
					err.details = req.query;
					return next(err);
				}

				if(user.local.reset.date.getTime() + 24 * 60 * 60 * 1000 < Date.now()) {
					err = new Error('Reset code has expired.');
					err.status = 410;
					err.details = req.query;
					return next(err);
				}

				next();
			});
		},

		resetPassword: function(req, res, next) {
			User.findOne({ email: req.body.email }, function(err, user) {
				if(err) return next(err);

				if(!user) {
					err = new Error("No user with email");
					err.status = 404;
					err.details = req.body;
					return next(err);
				}

				user.resetPassword();

				var link = 'https://' + config.domain + '/reset?email=' + encodeURI(user.email) + '&code=' + user.local.reset.code;

				res.render('emails/reset-password', { link: link }, function (err, html) {
					if(err) next(err);

					transport.sendMail({
						from: config.details.title + ' <' + config.mail.emails.robot + '>',
						to: user.email,
						subject: 'Reset ' + config.details.title + ' password',
						html: html
					}, function (err) {
					 // TODO handle error... should not be sent

						res.status(200).send();
					});
				});
			});
		},

		remove: function (req, res, next) {
			User.remove({ _id: req.params.id }, function (err, count) {
				if (err) return next(err);

				if (count > 0) {
					res.statusCode = 200;
					res.message = {
						type: 'success',
						heading: 'The user has been removed.'
					};
				} else {
					res.statusCode = 410;
					res.message = {
						type: 'error',
						heading: 'No user was found, thus none was removed.'
					};
				}
				return next();
			});
		},

		update: function (req, res, next) {
			User.findById(req.params.id, function(err, user) {
				if(req.body.email) {
					req.body.email = req.body.email.toLowerCase().trim();
				}

				_.extend(user, _.omit(req.body, [ '_id', '__v', 'local', 'facebook' ]));

				user.save(function (err) {
					if (err) {
						return next(err);
					}

					res.status(201);
					res.data.user = _.omit(req.user.toJSON(), [ 'local', 'facebook' ]);

					return next();
				});
			});
		},

		updatePassword: function(req, res, next) {
			if(!req.body.email || !req.body.password || !req.body.code) {
				return next(new Error('Not enough parameters'));
			}

			User.findOne({ email: req.body.email, 'local.reset.code': req.body.code }, function (err, user) {
				if(err) return next(err);

				if(!user) {
					err = new Error('No user found');
					err.status = 404;
					err.details = _.omit(req.body.password);
					return next(err);
				}

				user.local.password = req.body.password;

				user.local.reset = undefined;

				user.save(function (err) {
					if (err) {
						return next(err);
					}
					res.status(200);
					res.send();
				});
			});
		}
	};
};
