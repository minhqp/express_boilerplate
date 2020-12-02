const { default: Axios } = require('axios');
const qs = require('querystring');

const loginTeam = async (url, loginInfo) => {
  const { username, email, password } = loginInfo;
  let body;
  if (
    url === 'http://43.239.223.20:9801/login' ||
    url === 'http://43.239.223.20:9802/login'
  ) {
    body = { username, password };
  } else {
    body = { email, password };
  }

  console.log(body);

  let config;

  if (url === 'http://43.239.223.20:9802/login') {
    config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    body = qs.stringify(body);
  } else {
    config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  const res = await Axios.post(url, body, config);

  const accessToken = res.data.result.access_token;
  console.log({ accessToken });

  return accessToken;
};

module.exports = { loginTeam };
