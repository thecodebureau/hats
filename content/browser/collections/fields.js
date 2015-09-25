module.exports = require('ridge/collection').extend({
	model: 'Field',

	url: '/api/fields',

	defaultFilter: {
		_sort: {
			path: 1,
			name: 1
		},
	}
});
