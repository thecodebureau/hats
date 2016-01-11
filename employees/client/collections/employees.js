module.exports = require('ridge/collection').extend({
	model: require('../models/employee'),

	url: '/api/employees'
});
