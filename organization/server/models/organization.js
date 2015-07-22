
module.exports = function(mongoose, schemas, plugins) {
	var OrganizationSchema = new mongoose.Schema(schemas.organization);

	OrganizationSchema.plugin(plugins.base);

	mongoose.model('Organization', OrganizationSchema);
};
