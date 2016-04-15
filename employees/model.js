var mongoose = require('mongoose');

var schemaOptions = {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
};

var EmployeeSchema = new mongoose.Schema(_.defaults({}, require('mongopot/schemas/person')), schemaOptions);

EmployeeSchema.plugin(require('mongopot/plugins/base'));

EmployeeSchema.virtual('name').get(function() {
  return this.givenName + ' ' + this.familyName;
});

module.exports = mongoose.model('Employee', EmployeeSchema);
