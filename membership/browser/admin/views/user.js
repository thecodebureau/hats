module.exports = {
	extends: 'Model',

	events: {
		'click': 'toggle'
	},

	template: 'admin/models/user',

	attach: function() {
		this.app.views.Model.prototype.attach.apply(this, arguments);

		this.elements.$info = this.$('.info');
	},

	toggle: function() {
		if(this.elements.$info.children().length > 0)
			this.elements.$info.toggleClass('visible');
	}

};
