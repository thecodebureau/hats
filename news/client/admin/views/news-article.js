module.exports = function(app) {
	return Bassline.ModelView.extend({
		
		// the template for the view. Shold be the path to template relative to [project-root]/server/templates/, without .dust extension
		template: 'admin/partials/news-article',

	});
};
