var mw = require('./middleware');

module.exports = [
	{
		title: 'Gallery',
		middleware: [ mw.formatQuery, mw.paginate, mw.find ],
		template: 'admin/pages/gallery',
		reload: true,
		pages: [ {
			path: ':id',
			template: 'admin/pages/gallery-image',
			middleware: [ mw.findById ],
			nav: false,
			reload: true,
		} ]
	}
];
