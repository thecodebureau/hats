var app = require('ridge');

module.exports = require('ridge/view').extend({
	initialize: function(opts) {
		var id = _.last(window.location.pathname.split('/'));

		var collection = new app.collections.Fields();

		this.data = this.model.toJSON();
		console.log(this.data);

		if(id === 'new') {
			this.model = collection.add({});
		} else {
			this.model = collection.add({ _id: id });
			this.model.fetch();
		}
	},

	attach: function() {
		this.formView = new app.views.CrudForm({ 
			el: this.$('.form'),
			model: this.model,
			bindings: {
				'name': {
					type: 'value',
					hook: 'name'
				},
				'content': {
					type: 'html',
					hook: 'content'
				},
				'radio': {
					type: 'value',
					hook: 'radio'
				},
				'check': {
					type: 'value',
					hook: 'check'
				},
				'path': {
					type: 'value',
					hook: 'path'
				}
			}
		});
	},
});
