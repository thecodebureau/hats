module.exports = {
  models: {
    Organization: require('./browser/models/organization.js')
  },

  routes: require('./browser/admin/routes'),

  views: {
    OrganizationPage: require('./browser/admin/views/organization-page')
  }
};
