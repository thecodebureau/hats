module.exports = {
	models: {
		Organization: require('./client/models/organization.js')
	},

	routes: {
		'organization': {
			view: 'OrganizationPage',
			url: '/admin/organization'
		}
	},

	views: {
		OrganizationPage: require('./client/admin/views/organization-page')
	}
};
