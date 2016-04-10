var mongoose = require('mongoose');

var OrganizationSchema = new mongoose.Schema(require('mongopot/schemas/organization'));

OrganizationSchema.plugin(require('mongopot/plugins/base'));

module.exports = mongoose.model('Organization', OrganizationSchema);
