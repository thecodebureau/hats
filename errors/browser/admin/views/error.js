'use strict';

module.exports = require('ridge/view').extend({
  template: 'admin/models/error',

  elements: {
    info: '.info'
  },

  events: {
    'click': 'toggle',
    'click button': function (e) {
      e.preventDefault();
      e.stopPropagation();
    },
    'click button[data-command="publish"]': 'publish',
    'click button[data-command="unpublish"]': 'unpublish',
    'click button[data-command="delete"]': 'delete'
  },

  initialize: function (options) {
    this.listenTo(this.model, 'destroy', this.remove);
  },

  delete: function (e) {
    this.model.destroy();
    this.remove();
  },

  toggle: function () {
    if (this.elements.info.children().length > 0)
      this.elements.info.toggleClass('visible');
  }
});
