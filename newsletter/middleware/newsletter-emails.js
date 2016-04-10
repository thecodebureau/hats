var mw = {
	paginate: require('warepot/paginate'),
	formatQuery: require('warepot/format-query')
};

var NewsletterEmail = require('../models/newsletter-email');

var config = require('../config');

var create = function (req, res, next) {
	NewsletterEmail.findOne({ email: req.body.email }, function(err, newsletterEmail) {
		if(newsletterEmail) {
			err = _.extend(new Error('Email already added'), { status: 409 });
		}

		if(err) {
			err.message = config.error[err.status] || config.error.default;
			return next(err);
		}

		NewsletterEmail.create(req.body, function (err, newsletterEmail) {
			if(err) {
				err.message = config.error[err.status] || config.error.default;
				return next(err);
			}

			res.status(201);

			res.locals.message = config.success;

			return next();
		});

	});
};

var getAll = function (req, res, next) {
	NewsletterEmail.find({}).sort('name').exec(function (err, newsletterEmails) {
		if (err) return next(err);

		res.status(200);
		res.locals.newsletterEmails = newsletterEmails;

		next();
	});
};

var find = function(req, res, next) {
	var page = Math.max(0, req.query.page) || 0;
	var perPage = Math.max(0, req.query.limit) || res.locals.perPage;

	var query = NewsletterEmail.find(_.omit(req.query, 'limit', 'sort', 'page'),
		null,
		{ sort: req.query.sort || '-dateCreated', lean: true });

	if (perPage)
		query.limit(perPage).skip(perPage * page);

	query.exec(function(err, newsletterEmails) {
		res.locals.newsletterEmails = newsletterEmails;
		next(err);
	});
};

var remove = function (req, res, next) {
	NewsletterEmail.remove({ _id: req.params.id }, function (err) {
		if (err) return next(err);

		res.status(204);

		next();
	});
};

var deactivate = function (req, res, next) {
	NewsletterEmail.findOne({ email: req.body.email }, function (err, newsletterEmail) {
		newsletterEmail.active = false;
		newsletterEmail.save(function (err) {
			if (err) next(err);
			res.message = {
				type: 'success',
				heading: 'Epostadressen har tagits bort från listan.',
			};
			res.statusCode = 200;
			next();
		});
	});
};

var patch = function(req, res, next) {
	NewsletterEmail.findById(req.params.id, function(err, newsletterEmail) {
		delete req.body._id;
		delete req.body.__v;

		_.extend(newsletterEmail, req.body);

		return newsletterEmail.save(function(err) {
			if(err) return next(err);

			res.status(200);

			res.locals.newsletterEmail = newsletterEmail;
			next();
		});
	});
};

var put = function (req, res, next) {
	// TODO this does not remove shit
	NewsletterEmail.findOne({ _id: req.params.id }, function (err, newsletterEmail) {
		_.merge(newsletterEmail, req.body);
		newsletterEmail.save(function (err) {
			if (err) next(err);
			res.message = {
				type: 'success',
				heading: 'Laget har uppdaterats',
			};
			res.statusCode = 201;
			next();
		});
	});
};

module.exports = {
	create: create,
	getAll: getAll,
	find: find,
	formatQuery: mw.formatQuery([ 'page', 'sort', 'limit', 'email', 'active' ], {
		email: 'regex'
	}),
	paginate: mw.paginate(NewsletterEmail, 100),
	remove: remove,
	deactivate: deactivate,
	patch: patch,
	put: put
};
