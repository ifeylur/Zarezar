# Setup OpenAI API Key - Quick Guide

## ✅ What I Just Did

I've added `OPENAI_API_KEY=your_openai_api_key_here` to your `backend/.env` file.

## 🔑 Next Steps - Get Your API Key

### Step 1: Get Your OpenAI API Key

1. **Visit**: https://platform.openai.com/api-keys
2. **Sign up or log in** to your OpenAI account
3. **Click** "Create new secret key"
4. **Copy** the API key (it starts with `sk-proj-` or `sk-`)
5. **Important**: Copy it immediately - you won't see it again!

### Step 2: Add the Key to Your .env File

1. Open `backend/.env` file
2. Find this line:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
3. Replace `your_openai_api_key_here` with your actual API key:
   ```
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. **Save** the file

### Step 3: Restart Your Server

**CRITICAL**: After adding the API key, you MUST restart your backend server:

1. Stop the current server (press `Ctrl+C` in the terminal)
2. Start it again:
   ```bash
   cd backend
   npm run dev
   ```

### Step 4: Verify It's Working

When you restart the server, you should see:
- ✅ `OpenAI API Key loaded: sk-proj-...xxxx` (if working)
- ⚠️ `OpenAI API Key not configured` (if not set)

Then test it:
1. Go to Admin Panel → Add Product
2. Fill in product name
3. Click "Generate SEO Description"
4. Check backend console - should see: `✅ Using ChatGPT API for description generation`

## 🧪 Test Endpoint

You can also test if the key is loaded by visiting:
```
http://localhost:5000/api/test/test-openai-key
```

This will show you:
- ✅ `"status": "configured"` - Key is set correctly
- ❌ `"status": "missing"` - Key is not in .env file
- ❌ `"status": "empty"` - Key is empty

## 💰 Cost Information

- **Model**: GPT-3.5-turbo
- **Cost**: ~$0.0003-0.0005 per description
- **Very affordable** for testing and production

## ❌ Troubleshooting

### "OPENAI_API_KEY not found" still appears
- ✅ Make sure you **restarted the server** after adding the key
- ✅ Check the key is in `backend/.env` (not root folder)
- ✅ Verify no extra spaces around the `=` sign
- ✅ Make sure the key starts with `sk-proj-` or `sk-`

### "Invalid API key" error
- ✅ Check you copied the full key
- ✅ Verify the key is active in your OpenAI account
- ✅ Make sure you have credits in your account

### Still using fallback?
- ✅ Check backend console for error messages
- ✅ Visit the test endpoint to verify key status
- ✅ Make sure dotenv is loading the .env file

## 📝 Your .env File Should Look Like:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/Zarezar
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

**Remember**: Never commit your `.env` file to Git! It contains sensitive information.

