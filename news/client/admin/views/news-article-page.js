var app = require('ridge');

View = require('ridge/view').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
	events: {
		'submit': 'preventDefault'
	},

	subviews: {
		SpytextField: '[data-spytext]',
		ImageUpload: '.image-upload',
		ModelControls: '.controls'
	},

	bindings: {
		'headline': 'value',
		'articleBody': 'html'
	},

	initialize: function(opts) {
		var id = _.last(window.location.pathname.split('/'));

		var collection = new app.collections.NewsArticles();

		// save page model data
		this.data = this.model.toJSON();

		if(id === 'new') {
			this.model = collection.add({});
		} else {
			this.model = collection.add({ _id: id });
			this.model.fetch();
		}
	},

	attach: function() {
		this.observe();
	},
});

module.exports = View;
