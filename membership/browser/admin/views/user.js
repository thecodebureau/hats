/* WARNING!!! THIS IS NOT FUNCTIONAL */

module.exports = require('ridge/view').extend({
	template: 'admin/models/user',

	events: {
		'click': 'toggle'
	},

	elements: {
		info: '.info'
	},

	toggle: function() {
		if(this.elements.info.children().length > 0)
			this.elements.info.toggleClass('visible');
	}
});
