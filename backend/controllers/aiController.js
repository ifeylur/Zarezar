const OpenAI = require('openai');

// Initialize OpenAI client lazily (only when needed)
let openai = null;

const getOpenAIClient = () => {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openai;
};

// Dummy AI SEO Description Generator (fallback)
const generateDescription = async (req, res) => {
  try {
    const { productName, category, skinType, ingredients } = req.body;
    
    // Dummy AI response
    const dummyDescription = `Discover ${productName}, a premium ${category} specially formulated for ${skinType} skin. This luxurious product features natural ingredients including ${ingredients?.slice(0, 3).join(', ') || 'organic extracts'}. Experience radiant, glowing skin with our carefully crafted formula that deeply nourishes and revitalizes your complexion. Perfect for your daily skincare routine, this product delivers visible results and leaves your skin feeling refreshed and rejuvenated.`;
    
    res.json({ description: dummyDescription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate hashtags from product information
const generateHashtags = (productName, category, skinType, keywordsArray) => {
  const hashtags = [];
  
  // Base hashtags from product name
  const productNameWords = productName.toLowerCase().split(' ').filter(w => w.length > 2);
  productNameWords.forEach(word => {
    hashtags.push(`#${word.replace(/[^a-z0-9]/g, '')}`);
  });
  
  // Category hashtags
  if (category) {
    const categoryWords = category.toLowerCase().split(' ');
    categoryWords.forEach(word => {
      const tag = `#${word.replace(/[^a-z0-9]/g, '')}`;
      if (!hashtags.includes(tag)) {
        hashtags.push(tag);
      }
    });
    hashtags.push('#skincare');
    hashtags.push('#beauty');
  }
  
  // Skin type hashtags
  if (skinType && skinType !== 'All') {
    hashtags.push(`#${skinType.toLowerCase()}skin`);
    hashtags.push(`#${skinType.toLowerCase()}skincare`);
  }
  
  // Keywords hashtags
  keywordsArray.forEach(keyword => {
    const words = keyword.toLowerCase().split(' ');
    words.forEach(word => {
      const cleanWord = word.replace(/[^a-z0-9]/g, '');
      if (cleanWord.length > 2) {
        const tag = `#${cleanWord}`;
        if (!hashtags.includes(tag)) {
          hashtags.push(tag);
        }
      }
    });
  });
  
  // Additional relevant hashtags
  hashtags.push('#premiumskincare');
  hashtags.push('#naturalskincare');
  hashtags.push('#skincareroutine');
  hashtags.push('#glowingskin');
  hashtags.push('#skincareproducts');
  
  // Longtail keyword hashtags
  if (category && skinType && skinType !== 'All') {
    hashtags.push(`#${category.replace(/\s+/g, '')}for${skinType.toLowerCase()}skin`);
  }
  if (productNameWords.length > 0) {
    hashtags.push(`#best${productNameWords[0]}`);
  }
  
  // Return unique hashtags, limit to 15-20
  return [...new Set(hashtags)].slice(0, 20);
};

// ChatGPT API SEO Description Generator
const generate = async (req, res) => {
  try {
    const { productName, keywords, category, skinType } = req.body;
    
    // Validate productName
    if (!productName || productName.trim() === '') {
      return res.status(400).json({ error: 'productName is required' });
    }
    
    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Debug logging
    if (!apiKey) {
      console.warn('⚠️  OPENAI_API_KEY not found in environment variables');
      console.warn('   Make sure you have added OPENAI_API_KEY=your_key_here to backend/.env file');
      console.warn('   Using fallback description generator');
      return generateFallbackDescription(req, res);
    }
    
    if (!apiKey.trim()) {
      console.warn('⚠️  OPENAI_API_KEY is empty');
      console.warn('   Using fallback description generator');
      return generateFallbackDescription(req, res);
    }
    
    const client = getOpenAIClient();
    if (!client) {
      console.error('❌ Failed to initialize OpenAI client');
      console.warn('   Using fallback description generator');
      return generateFallbackDescription(req, res);
    }
    
    console.log('✅ Using ChatGPT API for description generation');
    
    // Handle keywords - ensure it's an array
    let keywordsArray = [];
    if (keywords) {
      if (Array.isArray(keywords)) {
        keywordsArray = keywords.filter(k => k && k.trim() !== '');
      } else if (typeof keywords === 'string') {
        keywordsArray = keywords.split(',').map(k => k.trim()).filter(k => k !== '');
      }
    }
    
    // Build keywords string for prompt
    const keywordsText = keywordsArray.length > 0 
      ? keywordsArray.join(', ') 
      : 'natural, organic, premium skincare ingredients';
    
    // Create prompt for ChatGPT
    const prompt = `Write a compelling, SEO-optimized product description for a skincare product with the following details:

Product Name: ${productName}
Category: ${category || 'skincare product'}
Skin Type: ${skinType && skinType !== 'All' ? skinType : 'all skin types'}
Key Ingredients/Keywords: ${keywordsText}

Requirements:
1. Write a professional, engaging description (150-200 words)
2. Include the product name naturally
3. Highlight benefits for the specified skin type
4. Mention the key ingredients/keywords naturally
5. Use persuasive, marketing-friendly language
6. Make it SEO-friendly with natural keyword integration
7. End with a call-to-action about the product's benefits

Write only the description text, no additional formatting or labels.`;

    // Call ChatGPT API
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional SEO copywriter specializing in skincare and beauty products. Write compelling, SEO-optimized product descriptions that are engaging and persuasive."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    // Extract the generated description
    const aiDescription = completion.choices[0]?.message?.content?.trim() || '';
    
    if (!aiDescription) {
      throw new Error('Failed to generate description from ChatGPT');
    }
    
    // Generate hashtags
    const hashtags = generateHashtags(productName, category, skinType, keywordsArray);
    const hashtagsText = hashtags.join(' ');
    
    // Combine AI description with hashtags
    const seoDescription = `${aiDescription}\n\n${hashtagsText}`;
    
    res.json({ description: seoDescription });
  } catch (error) {
    console.error('❌ Error in ChatGPT generate function:', error);
    console.error('   Error message:', error.message);
    console.error('   Error code:', error.code);
    
    // If it's an OpenAI API error, try fallback
    if (error.response || error.message.includes('API key') || error.message.includes('OpenAI') || error.code === 'invalid_api_key') {
      console.warn('⚠️  ChatGPT API error detected, using fallback description');
      console.warn('   This could be due to:');
      console.warn('   - Invalid API key');
      console.warn('   - Insufficient credits');
      console.warn('   - API rate limit exceeded');
      return generateFallbackDescription(req, res);
    }
    
    // For other errors, still try fallback but log the error
    console.warn('⚠️  Unexpected error, using fallback description');
    return generateFallbackDescription(req, res);
  }
};

// Fallback description generator (original logic)
const generateFallbackDescription = async (req, res) => {
  try {
    const { productName, keywords, category, skinType } = req.body;
    
    // Handle keywords - ensure it's an array
    let keywordsArray = [];
    if (keywords) {
      if (Array.isArray(keywords)) {
        keywordsArray = keywords.filter(k => k && k.trim() !== '');
      } else if (typeof keywords === 'string') {
        keywordsArray = keywords.split(',').map(k => k.trim()).filter(k => k !== '');
      }
    }
    
    // Build keywords string
    const keywordsText = keywordsArray.length > 0 
      ? keywordsArray.join(', ') 
      : 'natural, organic, premium skincare';
    
    // Generate hashtags
    const hashtags = generateHashtags(productName, category, skinType, keywordsArray);
    const hashtagsText = hashtags.join(' ');
    
    // Fallback SEO-optimized description with hashtags
    const seoDescription = `A premium organic ${productName} enriched with natural ingredients including ${keywordsText}. This luxurious skincare product is specially crafted to deliver visible results, leaving your skin feeling refreshed, rejuvenated, and radiant. Perfect for your daily skincare routine, this carefully formulated product deeply nourishes and revitalizes your complexion. Experience the transformative power of nature with our premium ${productName} that combines the finest ingredients for optimal skin health and beauty.

${hashtagsText}`;
    
    res.json({ description: seoDescription });
  } catch (error) {
    console.error('Error in fallback generate function:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = { generateDescription, generate };

