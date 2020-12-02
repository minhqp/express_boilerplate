const axios = require('axios');

const tts = async (apiUrl, input, accessToken) => {
  const { inputText, voice, rate, outputType } = input;
  const body = { input_text: inputText, voice, rate, output_type: outputType };
  let config;

  if (
    apiUrl === 'http://43.239.223.20:9801/tts' ||
    apiUrl === 'http://43.239.223.20:9802/tts'
  ) {
    config = {
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
      },
    };
  } else if (apiUrl === 'http://34.64.213.91:8000/tts') {
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
  console.log({ apiUrl, input });

  return res.data;
};

module.exports = { tts };
