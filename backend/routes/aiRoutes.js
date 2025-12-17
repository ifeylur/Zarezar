const express = require('express');
const router = express.Router();
const { generateDescription, generate } = require('../controllers/aiController');

router.post('/generate-description', generateDescription);
router.post('/generate', generate);

module.exports = router;

