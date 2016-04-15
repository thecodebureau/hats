var mw = require('./middleware');

module.exports = [ {
  title: 'Organization',
  middleware: mw.get,
  template: 'admin/pages/organization'
} ];
