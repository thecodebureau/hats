'use strict';

module.exports = {
  'regions': {
    view: require('./views/regions-page'),
    reload: true,
    routes: {
      ':id': {
        view: require('./views/region-page'),
        reload: true
      }
    }
  }
};
