
var app = require('ridge');

module.exports = require('ridge/view').extend({
	initialize: function(opts) {
		var _view = this;

		this.data = this.model.toJSON();

		this.model = new app.models.Organization();

		this.model.fetch();
	},

	attach: function() {
		this.formView = new app.views.CrudForm({ 
			el: this.$('.form'),
			model: this.model,
			bindings: {
				'name': 'value',
				'legalName': 'value',
				'email': 'value',
				'telephone': 'value',
				'address.streetAddress': 'value',
				'address.postalCode': 'value',
				'address.addressLocality': 'value',
				'address.addressRegion': 'value',
				'address.addressCountry': 'value'
			}
		});
	},
});
