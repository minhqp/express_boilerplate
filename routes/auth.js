const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const {
  apiTypes,
  validate,
  getValidateResult,
} = require('../middlewares/validate');
const { auth } = require('../middlewares/auth');
const authController = require('../controllers/auth');

/* eslint-disable prettier/prettier */
router.post('/auths/register', asyncMiddleware(authController.register));
router.post('/auths/login', validate(apiTypes.LOGIN), getValidateResult, asyncMiddleware(authController.login));
router.get('/auths/verify', auth, asyncMiddleware(authController.verifyAccessToken));
/* eslint-enable prettier/prettier */

module.exports = router;
