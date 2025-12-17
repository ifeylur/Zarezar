# Environment Variables Setup

## Required Environment Variables

Add these to your `backend/.env` file:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGO_URI=your_mongodb_atlas_connection_string_here

# JWT Secret for Authentication
JWT_SECRET=your-super-secret-key-change-this-in-production

# OpenAI API Key for ChatGPT Integration
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
```

## Getting Your OpenAI API Key

1. Visit https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key and paste it in your `.env` file

**Important**: 
- Never commit your `.env` file to version control
- Keep your API keys secure
- The system will use a fallback description generator if the API key is missing

## After Adding Variables

1. Save the `.env` file
2. Restart your backend server:
   ```bash
   cd backend
   npm run dev
   ```

