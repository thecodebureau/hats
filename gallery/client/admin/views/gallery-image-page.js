var GalleryImageModel = require('../../models/gallery-image');

var View = require('ridge/view').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
	events: {
		'submit form': 'preventDefault'
	},

	bindings: {
		basename: {
			'[data-hook="image.basename"]': 'html'
		},
		ext: {
			'[data-hook="image.ext"]': 'html'
		},
		thumbUrlPath: {
			'[data-hook="image.thumbUrlPath"]': 'src'
		},
		mime: {
			'[data-hook="image.mime"]': 'html'
		},
		contentSize: {
			'[data-hook="image.contentSize"]': 'html'
		},
		width: {
			'[data-hook="image.width"]': 'html'
		},
		height: {
			'[data-hook="image.height"]': 'html'
		},
	},

	subviews: {
		buttons: [ '.controls', require('./buttons') ],
		imageUpload: [ '.image-upload', require('hats/image-upload/browser/image-upload-view') ],
		spytextFields: [ '[data-spytext]', require('spytext/field'), { multi: true } ],
		form: [ 'form', require('ridge/views/form-styling') ]
	},

	initialize: function(opts) {
		this.model = new GalleryImage(this.model.get('galleryImage') || {});

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
