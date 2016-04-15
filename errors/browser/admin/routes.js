'use strict';

var hello = 'hello';

console.log(hello);
module.exports = {
  'errors': {
    reload: true,
    view: require('./views/errors-page')
  }
};
