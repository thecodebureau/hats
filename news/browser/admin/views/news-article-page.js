var NewsArticleModel = require('../../models/news-article');

var View = require('ridge/views/page').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
	events: {
		'submit form': 'preventDefault'
	},

	bindings: {
		'articleBody': {
			'[data-name="articleBody"]': 'html'
		}
	},

	subviews: {
		buttons: [ '.controls', require('./news-article-page-buttons') ],
		imageUpload: [ '.image-upload', require('hats/image-upload/browser/image-upload-view'), {
			property: 'image',
			imageOptions: {
				type: "news",
				maxWidth: "1024",
				mediumWidth: "600",
				thumbWidth: "300",
				ratio: "1.61803398875" 
			}
		} ],
		spytextFields: [ '[data-spytext]', require('spytext/field'), { multi: true } ],
		form: [ 'form', require('ridge/views/form-styling') ]
	},

	initialize: function(opts) {
		this.model = new NewsArticleModel(this.state.get('newsArticle') || {});

		// use properties from model validation to set up more bindings.
		// all model validation properties are assumed to be 'value' getter and setter
		this.bindings = _.defaults(this.bindings, _.mapValues(this.model.validation, function(value, key) {
			var binding = {};

			binding['[name="' + key + '"],[data-name="' + key + '"]'] = {
				both: 'value',
			};

			return binding;
		}));
	},

	attach: function() {
		this.observe({ validate: true });

		if(!this.model.isNew())
			this.model.validate();
	}
});

module.exports = View;
