var app = require('ridge');

module.exports = require('ridge/view').extend({
	initialize: function(opts) {
		console.log('init init');
		var id = _.last(window.location.pathname.split('/'));

		var collection = new app.collections.Employees();

		this.data = this.model.toJSON();

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
				'givenName': {
					type: 'value',
					hook: 'givenName'
				}
			}
		});
	},
});