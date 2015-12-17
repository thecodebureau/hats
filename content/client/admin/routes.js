var Router = require('ridge/router');

new Router({
	routes: {
		'content': {
			view: 'ContentPage',
			routes: {
				'content/:id': {
					view: 'FieldPage'
				}
			},
		}
	}
});
