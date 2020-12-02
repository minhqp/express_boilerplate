const fs = require('fs');
const { toBuffer } = require('../utils/toBuffer');
const ttsService = require('./tts');

const createAudioByWav = async (data, teamId, accessToken) => {
  const batchSize = 10;

  let i = 0;
  while (i <= 0) {
    await Promise.all(
      data.slice(i, i + batchSize).map(async (dt) => {
        let dataResponse;
        switch (teamId) {
          case 'team3':
            dataResponse = await ttsService.tts(
              'http://dfb687505e21.ngrok.io/tts',
              {
                inputText: dt.rawOriginContent,
                outputType: 'wav',
              },
              accessToken,
            );
            break;

          case 'team7':
            dataResponse = await ttsService.tts(
              'http://34.64.213.91:8000/tts',
              {
                inputText: dt.rawOriginContent,
                voice: 'vlsp',
                outputType: 'wav',
              },
              accessToken,
            );
            break;

          default:
            break;
        }
        if (!fs.existsSync(`public/audios/${teamId}`)) {
          fs.mkdirSync(`public/audios/${teamId}`, { recursive: true });
        }

        console.log({ dataResponse });

        const wavBuffer = toBuffer(dataResponse);

        fs.writeFileSync(
          `public/audios/${teamId}/${dt.id}-${teamId}.wav`,
          wavBuffer,
        );
      }),
    );
    i += batchSize;
  }
};

module.exports = { createAudioByWav };
