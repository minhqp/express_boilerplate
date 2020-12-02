const axios = require('axios');

const tts = async (apiUrl, input, accessToken) => {
  const { inputText, voice, rate, outputType } = input;
  const body = { input_text: inputText, voice, rate, output_type: outputType };
  let config;

  if (
    apiUrl === 'http://localhost:8881/tts' ||
    apiUrl === 'http://localhost:8882/tts'
  ) {
    config = {
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
      },
    };
  }
  if (apiUrl === 'http://34.64.213.91:8000/tts') {
    config = {
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
      responseType: 'arraybuffer',
    };
  } else {
    config = {
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
    };
  }

  const res = await axios.post(apiUrl, body, config);

  return res.data;
};

module.exports = { tts };
