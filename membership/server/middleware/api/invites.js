module.exports = function(config, mongoose) {
	var Invite = mongoose.model('Invite');

	return {
		create: function (req, res, next) {
			req.body.inviter = {};
			req.body.inviter._id = req.user._id;
			req.body.inviter.email = req.user.email;
			Invite.create(req.body, function (err, invite) {
				if (err) return next(err);

				var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
				res.render('emails/invite', { roles: req.body.roles }, function (err, html) {
					smtpTransport.sendMail({
						from: 'TCB Robot <no-reply@thecodebureau.com>',
						to: req.body.email,
						subject: 'You have been invited to the TCB Portal!',
						html: html
					}, function (err) {
						if (err) throw err;

						res.data.invite = invite;
						res.statusCode = 201;
						res.message = {
							type: 'success',
							heading: 'Invite created!',
							text: 'An email has been sent to the invitee.'
						};
						return next();
					});
				});
			});
		},

		findAll: function (req, res, next) {
			Invite.find({}, function (err, invites) {
				if (err) return next(err);
				res.data.invites = invites;
				next();
			});
		},

		findAllActive: function (req, res, next) {
			Invite.find({ active: true }, function (err, invites) {
				if (err) return next(err);
				res.data.invites = invites;
				next();
			});
		},

		remove: function (req, res, next) {
			Invite.remove({ _id: req.params.id }, function (err, count) {
				if (err) return next(err);
				if (count > 0) {
					res.statusCode = 200;
					res.message = {
						type: 'success',
						heading: 'The Invite has been removed.'
					};
				} else {
					res.statusCode = 410;
					res.message = {
						type: 'error',
						heading: 'Ingen invite hittades, ingen togs port.'
					};
				}
				return next();
			});
		}
	};
};

