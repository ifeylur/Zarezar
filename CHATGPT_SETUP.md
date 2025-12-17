# ChatGPT API Integration Setup Guide

This guide will help you set up the ChatGPT API for SEO description generation in your Zarezar e-commerce platform.

## Prerequisites

1. An OpenAI account (sign up at https://platform.openai.com/)
2. An API key from OpenAI

## Step 1: Get Your OpenAI API Key

1. Go to https://platform.openai.com/
2. Sign up or log in to your account
3. Navigate to **API Keys** section (https://platform.openai.com/api-keys)
4. Click **"Create new secret key"**
5. Give it a name (e.g., "Zarezar E-commerce")
6. Copy the API key immediately (you won't be able to see it again!)

⚠️ **Important**: Keep your API key secure and never commit it to version control!

## Step 2: Add API Key to Environment Variables

1. Open your `backend/.env` file
2. Add the following line:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Replace `your_openai_api_key_here` with your actual API key.

**Example `.env` file:**
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your-super-secret-key-change-this-in-production
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 3: Install Dependencies

Navigate to the backend directory and install the OpenAI package:

```bash
cd backend
npm install
```

This will install the `openai` package (version ^4.20.1) that was added to `package.json`.

## Step 4: Restart Your Backend Server

After adding the API key, restart your backend server:

```bash
# If using nodemon (dev mode)
npm run dev

# Or if using regular node
npm start
```

## How It Works

### API Integration

- The system uses **GPT-3.5-turbo** model for generating SEO descriptions
- When you click "Generate SEO Description" in the admin panel, it:
  1. Sends product details (name, category, skin type, keywords) to ChatGPT
  2. ChatGPT generates a professional, SEO-optimized description
  3. The system adds relevant hashtags based on the product information
  4. Returns the complete description with hashtags

### Fallback Mechanism

If the ChatGPT API is unavailable or the API key is missing:
- The system automatically falls back to a template-based description generator
- You'll still get a description with hashtags, just not AI-generated

### Cost Considerations

- **GPT-3.5-turbo** is cost-effective (~$0.0015 per 1K tokens)
- Each description generation uses approximately 200-300 tokens
- Estimated cost: ~$0.0003-0.0005 per description
- Monitor your usage at https://platform.openai.com/usage

## Testing the Integration

1. Go to Admin Panel → Add Product or Edit Product
2. Fill in the product name and other details
3. Click **"Generate SEO Description"**
4. You should see an AI-generated description appear in the textarea

## Troubleshooting

### Error: "OPENAI_API_KEY not found"
- Make sure you've added `OPENAI_API_KEY` to your `.env` file
- Restart your backend server after adding the key
- Check that the `.env` file is in the `backend/` directory

### Error: "Invalid API key"
- Verify your API key is correct
- Make sure there are no extra spaces or quotes around the key
- Check if your OpenAI account has available credits

### Error: "Rate limit exceeded"
- You've hit OpenAI's rate limit
- Wait a few minutes and try again
- Consider upgrading your OpenAI plan if you need higher limits

### Fallback Description Appears Instead
- Check your API key is valid
- Verify you have credits in your OpenAI account
- Check the backend console for error messages

## Security Best Practices

1. ✅ **Never commit `.env` file to Git**
   - Make sure `.env` is in your `.gitignore`

2. ✅ **Use environment variables**
   - Never hardcode API keys in your code

3. ✅ **Rotate keys regularly**
   - Generate new keys if you suspect a security breach

4. ✅ **Monitor usage**
   - Check your OpenAI dashboard regularly for unexpected usage

## API Model Details

- **Model**: `gpt-3.5-turbo`
- **Max Tokens**: 300 (sufficient for product descriptions)
- **Temperature**: 0.7 (balanced creativity and consistency)
- **System Prompt**: Optimized for SEO copywriting in skincare/beauty

## Support

If you encounter any issues:
1. Check the backend console for error messages
2. Verify your API key is correct
3. Ensure your OpenAI account has available credits
4. Check OpenAI's status page: https://status.openai.com/

---

**Note**: The ChatGPT integration enhances the SEO description generation, but the system will continue to work with a fallback method if the API is unavailable.

