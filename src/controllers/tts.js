const loginTeamService = require('../services/loginTeam');
const data = require('../constants/data_test.json');
const createAudioNyUrlService = require('../services/createAudioByUrl');
const createAudioByBase64Service = require('../services/createAudioByBase64');
const createAudioByWav = require('../services/createAudioByWav');

const tts = async (req, res) => {
  const { email, password, username, teamId, type } = req.body;
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
        'http://dfb687505e21.ngrok.io/login',
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
        'http://localhost:8881/login',
        { username, password },
      );
      break;
    case 'team9':
      accessToken = await loginTeamService.loginTeam(
        'http://localhost:8882/login',
        { username, password },
      );
      break;
    default:
      break;
  }

  if (type === 'url') {
    await createAudioNyUrlService.createAudioByUrl(data, teamId, accessToken);
  }
  if (type === 'base64') {
    await createAudioByBase64Service.createAudioByBase64(
      data,
      teamId,
      accessToken,
    );
  }
  if (type === 'wav') {
    await createAudioByWav.createAudioByWav(data, teamId, accessToken);
  }

  return res.send({ status: 1, result: { accessToken } });
};

module.exports = { tts };
