module.exports = {
	collections: {
		NewsletterEmails: require('./browser/admin/collections/newsletter-emails')
	},
	views: {
		NewsletterEmail: require('./browser/admin/views/newsletter-email'),
		NewsletterEmailsPage: require('./browser/admin/views/newsletter-emails-page')
	}
};

