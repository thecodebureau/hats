var EmployeeModel = require('../../models/employee');

var View = require('ridge/views/page').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
	events: {
		'submit form': 'preventDefault'
	},

	bindings: {
		'description': {
			'[data-name="description"]': 'html'
		}
	},

	subviews: {
		buttons: [ '.controls', require('./employee-page-buttons') ],
		imageUpload: [ '.image-upload', require('hats/image-upload/browser/image-upload-view'), {
			property: 'image',
			imageOptions: {
				type: "employee",
				maxWidth: "1024",
				mediumWidth: "600",
				thumbWidth: "300",
				ratio: "1.61803398875" 
			}
		} ],
		spytextFields: [ '[data-spytext]', require('spytext/field'), { multi: true } ],
		form: [ 'form', require('ridge/views/form-styling') ]
	},

	initialize: function(opts) {
		this.model = new EmployeeModel(this.state.get('employee') || {});

		// use properties from model validation to set up more bindings.
		// all model validation properties are assumed to be 'value' getter and setter
		this.bindings = _.defaults(this.bindings, _.mapValues(this.model.validation, function(value, key) {
			var binding = {};

			binding['[name="' + key + '"],[data-name="' + key + '"]'] = {
				both: 'value',
			};

			return binding;
		}));
	},

	attach: function() {
		this.observe({ validate: true });

		if(!this.model.isNew())
			this.model.validate();
	}
});

module.exports = View;
