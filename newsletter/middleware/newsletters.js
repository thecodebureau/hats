var Newsletter = require('../models/newsletter');

var create = function (req, res, next) {
  Newsletter.create(req.body, function (err, newsletter) {
    if (err) {
      return next(err);
    }
    res.message = {
      type: 'success',
      heading: 'Meddelandet har skickats och sparats!',
      text: 'Nu finns det ingen återvändo. Meddelandet har sparats i databasen.'
    };
    res.status(201);

    res.data.newsletter = newsletter;

    return next();
  });
};
var findAll = function(req, res, next) {
  Newsletter.find({}).sort('name').exec(function(err, newsletters) {
    if(err) {
      return next(err);
    }
    res.status(200);
    res.data.newsletters = newsletters;
    next();
  });
};
var remove = function(req, res, next) {
  Newsletter.remove({ _id: req.params.id }, function(err) {
    if(err) {
      return next(err);
    }
    res.statusCode = 200;
    res.message = {
      type: 'success',
      heading: 'Emailen har tagits bort.'
    };
    next();
  });
};
var update = function(req, res, next) {
  Newsletter.findOne({ _id: req.params.id }, function(err, newsletter) {
    newsletter.save(function(err){
      if(err) {
        console.error('Error updating Email for Newsletter with _id: ' + req.params.id);
        next(err);
      }
      res.message = {
        type: 'success',
        heading: 'Eposten har uppdaterats',
      };
      res.statusCode = 201;
      next();
    });
  });
};

module.exports = {
  create: create,
  findAll: findAll,
  remove: remove,
  update: update
};
