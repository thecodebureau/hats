var nodemailer = require('nodemailer');

var Invite = require('../models/invite');

var config = require('../config');

var smtpTransport = nodemailer.createTransport(config.mail);

var mw = {
	formatQuery: require('epiphany/middleware/format-query'),
	paginate: require('epiphany/middleware/paginate')
};

module.exports = {
	create: function (req, res, next) {
		req.body.inviter = {
			_id: req.user._id,
			email: req.user.email
		};

		Invite.create(req.body, function (err, invite) {
			if (err) return next(err);

			res.render('emails/invite', { site: config.site, invite: invite }, function (err, html) {
				if(err) return next(err);

				smtpTransport.sendMail({
					from: config.invite.from,
					to: req.body.email,
					subject: config.invite.subject,
					html: html
				}, function (err) {
					if (err) return next(err);
					res.status(201).data.invite = invite;

					return next();
				});
			});
		});
	},

	find: function(req, res, next) {
		var page = Math.max(0, req.query.page) || 0;
		var perPage = Math.max(0, req.query.limit) || res.locals.perPage;

		var query = Invite.find(_.omit(req.query, 'limit', 'sort', 'page'),
			null,
			{ sort: req.query.sort || '-dateCreated', lean: true });

		if (perPage)
			query.limit(perPage).skip(perPage * page);

		query.exec(function(err, invites) {
			res.locals.invites = invites;
			next(err);
		});
	},

	findById: function (req, res, next) {
		if(req.params.id === 'new') return next();

		Invite.findById(req.params.id, function (err, invite) {
			if (err) return next(err);

			res.status(200).data.invite = invite;
			next();
		});
	},

	formatQuery: mw.formatQuery([ 'limit', 'sort', 'page' ]),

	getAll: function (req, res, next) {
		Invite.find({}, function (err, invites) {
			if (err) return next(err);
			res.locals.invites = invites;
			next();
		});
	},

	getActive: function (req, res, next) {
		Invite.find({ active: true }, function (err, invites) {
			if (err) return next(err);
			res.locals.invites = invites;
			next();
		});
	},

	paginate: mw.paginate(Invite, 20),

	remove: function (req, res, next) {
		Invite.remove({ _id: req.params.id }, function (err, count) {
			if (err) return next(err);

			res.locals.ok = true;

			return next();
		});
	}
};
