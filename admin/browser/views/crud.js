var app = require('ridge');

module.exports = require('ridge/view').extend({
	attach: function() {
		var collectionName = this.$el.data('collection');

		this.collection = new app.collections[collectionName]();

		this.formView = new app.views.Form({
			el: this.$('.form'),
			template: 'admin/models/' + this.collection.modelName.toSpinalCase() + '-form',
			collection: this.collection
		});

		this.collectionView = new app.views.CrudCollection({
			el: this.$('.collection'),
			template: 'admin/models/' + this.collection.name.toSpinalCase(),
			collection: this.collection
		});
	}
});
