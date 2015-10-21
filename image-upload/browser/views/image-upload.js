var View = require('ridge/view').extend();


_.extend(View.prototype, require('ridge/mixins/observe'), {
	events: {
		'change [type="file"]': 'changeImage',
		'click button[data-command="upload"]': 'upload'
	},

	elements: {
		uploadButton: 'button[data-command="upload"]',
		fileInput: 'input[type="file"]',
		captionInput: 'input[data-hook="image.caption"]',
		uploadFigure: '.upload figure',
		currentFigure: '.current figure'
	},

	bindings: {
		'image.basename': 'html',
		'image.ext': 'html',
		'image.thumbUrlPath': 'src',
		'image.mime': 'html',
		'image.contentSize': 'html',
		'image.width': 'html',
		'image.height': 'html',
		'image.caption': 'value'
	},

	attach: function() {
		this.property = this.$el.attr('property');

		this.options = _.compact(this.$el.attr('data-options').split(',').map(function(val) {
			var arr = _.compact(val.split('='));
			return arr.length > 1 ? arr : null;
		}));
		
		this.observe();
	},


	changeImage: function(e) {
		var view = this,
			reader = new FileReader();

		reader.onload = function(e) {
			var image = new Image(),
				caption = 'Width: ' + image.width + ' Height: ' + image.height + ' Ratio: ' + image.width / image.height;

			image.src = e.currentTarget.result;

			view.elements.uploadFigure
				.children().remove()
				.end().prepend(image)
				.append($('<figcaption>').text(caption));

			view.elements.uploadButton.prop('disabled', false);
		};

		// Read in the image file as a data URL.
		reader.readAsDataURL(e.currentTarget.files[0]);
	},

	setModel: function(model) {
		var _view = this;

		_view.model = model;

		var elements = this.elements;

		elements.uploadFigure.children().remove();
		elements.fileInput.val(null);
		elements.uploadButton.prop('disabled', true);
		elements.captionInput.prop('disabled', false);
	},

	upload: function() {
		var view = this,
			formData = new FormData(),
			urlEncoded = this.options.map(function(arr) {
				return arr.join('=');
			}).join('&'),
			elements = this.elements;

		formData.append('image', this.elements.fileInput[0].files[0]);

		$.ajax({
			method: 'POST',
			url: '/admin/image-upload' + (urlEncoded ? '?' + urlEncoded : ''),
			data: formData,
			contentType: false,
			processData: false,
			success: function(res) {
				if(view.property)
					view.model.set(view.property, res.image);
				else 
					view.model.set(res.image);

				elements.fileInput.val(null);
				elements.uploadButton.prop('disabled', true);
				elements.uploadFigure.children().remove();
				elements.captionInput.prop('disabled', false);
			},
			error: function(xhr, statusText, error) {

			}
		});
	}
});

module.exports = View;
