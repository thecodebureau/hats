'use strict';

module.exports = require('ridge/collection').extend({
  model: require('../models/region'),

  url: '/api/regions'
});
