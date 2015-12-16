var mw = require('./middleware');

module.exports = [ {
	title: 'Organization',
	view: 'OrganizationPage',
	middleware: mw.get
} ];
