const express = require('express');
const { sendMessage } = require('../controllers/messageController');
const limiter = require('../middleware/contactRateLimiter');
const honeypotFilter = require('../middleware/honeypotFilter');

const router = express.Router();

router.post('/send', honeypotFilter, limiter, sendMessage);

module.exports = router;
