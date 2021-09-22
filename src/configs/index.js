const { A_WEEK } = require('../constants');
const { formatNumber } = require('../utils/number');

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  PEPPER: process.env.PEPPER,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_TIME: formatNumber(process.env.JWT_EXPIRES_TIME, A_WEEK),
};
