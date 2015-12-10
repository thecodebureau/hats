var app = require('ridge');

var View = require('ridge/view').extend();

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
					if(_view.collection) {
						_view.collection.add(_view.model);
					}

					var path = _.initial(Backbone.history.fragment.split('/')).concat(model.id).join('/');

					app.router.navigate(path, { replace: true });
				}
			});
		}
	},

	initialize: function(opts) {
		// save page model data
		this.data = this.model.toJSON();

		console.log(this.model.get('role'));
		this.model = new app.models.Role(this.model.get('role'));

		this.listenTo(this.model, 'change sync cancel', this.setActiveButtons);
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

			onSuccess: function(model, message, options) {
				console.log('role saved!');
			}
		});
	},
});

module.exports = View;
