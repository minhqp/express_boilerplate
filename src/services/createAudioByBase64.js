const fs = require('fs');
const ttsService = require('./tts');

const createAudioByBase64 = async (data, teamId, accessToken) => {
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
              'http://localhost:8881/tts',
              { inputText: dt.rawOriginContent },
              accessToken,
            );
            base64data = dataResponse.result.data;
            break;
          case 'team9':
            dataResponse = await ttsService.tts(
              'http://localhost:8882/tts',
              { inputText: dt.rawOriginContent },
              accessToken,
            );
            base64data = dataResponse.result.data;
            break;
          default:
            break;
        }

        if (!fs.existsSync(`public/audios/${teamId}`)) {
          fs.mkdirSync(`public/audios/${teamId}`, { recursive: true });
        }

        fs.writeFileSync(
          `public/audios/${teamId}/${dt.id}-${teamId}.wav`,
          Buffer.from(
            base64data.replace('data:audio/wav;base64', ''),
            'base64',
          ),
        );
      }),
    );
    i += batchSize;
  }
};

module.exports = { createAudioByBase64 };
