module.exports = function(app) {
	return Bassline.FormView.extend({
		Model: require('../../models/news-article'),

		template: 'admin/partials/news-article-form',

		submit: function(e) {
			e.preventDefault();
		}
	});
};
