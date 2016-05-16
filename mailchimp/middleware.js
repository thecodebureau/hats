'use strict';

// modules > 3rd party
const superagent = require('superagent');
const _ = require('lodash');

const config = require('./config');

module.exports = function (req, res, next) {
  superagent.post(config.url)
    .send(req.body)
    .set('Authorization', 'Basic ' + new Buffer('anystring:' + config.key).toString('base64'))
    .end((err, response) => {
      if (err) {
        err = response.body.title === 'Member Exists' ? config.errors.conflict : config.errors.server;
        err = _.extend(new Error(err.name), _.omit(err, 'name'));
      } else {
        res.locals.ok = true;
      }

      next(err);
    });
};
