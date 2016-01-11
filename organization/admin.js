module.exports = {
	models: {
		Organization: require('./client/models/organization.js')
	},

	routes: require('./client/admin/routes'),

	views: {
		OrganizationPage: require('./client/admin/views/organization-page')
	}
};
