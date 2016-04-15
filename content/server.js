module.exports = {
  models: {
    Field: require('./model')
  },
  middleware: {
    fields: require('./middleware'),
  },
  pages: require('./pages'),
  routes: require('./routes')
};
