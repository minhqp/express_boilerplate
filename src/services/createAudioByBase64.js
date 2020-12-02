const fs = require('fs');
const ttsService = require('./tts');

const createAudioByBase64 = async (data, teamId, accessToken, testType) => {
  const batchSize = 10;

  let i = 0;
  while (i <= data.length) {
    await Promise.all(
      data.slice(i, i + batchSize).map(async (dt) => {
        let base64data;
        let dataResponse;
        switch (teamId) {
          case 'team5':
            dataResponse = await ttsService.tts(
              'https://innovation-vn.ai/tts',
              { inputText: dt.rawOriginContent },
              accessToken,
            );
            base64data = dataResponse.result.data;
            break;
          case 'team6':
            dataResponse = await ttsService.tts(
              'http://texttospeech.theorigin.ai:50068/tts',
              { inputText: dt.rawOriginContent },
              accessToken,
            );
            base64data = dataResponse.result.data;
            break;
          case 'team8':
            dataResponse = await ttsService.tts(
              'http://43.239.223.20:9801/tts',
              { inputText: dt.rawOriginContent },
              accessToken,
            );
            base64data = dataResponse.result.data;
            break;
          case 'team9':
            dataResponse = await ttsService.tts(
              'http://43.239.223.20:9802/tts',
              { inputText: dt.rawOriginContent },
              accessToken,
            );
            base64data = dataResponse.result.data;
            break;
          default:
            break;
        }

        if (!fs.existsSync(`public/audios/${testType}_${teamId}`)) {
          fs.mkdirSync(`public/audios/${testType}_${teamId}`, { recursive: true });
        }

        fs.writeFileSync(
          `public/audios/${testType}_${teamId}/${dt.id}-${teamId}.wav`,
          Buffer.from(
            base64data.replace('data:audio/wav;base64', ''),
            'base64',
          ),
        );
      }),
    );
    i += batchSize;
  }

  console.log('Synthesis DONE');
};

module.exports = { createAudioByBase64 };
