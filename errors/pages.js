var mw = require('./middleware');

module.exports = [ {
	title: 'Errors',
	view: 'ErrorsPage',
	middleware: [ mw.formatQuery, mw.paginate, mw.find ]
} ];
