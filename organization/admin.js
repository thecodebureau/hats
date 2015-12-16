module.exports = {
	models: {
		Organization: require('./client/models/organization.js')
	},

	views: {
		OrganizationPage: require('./client/admin/views/organization-page')
	}
};
