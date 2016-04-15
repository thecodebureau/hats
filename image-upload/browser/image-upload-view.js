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
    'basename': {
      '[data-hook="basename"]': 'html',
      'figure img': function($el, value) {
        if(!value) return;

        var ext = this.model.get(this.property ? this.property + '.ext' : 'ext');

        $el.attr('src', '/img/' + value + '-thumb' + ext);
      }
    },
    'ext': {
      '[data-hook="ext"]': 'html'
    },
    'mime': {
      '[data-hook="mime"]': 'html'
    },
    'contentSize': {
      '[data-hook="contentSize"]': 'html'
    },
    'width': {
      '[data-hook="width"]': 'html'
    },
    'height': {
      '[data-hook="height"]': 'html'
    },
    'caption': {
      '[data-name="caption"]': {
        both: 'value'
      }
    }
  },

  initialize: function(options) {
    this.property = options.property;

    this.options = options.imageOptions || {};

    if(this.property)
      this.bindings = _.mapKeys(this.bindings, function (value, key) {
        return this.property + '.' + key;
      }.bind(this));
  },

  attach: function() {
    this.observe({ populate: true, validate: true });
  },


  changeImage: function(e) {
    var self = this,
      reader = new FileReader();

    reader.onload = function(e) {
      var image = new Image();

      image.src = e.currentTarget.result;

      self.elements.uploadFigure
        .children().remove()
        .end().prepend(image)
        .append($('<figcaption>').text('Width: ' + image.width + ' Height: ' + image.height + ' Ratio: ' + image.width / image.height));

      self.elements.uploadButton.prop('disabled', false);
    };

    // Read in the image file as a data URL.
    reader.readAsDataURL(e.currentTarget.files[0]);
  },

  setModel: function(model) {
    this.model = model;

    var elements = this.elements;

    elements.uploadFigure.children().remove();
    elements.fileInput.val(null);
    elements.uploadButton.prop('disabled', true);
    elements.captionInput.prop('disabled', false);
  },

  upload: function() {
    var self = this,
      formData = new FormData(),
      urlEncoded = $.param(this.options),
      elements = this.elements;

    formData.append('image', this.elements.fileInput[0].files[0]);

    $.ajax({
      method: 'POST',
      url: '/admin/image-upload' + (urlEncoded ? '?' + urlEncoded : ''),
      data: formData,
      contentType: false,
      processData: false,
      success: function(res) {
        if(self.property) {
          var obj = {};
          obj[self.property] = res.image;
          self.model.set(obj, { flatten: true });
        } else 
          self.model.set(res.image);

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
