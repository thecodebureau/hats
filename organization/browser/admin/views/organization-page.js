var app = require('ridge');

module.exports = require('ridge/view').extend({
	events: {
		'submit': 'preventDefault'
	},

	subviews: {
		ModelControls: '.controls'
	},

	initialize: function(opts) {
		var id = _.last(window.location.pathname.split('/'));

		// save page model data
		this.data = this.model.toJSON();

		this.model = new app.models.Organization();

		this.model.fetch();
	},

	attach: function() {
		var _view = this;

		if(this.formView) {
			this.stopListening(this.formView);
			this.formView.remove();
		}

		this.formView = new app.views.Form({
			el: this.$('form'),

			subviews: {
				SpytextField: '[data-spytext]',
				ImageUpload: '.image-upload'
			},

			model: this.model,

			bindings: {
				'address.addressRegion': 'value'
			},

			onSuccess: function(model, message, options) {
				console.log('organization saved!');
			}
		});
	}
});
