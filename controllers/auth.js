const authService = require('../services/auth');

function login(req, res) {
  const { email, password } = req.body;
  const accessToken = authService.login(email, password);
  return res.send({ status: 1, result: { accessToken } });
}

function verifyAccessToken(req, res) {
  const { accessToken } = req;
  const { user } = authService.verifyAccessToken(accessToken);
  res.send({ status: 1, result: { user } });
}
module.exports = { login, verifyAccessToken };
