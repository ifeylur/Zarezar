# Quick Fix: ChatGPT API Not Working

## Problem
You're seeing: `OPENAI_API_KEY not found, using fallback description`

This means the API key is not being loaded from your `.env` file.

## Solution Steps

### Step 1: Check if `.env` file exists
Navigate to the `backend` folder and check if `.env` file exists.

### Step 2: Add/Update the API Key

1. Open `backend/.env` file (create it if it doesn't exist)
2. Add this line:
   ```env
   OPENAI_API_KEY=sk-proj-your-actual-api-key-here
   ```
3. Replace `your-actual-api-key-here` with your real OpenAI API key

**Example `.env` file should look like:**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Get Your OpenAI API Key

If you don't have an API key:
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key
5. Paste it in your `.env` file

### Step 4: Restart Your Server

**IMPORTANT**: After adding/updating the `.env` file, you MUST restart your backend server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd backend
npm run dev
```

### Step 5: Test the API Key

Visit this URL in your browser to check if the API key is loaded:
```
http://localhost:5000/api/test/test-openai-key
```

You should see:
- ✅ `"status": "configured"` if the key is set correctly
- ❌ `"status": "missing"` if the key is not set
- ❌ `"status": "empty"` if the key is empty

## Common Issues

### Issue 1: Key not found after adding to .env
**Solution**: Make sure you restarted the server after adding the key.

### Issue 2: Key is invalid
**Solution**: 
- Check if you copied the full key (starts with `sk-proj-` or `sk-`)
- Make sure there are no extra spaces
- Verify the key is active in your OpenAI account

### Issue 3: Insufficient credits
**Solution**: 
- Check your OpenAI account balance at https://platform.openai.com/usage
- Add credits if needed

### Issue 4: Rate limit exceeded
**Solution**: 
- Wait a few minutes
- Check your usage limits at https://platform.openai.com/usage

## Verify It's Working

1. Go to Admin Panel → Add Product
2. Fill in product name
3. Click "Generate SEO Description"
4. Check the backend console - you should see:
   - ✅ `Using ChatGPT API for description generation` (if working)
   - ⚠️ `OPENAI_API_KEY not found` (if not configured)

## Still Not Working?

1. Check the test endpoint: `http://localhost:5000/api/test/test-openai-key`
2. Check backend console for error messages
3. Verify `.env` file is in the `backend/` folder (not root folder)
4. Make sure there are no typos in `OPENAI_API_KEY` variable name
5. Restart the server after any changes

