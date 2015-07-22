module.exports = {
	model: 'Field',

	url: '/api/fields',

	defaultFilter: {
		_sort: {
			path: 1,
			name: 1
		},
	}
};
