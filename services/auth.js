const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const userDao = require('../daos/user');
const { generateRandomString } = require('../utils/random');
const { JWT_SECRET_KEY, JWT_EXPIRES_TIME } = require('../configs');

async function generateAccessToken(userId) {
  const accessToken = await jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
  return accessToken;
}

async function login(email, password) {
  const user = await userDao.findUser({ email });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  const isCorrectPassword = await compareBcrypt(password, user.password);
  if (!isCorrectPassword) throw new CustomError(errorCodes.WRONG_PASSWORD);

  const userId = user._id;
  const accessToken = await generateAccessToken(userId);
  return accessToken;
}

async function verifyAccessToken(accessToken) {
  const data = await jwt.verify(accessToken, JWT_SECRET_KEY);
  const { userId } = data;

  const user = await userDao.findUser(userId);
  return user;
}

function generateSalt(rounds) {
  return bcrypt.genSaltSync(rounds);
}

async function hashBcrypt(text, salt) {
  const hashedBcrypt = new Promise((resolve, reject) => {
    bcrypt.hash(text, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedBcrypt;
}

async function compareBcrypt(data, hashed) {
  const isCorrect = await new Promise((resolve, reject) => {
    bcrypt.compare(data, hashed, (err, same) => {
      if (err) reject(err);
      resolve(same);
    });
  });
  return isCorrect;
}

async function register({ email, name, password }) {
  const salt = generateSalt(10);
  password = password || generateRandomString(16);
  password = await hashBcrypt(password, salt);

  const user = await userDao.createUser({ email, name, password });
  return user;
}

module.exports = { login, register, verifyAccessToken };
