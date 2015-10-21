var app = require('ridge');

View = require('ridge/view').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
	events: {
		'submit': 'preventDefault'
	},

	subviews: {
		ModelControls: '.controls'
	},

	initialize: function(opts) {
		var id = _.last(window.location.pathname.split('/'));

		var collection = new app.collections.GalleryImages();

		// save page model data
		this.data = this.model.toJSON();

		if(id === 'new') {
			this.model = collection.add({});
		} else {
			this.model = collection.add({ _id: id });
		}

		this.model.fetch();
	},

	attach: function() {
		this.views.push(new app.views.ImageUpload({
			el: this.$('.image-upload'),
			data: this.data,
			model: this.model,
			bindings: {
				'basename': {
					hook: 'image.basename',
					type: 'html'
				},
				'ext': {
					hook: 'image.ext',
					type: 'html'
				},
				'thumbUrlPath': {
					hook: 'image.thumbUrlPath',
					type: 'src'
				},
				'mime': {
					hook: 'image.mime',
					type: 'html'
				},
				'contentSize': {
					hook: 'image.contentSize',
					type: 'html'
				},
				'width': {
					hook: 'image.width',
					type: 'html'
				},
				'height': {
					hook: 'image.height',
					type: 'html'
				},
				'caption': {
					hook: 'image.caption',
					type: 'value'
				}
			}
		}));
	},
});

module.exports = View;
