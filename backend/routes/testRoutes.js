const express = require('express');
const router = express.Router();

// Test endpoint to check if OpenAI API key is configured
router.get('/test-openai-key', (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return res.json({
      status: 'missing',
      message: 'OPENAI_API_KEY is not set in environment variables',
      instructions: [
        '1. Open backend/.env file',
        '2. Add: OPENAI_API_KEY=your_api_key_here',
        '3. Restart the server'
      ]
    });
  }
  
  if (!apiKey.trim()) {
    return res.json({
      status: 'empty',
      message: 'OPENAI_API_KEY is set but empty',
      instructions: [
        '1. Open backend/.env file',
        '2. Make sure OPENAI_API_KEY has a value',
        '3. Restart the server'
      ]
    });
  }
  
  // Don't expose the full key, just show first and last few characters
  const maskedKey = apiKey.length > 10 
    ? `${apiKey.substring(0, 7)}...${apiKey.substring(apiKey.length - 4)}`
    : '***';
  
  return res.json({
    status: 'configured',
    message: 'OPENAI_API_KEY is configured',
    keyPreview: maskedKey,
    keyLength: apiKey.length
  });
});

module.exports = router;

