const express = require('express');
const { handleSupportRequest } = require('../controllers/supportController');

const router = express.Router();

// Rota POST para receber a mensagem de suporte
router.post('/support', handleSupportRequest);

module.exports = router;
