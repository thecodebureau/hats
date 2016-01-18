var mw = require('./middleware');

module.exports = [
	[ '/api/newsletter-emails', 'get', [ mw.newsletterEmails.formatQuery, mw.newsletterEmails.paginate, mw.newsletterEmails.find ]],
	[ '/api/newsletter-emails', 'post', [ mw.newsletterEmails.create ] ],
	[ '/api/newsletter-emails/:id', 'delete', [ mw.newsletterEmails.remove ] ],
	[ '/api/newsletter-emails/:id', 'put', [ mw.newsletterEmails.put ] ],
	[ '/api/newsletter-emails/:id', 'patch', [ mw.newsletterEmails.patch ] ],
	//[ 'put', '/', [ mw.newsletterEmail.deactivate ] ],

	[ '/api/newsletters', 'get', [ mw.newsletters.findAll ] ],
	[ '/api/newsletters', 'post', [ mw.newsletters.create ] ],
	//'/api/newsletters', [ 'get', [ mw.newsletters.findById ] ],
	[ '/api/newsletters/:id', 'put', [ mw.newsletters.update ] ],
	[ '/api/newsletters/:id', 'delete', [ mw.newsletters.remove ] ]
	//[ 'post', '/:id', [ mw.newsletters.findById, mw.newsletterEmails.findAllLean, mw.sendNewsletter ] ],
	//[ 'post', 'newsletter/:id/test', [ mw.newsletters.findById, mw.sendNewsletter ] ],
];
