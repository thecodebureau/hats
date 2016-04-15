var path = require('path');

module.exports = {
  middleware: {
    errors: require('./middleware')
  },
  pages: require('./pages'),
  routes: require('./routes')
};
