var MessageView = require('ridge/views/message');

module.exports = require('ridge/view').extend({
	events: {
		'submit form': 'submit',
	},

	attach: function() {
		if($.fn.placeholder)
			this.$('input').placeholder();
	},

	submit: function(e) {
		e.preventDefault();

		var self = this, 
			$form = $(e.currentTarget),
			button = $form.find('button')[0];

		if($form.valid()) {
			button.disabled = true;
			$(document.body).addClass('progress');

			$.ajax({
				method: 'POST',
				url: $form.attr('action'),
				data: $form.JSONify(),
				dataType: 'json',
				success: function(message) {
					if(self.message)
						self.message.remove();

					self.message = new MessageView({
						message: message
					});

					$form.remove();

					self.message.enter(self.el);
				}, 
				error: function(xhr) {
					if(self.message)
						self.message.remove();

					self.message = new MessageView({
						message: xhr.responseJSON
					});

					self.message.enter($form, 'before');
				},

				complete: function() {
					button.disabled = false;
					$(document.body).removeClass('progress');
				}
			});
		}
	}
});
