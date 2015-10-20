var app = require('ridge');

View = require('ridge/view').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
	events: {
		'submit': 'preventDefault'
	},

	subviews: {
		SpytextField: '[data-spytext]',
		ImageUpload: '.image-upload',
		ModelControls: '.controls'
	},

	bindings: {
		'givenName': 'value',
		'familyName': 'value',
		'email': 'value',
		'telephone': 'value',
		'jobTitle': 'value',
		'address.streetAddress': 'value',
		'address.postalCode': 'value',
		'address.addressLocality': 'value',
		'address.addressRegion': 'value',
		'address.addressCountry': 'value',
		'description': 'html'
	},

	initialize: function(opts) {
		var id = _.last(window.location.pathname.split('/'));

		var collection = new app.collections.Employees();

		// save page model data
		this.data = this.model.toJSON();

		if(id === 'new') {
			this.model = collection.add({});
		} else {
			this.model = collection.add({ _id: id });
			this.model.fetch();
		}
	},

	attach: function() {
		this.observe();
	},
});

module.exports = View;
