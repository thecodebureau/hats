var EmployeeView = require('./employee');
var Employees = require('../../collections/employees');

module.exports = require('ridge/views/page').extend({
	elements: {
		container: '.collection.container'
	},

	subviews: {
		paginations: [ '.pagination', require('ridge/views/pagination'), { template: 'admin/pagination', multi: true } ],
		search: [ '.search', require('ridge/views/search') ]
	},

	initialize: function(options) {
		this.collection = new Employees();

		this.listenTo(this.collection, 'reset', this.reset);

		this.listenTo(this.state, 'change:query', this.fetch);
	},

	fetch: function(state, query) {
		this.collection.fetch({ reset: true, data: query });
	},

	attach: function() {
		this.collection.reset({
			totalCount: this.state.get('totalCount'),
			employees: this.state.get('employees')
		}, { parse: true });

	},

	reset: function (models, options) {
		_.invokeMap(this.modelViews, 'remove');

		this.modelViews = [];

		models.each(this.renderModel.bind(this));
	},

	renderModel: function(model) {
		this.modelViews.push(new EmployeeView({
			model: model,
			data: this.data,
		}).enter(this.elements.container));
	},
});
