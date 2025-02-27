const express = require("express");
const { sendMessage } = require("../controllers/messageController");
const limiter = require("../middleware/contactRateLimiter");

const router = express.Router();

router.post("/send", limiter, sendMessage);

module.exports = router;
