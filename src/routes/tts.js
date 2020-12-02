const router = require('express').Router();
const ttsController = require('../controllers/tts');

/* eslint-disable prettier/prettier */
router.post('/tts', ttsController.tts);

/* eslint-enable prettier/prettier */

module.exports = router;
