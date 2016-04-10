var mongoose = require('mongoose');

var OrganizationSchema = new mongoose.Schema(require('warepot/schemas/organization'));

OrganizationSchema.plugin(require('warepot/plugins/base'));

module.exports = mongoose.model('Organization', OrganizationSchema);
