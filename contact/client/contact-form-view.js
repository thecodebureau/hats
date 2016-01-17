var ContactMessageModel = require('./contact-message-model');
var MessageView = require('ridge/views/message');
var FormView = require('ridge/views/form-styling');

var View = require('ridge/view').extend();

_.extend(View.prototype, require('ridge/mixins/observe'), {
	events: {
		'submit form': 'save'
	},

	subviews: {
		form: [ 'form', FormView ]
	},

	elements: {
		button: 'button',
		form: 'form'
	},

	initialize: function(opts) {
		this.model = opts && opts.model || new ContactMessageModel();

		this.bindings = _.mapValues(this.model.validation, function(value, key) {
			var binding = {};

			binding['[name="' + key + '"],[data-name="' + key + '"]'] = {
				both: 'value',
			};

			return binding;
		});
	},

	error: function(model, xhr, options) {
		console.log('error!');
		_.result(this.message, 'remove');

		var resp = xhr.responseJSON;

		console.log(resp);
		this.message = new MessageView({
			message: resp.message || {
				heading: 'Oops',
				body: 'A problem occured.'
			}
		}).enter(this.elements.form, { method: 'prepend' });
	},

	save: function(e) {
		e.preventDefault();
		console.log('saving');

		if(this.model.isValid()) {
			$(document.body).addClass('progress');

			this.elements.button.prop('disabled', true);

			this.model.save(null, {
				error: this.error,
				success: this.success,
				complete: this.complete,
				context: this,
				validate: false
			});
		}
	},

	complete: function() {
		this.elements.button.prop('disabled', false);
		$(document.body).removeClass('progress');
	},

	success: function(model, resp, options) {
		this.form.remove();

		_.result(this.message, 'remove');

		this.message = new MessageView({
			message: resp
		}).enter(this.el);
	},

	attach: function() {
		this.observe({ validate: true });
	},
});

module.exports = View;