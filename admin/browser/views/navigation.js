module.exports = require('ridge/view').extend({
	initialize: function() {
		this.listenTo(Backbone.history, 'route', this.onRouteChange);
	},

	onRouteChange: function(route, name, params) {
		this.$('li.current').removeClass('current');

		var path = Backbone.history.fragment.split('?')[0].split('/');

		path[0] = path[0] || 'dashboard';

		var $ref = this.$el.children('ul');

		while($ref.length > 0 && path.length > 0) {
			var $el = $ref.children('.' + path.shift());

			$el.addClass('current');

			$ref = $el.children('ul');
		}
	}
});
