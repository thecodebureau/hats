var app = require('ridge');

module.exports = require('ridge/view').extend({
	subviews: {
		ModelControls: '.controls'
	},

	initialize: function(opts) {
		var id = _.last(window.location.pathname.split('/'));

		var collection = new app.collections.Fields();

		// save page model data
		this.data = this.model.toJSON();

		if(id === 'new') {
			this.model = collection.add({});
		} else {
			this.model = collection.add({ _id: id });
			this.model.fetch();
		}

		var bindings = {};

		_.each(this.model.validation, function(value, key) {
			if(/^content/.test(key)) 
				bindings[key] = 'html';
		});

		this.bindings = bindings;
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

			bindings: this.bindings,

			onSuccess: function(model, message, options) {
				console.log('field saved!');
			}
		});
	},
});
