const { body, validationResult } = require('express-validator');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const apiTypes = {
  LOGIN: 'LOGIN',
};

const validate = (api) => {
  switch (api) {
    case apiTypes.LOGIN:
      return [
        body('email')
          .exists()
          .withMessage('"email" is required')
          .isEmail()
          .withMessage('"email" is invalid'),
        body('password')
          .exists()
          .withMessage('"password" is required')
          .isString()
          .trim(),
      ];
    default:
      return [];
  }
};

const getValidateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(errorCodes.BAD_REQUEST, errors.array().shift().msg);
  }
  next();
};

module.exports = {
  apiTypes,
  validate,
  getValidateResult,
};
