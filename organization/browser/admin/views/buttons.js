var View = require('ridge/view').extend();

_.extend(View.prototype, {
  events: {
    'click button[data-command="reset"]': 'reset',
    'click button[data-command="save"]': 'save',
  },
  
  save: function() {
    this.model.save();
  },

  reset: function() {
    if(confirm('Are you sure you want to reset?')) {
      this.model.reset({ validate: true });
      if(!this.model.isNew())
        this.model.validate();
    }
  },

  attach: function() {
    this.listenTo(this.model, 'change sync', function() {
      this.$('button').prop('disabled', !this.model.isDirty());
    });
  }
});

module.exports = View;
