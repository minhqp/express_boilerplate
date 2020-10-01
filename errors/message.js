const codes = require('./code');

function getErrorMessage(code) {
  switch (code) {
    case codes.USER_NOT_FOUND:
      return 'User is not found';
    case codes.WRONG_PASSWORD:
      return 'Wrong password';
    default:
      return null;
  }
}

module.exports = getErrorMessage;
