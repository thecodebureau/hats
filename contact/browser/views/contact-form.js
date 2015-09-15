module.exports = {
	events: {
		'submit form': 'submit',
	},

	attach: function() {
		if($.fn.placeholder)
			this.$('input').placeholder();
	},

	submit: function(e) {
		e.preventDefault();

		var _view = this, 
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
					if(_view.messageView)
						_view.messageView.remove();

					_view.messageView = new _view.app.views.Message({
						message: message
					});

					$form.remove();

					_view.messageView.enter(_view.el);
				}, 
				error: function(xhr) {
					if(_view.messageView)
						_view.messageView.remove();

					_view.messageView = new _view.app.views.Message({
						message: xhr.responseJSON
					});

					_view.messageView.enter($form, 'before');
				},

				complete: function() {
					button.disabled = false;
					$(document.body).removeClass('progress');
				}
			});
		}
	}
};
