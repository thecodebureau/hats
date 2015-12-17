var app = require('ridge');

var View = require('ridge/views/page').extend();

_.extend(View.prototype, require('ridge/mixins/active-buttons'), {
	events: {
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

	initialize: function(opts) {
		this.model = new app.models.Organization(this.state.get('organization') || {});

		this.listenTo(this.state, 'change sync cancel', this.setActiveButtons);
	},

	attach: function() {
		var _view = this;

		_view.setActiveButtons();

		if(this.formView) {
			this.stopListening(this.formView);
			this.formView.remove();
		}

		this.formView = new app.views.Form({
			el: this.$('form'),

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

module.exports = View;
