'use strict';

const mw = require('./middleware');

module.exports = [
  [ '/api/newsletter-emails', 'post', [ mw ] ],
];
