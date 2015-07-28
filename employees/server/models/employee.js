var _ = require('lodash');

module.exports = function(mongoose, schemas, plugins) {
	var schemaOptions = {
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	};

	var EmployeeSchema = new mongoose.Schema(_.defaults({}, schemas.person), schemaOptions);

	EmployeeSchema.plugin(plugins.base);

	EmployeeSchema.virtual('name').get(function() {
		return this.givenName + ' ' + this.familyName;
	});

	mongoose.model('Employee', EmployeeSchema);
};
