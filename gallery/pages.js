var mw = require('./middleware');

module.exports = [
	{
		title: 'Gallery',
		view: 'GalleryPage',
		middleware: [ mw.formatQuery, mw.paginate, mw.find ],
		pages: [ {
			path: ':id',
			view: 'GalleryImagePage',
			template: 'admin/pages/gallery-image',
			middleware: mw.findById,
			nav: false
		} ]
	}
];
