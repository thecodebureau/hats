module.exports = {
	models: {
		Organization: require('./client/models/organization.js')
	},

	routes: {
		'organization': {
			view: 'OrganizationPage',
			reload: true
		}
	},

	views: {
		OrganizationPage: require('./client/admin/views/organization-page')
	}
};
