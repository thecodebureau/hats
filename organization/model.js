var mongoose = require('mongoose');

var OrganizationSchema = new mongoose.Schema(require('epiphany/schemas/organization'));

OrganizationSchema.plugin(require('epiphany/plugins/base'));

module.exports = mongoose.model('Organization', OrganizationSchema);
