var app = require('ridge');

module.exports = require('ridge/views/collection').extend({
	events: {
		'click :has(.controls):not(.editing)': function(e) {
			var view = _.findWhere(this.modelViews, { el: e.currentTarget });
			if (view && view.controls) {
				view.controls.edit(e);
				view.$el.addClass('editing');
			}
		}
	},

	initialize: function() {
		this.DefaultModelView = app.views.CrudModel;

		app.views.Collection.prototype.initialize.apply(this, arguments);

		this.listenTo(this.collection, 'edit cancel', function() {
			this.$('.editing').removeClass('editing');
		});
	}
});
