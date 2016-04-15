module.exports = {
  models: {
    Organization: require('./model')
  },
  middleware: {
    organization: require('./middleware')
  },
  pages: require('./pages'),
  routes: require('./routes'),
};
