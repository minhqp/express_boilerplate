const authService = require('../services/auth');

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const user = await authService.register({ email, name, password });
  return res.send({ status: 1, result: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const accessToken = await authService.login(email, password);
  return res.send({ status: 1, result: { accessToken } });
};

const verifyAccessToken = async (req, res) => {
  const { accessToken } = req;
  const { user } = await authService.verifyAccessToken(accessToken);
  res.send({ status: 1, result: { user } });
};

module.exports = { register, login, verifyAccessToken };
