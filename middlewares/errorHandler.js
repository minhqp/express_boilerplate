const snakecaseKeys = require('snakecase-keys');
const codes = require('../errors/code');
const getErrorMessage = require('../errors/message');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let statusCode = err.code;
  let { message } = err;
  const code = err.code || codes.INTERNAL_SERVER_ERROR;
  switch (code) {
    case codes.BAD_REQUEST:
      message = message || 'Bad Request';
      break;
    case codes.UNAUTHORIZED:
      message = 'Unauthorized';
      break;
    case codes.FORBIDDEN:
      message = 'Forbidden';
      break;
    case codes.NOT_FOUND:
      message = 'Not Found';
      break;
    case codes.TOO_MANY_REQUESTS:
      message = 'Too many requests';
      break;
    case codes.INTERNAL_SERVER_ERROR:
      statusCode = codes.INTERNAL_SERVER_ERROR;
      message = message || 'Something went wrong';
      break;
    default:
      message = message || getErrorMessage(code);
      statusCode = 200;
  }
  return res.status(statusCode).send(
    snakecaseKeys(
      code
        ? {
            status: 0,
            code,
            message,
          }
        : {
            status: 0,
            message,
          },
    ),
  );
}

module.exports = errorHandler;
