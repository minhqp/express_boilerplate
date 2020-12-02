const { default: Axios } = require('axios');
const qs = require('querystring');

const loginTeam = async (url, loginInfo) => {
  const { username, email, password } = loginInfo;
  let body;
  if (
    url === 'http://localhost:8881/login' ||
    url === 'http://localhost:8882/login'
  ) {
    body = { username, password };
  } else {
    body = { email, password };
  }

  let config;

  if (url === 'http://localhost:8882/login') {
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
