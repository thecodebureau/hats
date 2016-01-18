var View = require('ridge/view').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
	events: {
		'click button[data-command="create"]': 'create',
		'click button[data-command="reset"]': 'reset',
		'click button[data-command="save"]': 'save',
	},
	
	bindings: {
		'_id': { 
			'button[data-command="create"]': 'booleanClass:hidden:visible',
			'button[data-command="save"]': 'booleanClass:visible:hidden'
		},
	},

	save: function() {
		this.model.save();
	},

	reset: function() {
		if(confirm('Are you sure you want to reset?')) {
			this.model.reset({ validate: true });
			if(!this.model.isNew())
				this.model.validate();
		}
	},

	create: function() {
		this.model.save(null, {
			success: function(model, response, opts) {
				var path = _.initial(Backbone.history.fragment.split('/')).concat(model.id).join('/');

				Backbone.history.navigate(path, { replace: true });
			}
		});
	},

	attach: function() {
		this.listenTo(this.model, 'change sync', function() {
			this.$('button').prop('disabled', !this.model.isDirty());
		});

		this.observe({ populate: true });
	}
});

module.exports = View;
