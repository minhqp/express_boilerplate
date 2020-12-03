const fs = require('fs');
const { toBuffer } = require('../utils/toBuffer');
const ttsService = require('./tts');

const createAudioByWav = async (data, teamId, accessToken, testType) => {
  const batchSize = 10;

  let i = 0;
  while (i <= data.length) {
    await Promise.all(
      data.slice(i, i + batchSize).map(async (dt) => {
        let dataResponse;
        switch (teamId) {
          case 'team3':
            dataResponse = await ttsService.tts(
              'http://43.239.223.20:9803/tts',
              {
                inputText: dt.rawOriginContent,
                outputType: 'wav',
              },
              accessToken,
            );
            break;

          case 'team4':
            dataResponse = await ttsService.tts(
              'https://datngo.pagekite.me/tts',
              {
                inputText: dt.rawOriginContent,
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
        if (!fs.existsSync(`public/audios/${testType}_${teamId}`)) {
          fs.mkdirSync(`public/audios/${testType}_${teamId}`, { recursive: true });
        }

        console.log({ dataResponse });

        const wavBuffer = toBuffer(dataResponse);

        fs.writeFileSync(
          `public/audios/${testType}_${teamId}/${dt.id}-${teamId}.wav`,
          wavBuffer,
        );
      }),
    );
    i += batchSize;
  }

  console.log('Synthesis DONE');
};

module.exports = { createAudioByWav };
