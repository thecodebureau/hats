var NewsletterEmailsCollection = require('./newsletter-emails-collection');
var NewsletterEmailView = require('./newsletter-email-view');

module.exports = require('ridge/views/page').extend({
	events: {
		'click .collection + .pagination li:not(.current) a.nav': function() {
			this.scroll = true;
		}
	},

	elements: {
		container: '.collection.container'
	},

	subviews: {
		pagination: [ '.pagination', require('ridge/views/pagination'), { template: 'admin/pagination' } ],
		search: [ '.search', require('ridge/views/search') ]
	},

	initialize: function(options) {
		this.modelViews = [];

		this.collection = new NewsletterEmailsCollection();

		this.listenTo(this.collection, 'reset', this.reset);

		this.listenTo(this.state, 'change:query', this.fetch);
	},

	fetch: function(model, query) {
		this.collection.fetch({ data: query, reset: true });
	},


	reset: function (collection) {
		var self = this,
			elements = [];

		_.invokeMap(this.modelViews, 'remove');

		this.modelViews = [];

		collection.each(function(model) {
			var modelView = new NewsletterEmailView({
				model: model,
			});

			self.modelViews.push(modelView);

			elements.push(modelView.el);
		});

		this.elements.container.append(elements);
	},

	attach: function() {
		this.collection.reset({
			totalCount: this.state.get('totalCount'),
			newsletterEmails: this.state.get('newsletterEmails')
		}, { parse: true });
	}
});
