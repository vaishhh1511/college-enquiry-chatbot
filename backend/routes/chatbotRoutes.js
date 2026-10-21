const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatbotController');

// POST /api/chat
router.post('/chat', handleChat);

module.exports = router;
