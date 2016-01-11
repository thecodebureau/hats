var mw = require('./middleware');

module.exports = [
	{
		title: 'Gallery',
		middleware: [ mw.formatQuery, mw.paginate, mw.find ],
		pages: [ {
			path: ':id',
			template: 'admin/pages/gallery-image',
			middleware: [ mw.findById ],
			nav: false
		} ]
	}
];
