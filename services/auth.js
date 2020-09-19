const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

// Demo user and accessToken
const USER = {
  email: 'user@gmail.com',
  password: 'random_password',
  name: 'Sergio Busquets',
};
const ACCESS_TOKEN = 'access_token';

function generateAccessToken() {
  return ACCESS_TOKEN;
}

function login(email, password) {
  if (email !== USER.email && password !== USER.password)
    throw new CustomError(errorCodes.BAD_REQUEST);
  const accessToken = generateAccessToken();
  return accessToken;
}

function verifyAccessToken(accessToken) {
  if (accessToken !== ACCESS_TOKEN)
    throw new CustomError(errorCodes.UNAUTHORIZED);

  return { user: USER };
}

module.exports = { login, verifyAccessToken };
