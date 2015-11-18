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
		var collection = new app.collections.Employees();

		// save page model data
		this.data = this.model.toJSON();

		var employee = this.model.get('employee');

		if(!employee) {
			employee = {};
		}

		this.model = collection.add(employee);

		this.listenTo(this.model, 'change sync cancel', this.setActiveButtons);
	},

	attach: function() {
		this.setActiveButtons();

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
				'description': {
					hook: 'description',
					type: 'html'
				}
			},

			onSuccess: function(model, message, options) {
				console.log('field saved!');
			}
		});
	},
});

module.exports = View;
