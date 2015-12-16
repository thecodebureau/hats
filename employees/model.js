var mongoose = require('mongoose');

var schemaOptions = {
	toObject: { virtuals: true },
	toJSON: { virtuals: true }
};

var EmployeeSchema = new mongoose.Schema(_.defaults({}, require('epiphany/schemas/person')), schemaOptions);

EmployeeSchema.plugin(require('epiphany/plugins/base'));

EmployeeSchema.virtual('name').get(function() {
	return this.givenName + ' ' + this.familyName;
});

module.exports = mongoose.model('Employee', EmployeeSchema);
