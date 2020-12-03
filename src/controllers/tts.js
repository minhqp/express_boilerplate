const loginTeamService = require('../services/loginTeam');
const createAudioNyUrlService = require('../services/createAudioByUrl');
const createAudioByBase64Service = require('../services/createAudioByBase64');
const createAudioByWav = require('../services/createAudioByWav');

const tts = async (req, res) => {
  const { email, password, username, teamId, type, testType } = req.body;
  let accessToken;
  switch (teamId) {
    case 'team2':
      accessToken = await loginTeamService.loginTeam(
        'http://103.141.140.189:9999/login',
        { email, password },
      );
      break;
    case 'team3':
      accessToken = await loginTeamService.loginTeam(
        'http://43.239.223.20:9803/login',
        { email, password },
      );
      break;
    case 'team4':
      accessToken = await loginTeamService.loginTeam(
        'https://datngo.pagekite.me/login',
        { email, password },
      );
      break;
    case 'team5':
      accessToken = await loginTeamService.loginTeam(
        'https://innovation-vn.ai/login',
        { email, password },
      );
      break;
    case 'team6':
      accessToken = await loginTeamService.loginTeam(
        'http://texttospeech.theorigin.ai:50068/login',
        { email, password },
      );
      break;
    case 'team7':
      accessToken = await loginTeamService.loginTeam(
        'http://34.64.213.91:8000/login',
        { email, password },
      );
      break;
    case 'team8':
      accessToken = await loginTeamService.loginTeam(
        'http://43.239.223.20:9801/login',
        { username, password },
      );
      break;
    case 'team9':
      accessToken = await loginTeamService.loginTeam(
        'http://43.239.223.20:9802/login',
        { username, password },
      );
      break;
    default:
      break;
  }

  let data;
  switch (testType) {
    case 'mos': data = require('../constants/mos_test.json'); break;
    case 'transcript': data = require('../constants/transcript_test.json');
    default: break;
  }

  console.log(data.length);

  if (type === 'url') {
    await createAudioNyUrlService.createAudioByUrl(data, teamId, accessToken, testType);
  }
  if (type === 'base64') {
    await createAudioByBase64Service.createAudioByBase64(
      data,
      teamId,
      accessToken,
      testType,
    );
  }
  if (type === 'wav') {
    await createAudioByWav.createAudioByWav(data, teamId, accessToken, testType);
  }

  return res.send({ status: 1, result: { accessToken } });
};

module.exports = { tts };
