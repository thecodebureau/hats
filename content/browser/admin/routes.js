module.exports = {
  'content': {
    view: require('./views/content-page'),
    reload: true,
    routes: {
      ':id': {
        view: require('./views/field-page'),
        reload: true
      }
    }
  }
};
