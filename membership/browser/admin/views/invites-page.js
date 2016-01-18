var InvitesCollection = require('../collections/invites');
var InviteView = require('./invite');

module.exports = require('ridge/views/page').extend({
	elements: {
		container: '.collection.container'
	},

	subviews: {
		paginations: [ '.pagination', require('ridge/views/pagination'), { template: 'admin/pagination', multi: true } ],
		search: [ '.search', require('ridge/views/search') ]
	},

	initialize: function(options) {
		this.collection = new InvitesCollection();

		this.listenTo(this.collection, 'reset', this.reset);

		this.listenTo(this.state, 'change:query', this.fetch);
	},

	fetch: function(state, query) {
		this.collection.fetch({ reset: true, data: query });
	},

	attach: function() {
		this.collection.reset({
			totalCount: this.state.get('totalCount'),
			invites: this.state.get('invites')
		}, { parse: true });
	},

	reset: function (models, options) {
		_.invoke(this.modelViews, 'remove');

		this.modelViews = [];

		models.each(this.renderModel, this);
	},

	renderModel: function(model) {
		this.modelViews.push(new InviteView({
			model: model,
			data: this.data,
		}).enter(this.elements.container));
	},
});
