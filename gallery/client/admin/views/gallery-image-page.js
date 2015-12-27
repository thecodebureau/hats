var app = require('ridge');

View = require('ridge/view').extend();

_.extend(View.prototype, require('ridge/mixins/active-buttons'), {
	events: {
		'click button[data-command="create"]': 'create',
		'click button[data-command="reset"]': 'reset',
		'click button[data-command="save"]': 'save',
	},

	save: function() {
		if(this.model.isValid()) {
			this.model.save(null, null, { validate: false });
		}
	},

	reset: function() {
		if(confirm('Are you sure you want to reset?')) {
			this.model.reset();
		}
	},

	create: function() {
		var _view = this;

		if(_view.model.isValid()) {
			_view.model.save(null, {
				success: function(model, response, opts) {
					var path = _.initial(Backbone.history.fragment.split('/')).concat(model.id).join('/');

					Backbone.history.navigate(path, { replace: true });
				}
			});
		}
	},


	initialize: function(opts) {
		// save page model data
		this.data = this.model.toJSON();

		this.model = new app.models.GalleryImage(this.model.get('galleryImage') || {});

		this.listenTo(this.model, 'change sync cancel', this.setActiveButtons);
	},

	attach: function() {
		this.setActiveButtons();

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
