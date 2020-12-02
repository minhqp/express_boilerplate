const fs = require('fs');
const axios = require('axios').default;
const ttsService = require('./tts');

const createAudioByUrl = async (data, teamId, accessToken) => {
  const batchSize = 10;

  let i = 0;
  while (i <= data.length) {
    await Promise.all(
      data.slice(i, i + batchSize).map(async (dt) => {
        let url;
        let dataResponse;
        switch (teamId) {
          case 'team2':
            dataResponse = await ttsService.tts(
              'http://103.141.140.189:9999/tts',
              { inputText: dt.rawOriginContent },
              accessToken,
            );
            url = dataResponse.result.url;
            break;

          default:
            break;
        }
        if (!fs.existsSync(`public/audios/${teamId}`)) {
          fs.mkdirSync(`public/audios/${teamId}`, { recursive: true });
        }

        const writer = fs.createWriteStream(
          `public/audios/${teamId}/${dt.id}-${teamId}.wav`,
        );

        const response = await axios({
          url,
          method: 'GET',
          responseType: 'stream',
        });

        response.data.pipe(writer);
      }),
    );
    i += batchSize;
  }
};

module.exports = { createAudioByUrl };
