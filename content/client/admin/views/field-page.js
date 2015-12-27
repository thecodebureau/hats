var app = require('ridge');

var View = require('ridge/views/page').extend();

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

		if(this.model.isValid()) {
			this.model.save(null, {
				success: function(model, response, opts) {
					var path = _.initial(Backbone.history.fragment.split('/')).concat(model.id).join('/');

					Backbone.history.navigate(path, { replace: true });
				}
			});
		}
	},

	initialize: function(opts) {
		var _view = this,
			collection = new app.collections.Fields();

		if(_view.state.get('languages'))
			_view.data.getContent = function(chunk, context, bodies, params) {
				return chunk.write(context.get('content.' + context.get('iso')));
			};

		_view.model = new app.models.Field(_view.state.get('field') || {});

		_view.listenTo(_view.model, 'change sync cancel', _view.setActiveButtons);

		_view.formBindings = {};

		_.each(this.model.validation, function(value, key) {
			if(/^content/.test(key)) 
				_view.formBindings[key] = 'html';
		});
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
				SpytextField: '[data-spytext]'
			},

			model: this.model,

			bindings: this.formBindings,

			onSuccess: function(model, message, options) {
				console.log('field saved!');
			}
		});
	},
});

module.exports = View;
