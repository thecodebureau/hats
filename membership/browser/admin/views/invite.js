module.exports = require('ridge/view').extend({
  template: 'admin/models/invite',

  events: {
    'click button[data-command="delete"]': 'delete'
  },

  delete: function(e) {
    if(confirm('Are you sure you want to delete the invite?')) {
      this.model.destroy();
      this.remove();
    }
  },

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);

    this.listenTo(this.model, 'destroy', this.remove);
  }
});
