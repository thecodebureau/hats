var mw = require('./middleware');

module.exports = [ {
	title: 'Content',
	view: 'ContentPage',
	middleware: [ mw.formatQuery, mw.paginate, mw.find, function(req, res, next) {
		var pages = epiphany.pages.public;

		var paths = [];

		while(pages && pages.length) {
			paths.push.apply(paths, _.pluck(pages, 'path'));

			pages = _.compact(_.flatten(_.pluck(pages, 'pages')));
		}

		res.locals.paths = paths.sort();
		next();
	} ],
	pages: [ {
		path: ':id',
		view: 'FieldPage',
		template: 'admin/pages/field',
		middleware: [ mw.findById, function(req, res, next) {
			var pages = epiphany.pages.public;

			var paths = [];

			while(pages && pages.length) {
				paths.push.apply(paths, _.pluck(pages, 'path'));

				pages = _.compact(_.flatten(_.pluck(pages, 'pages')));
			}

			res.locals.paths = paths.sort();

			res.locals.languages = epiphany.config.content.languages;
			next();
		} ],
		nav: false
	} ]
} ];
