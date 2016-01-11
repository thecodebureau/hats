var PermissionModel = require('../models/permission');

var View = require('ridge/views/page').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
	events: {
		'submit form': 'preventDefault'
	},

	subviews: {
		buttons: [ '.controls', require('./buttons') ],
		imageUpload: [ '.image-upload', require('hats/image-upload/browser/image-upload-view') ],
		spytextFields: [ '[data-spytext]', require('spytext/field'), { multi: true } ],
		form: [ 'form', require('ridge/views/form-styling') ]
	},

	initialize: function(opts) {
		this.model = new PermissionModel(this.state.get('permission') || {});

		// use properties from model validation to set up more bindings.
		// all model validation properties are assumed to be 'value' getter and setter
		this.bindings = _.mapValues(this.model.validation, function(value, key) {
			var binding = {};

			binding['[name="' + key + '"],[data-name="' + key + '"]'] = {
				both: 'value',
			};

			return binding;
		});
	},

	attach: function() {
		this.observe({ validate: true });

		if(!this.model.isNew())
			this.model.validate();
	}
});

module.exports = View;
