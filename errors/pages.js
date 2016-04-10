var mw = require('./middleware');

module.exports = [ {
	title: 'Errors',
	middleware: [ mw.formatQuery, mw.paginate, mw.find ],
	template: 'admin/pages/errors',
	reload: true
} ];
