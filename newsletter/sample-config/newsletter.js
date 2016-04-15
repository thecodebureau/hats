module.exports = {
  error: {
    409: {
      type: 'error',
      heading: 'Conflict',
      body: 'The email has already been added'
    },

    default: {
      type: 'error',
      heading: 'Error',
      body: 'An error occured. If the problem persists, please contact an administrator.'
    }
  },

  success: {
    type: 'success',
    heading: 'Added',
    body: 'The email address has been added.'
  }
};
