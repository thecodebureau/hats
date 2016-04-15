var EmployeePage = require('./browser/admin/views/employee-page');
var EmployeesPage = require('./browser/admin/views/employees-page');

module.exports = {
  collections: {
    Employees: require('./browser/collections/employees'),
  },

  models: {
    Employee: require('./browser/models/employee'),
  },

  routes: require('./browser/admin/routes'),

  views: {
    EmployeePage: EmployeePage,
    EmployeesPage: EmployeesPage,
    Employee: require('./browser/admin/views/employee'),
  }
};
