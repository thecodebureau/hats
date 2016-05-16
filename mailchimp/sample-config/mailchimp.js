'use strict';

module.exports = {
  url: 'https://us11.api.mailchimp.com/3.0/lists/LIST_ID/members/',
  key: 'a-super-secret-key',
  errors: {
    conflict: {
      status: 409,
      name: 'Conflict',
      message: 'The email has already been added'
    },

    server: {
      statusCode: 500,
      name: 'Error',
      message: 'An error occured. If the problem persists, please contact an administrator.'
    }
  }
};
