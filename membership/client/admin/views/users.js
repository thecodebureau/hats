/* WARNING!!! THIS IS NOT FUNCTIONAL */

var UsersCollection = require('../collections/users');

module.exports = require('ridge/view').extend({
	initialize: function() {
		this.collection = new UsersCollection();
	}
});
