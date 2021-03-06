'use strict';

module.exports = require('ridge/view').extend({
  template: 'admin/models/region',

  events: {
    'click button[data-command="publish"]': 'publish',
    'click button[data-command="unpublish"]': 'unpublish',
    'click button[data-command="delete"]': 'delete'
  },

  delete: function (e) {
    if (confirm('Are you sure you want to delete the region?')) {
      this.model.destroy();
      this.remove();
    }
  },

  unpublish: function (e) {
    this.model.save({ datePublished: null }, { patch: true, wait: true });
  },

  publish: function (e) {
    this.model.save({ datePublished: new Date() }, { patch: true, wait: true });
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);

    this.listenTo(this.model, 'destroy', this.remove);
  }
});
