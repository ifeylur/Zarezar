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
    
    // Check if we should use skincare language
    const isSkincare = ['face scrub', 'face mask', 'Skincare', 'bodycare'].includes(category) && skinType !== 'None';

    // Logic to switch description based on product type
    const descriptionBody = isSkincare 
      ? `specially formulated for ${skinType} skin. Experience radiant, glowing skin with our carefully crafted formula that deeply nourishes and revitalizes your complexion. Perfect for your daily skincare routine, this product delivers visible results and leaves your skin feeling refreshed and rejuvenated.`
      : `formulated with high-quality ingredients for optimal results. This carefully crafted product provides reliability and performance, making it perfect for your daily routine and lifestyle.`;

    const dummyDescription = `Discover ${productName}, a premium ${category} ${descriptionBody} This luxurious product features natural ingredients including ${ingredients?.slice(0, 3).join(', ') || 'organic extracts'}.`;
    
    res.json({ description: dummyDescription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate hashtags from product information
const generateHashtags = (productName, category, skinType, keywordsArray) => {
  const hashtags = [];
  
  // Logic check for skincare
  const isSkincare = ['face scrub', 'face mask', 'Skincare', 'bodycare'].includes(category) && skinType !== 'None';

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
    
    // Only add these if it is actually skincare
    if (isSkincare) {
      hashtags.push('#skincare');
      hashtags.push('#beauty');
    }
  }
  
  // Skin type hashtags - Only if not 'None' and not 'All'
  if (skinType && skinType !== 'All' && skinType !== 'None') {
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
  
  // Additional relevant hashtags - CONDITIONAL
  if (isSkincare) {
    hashtags.push('#premiumskincare');
    hashtags.push('#naturalskincare');
    hashtags.push('#skincareroutine');
    hashtags.push('#glowingskin');
    hashtags.push('#skincareproducts');
  } else {
    hashtags.push('#premium');
    hashtags.push('#quality');
    hashtags.push('#essentials');
  }
  
  // Longtail keyword hashtags
  if (isSkincare && category && skinType && skinType !== 'All' && skinType !== 'None') {
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
    
    // Check if it is skincare
    const isSkincare = ['face scrub', 'face mask', 'Skincare', 'bodycare'].includes(category) && skinType !== 'None';

    // Validate productName
    if (!productName || productName.trim() === '') {
      return res.status(400).json({ error: 'productName is required' });
    }
    
    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Debug logging
    if (!apiKey) {
      console.warn('⚠️  OPENAI_API_KEY not found in environment variables');
      console.warn('   Using fallback description generator');
      return generateFallbackDescription(req, res);
    }
    
    const client = getOpenAIClient();
    if (!client) {
      console.error('❌ Failed to initialize OpenAI client');
      return generateFallbackDescription(req, res);
    }
    
    console.log('✅ Using ChatGPT API for description generation');
    
    // Handle keywords
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
      : (isSkincare ? 'natural, organic, premium skincare ingredients' : 'premium quality ingredients');
    
    // Create prompt for ChatGPT - DYNAMIC
    const prompt = `Write a compelling, SEO-optimized product description for:
Product Name: ${productName}
Category: ${category || 'General'}
${isSkincare ? `Skin Type: ${skinType}` : 'Note: This is NOT a skincare product. Do not mention skin or complexion.'}
Key Ingredients/Keywords: ${keywordsText}

Requirements:
1. Write 150-200 words.
2. Include the product name naturally.
3. ${isSkincare ? 'Highlight benefits for the specified skin type.' : 'Highlight the specific functional use and quality of the product.'}
4. Use persuasive, marketing-friendly language.
5. Make it SEO-friendly.
6. End with a call-to-action.

Write only the description text, no additional formatting or labels.`;

    // Call ChatGPT API
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional SEO copywriter. You only use skincare-related terminology if the product is explicitly a skincare item."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    const aiDescription = completion.choices[0]?.message?.content?.trim() || '';
    
    if (!aiDescription) {
      throw new Error('Failed to generate description from ChatGPT');
    }
    
    // Generate hashtags
    const hashtags = generateHashtags(productName, category, skinType, keywordsArray);
    const hashtagsText = hashtags.join(' ');
    
    const seoDescription = `${aiDescription}\n\n${hashtagsText}`;
    
    res.json({ description: seoDescription });
  } catch (error) {
    console.error('❌ Error in ChatGPT generate function:', error);
    return generateFallbackDescription(req, res);
  }
};

// Fallback description generator
const generateFallbackDescription = async (req, res) => {
  try {
    const { productName, keywords, category, skinType } = req.body;
    
    const isSkincare = ['face scrub', 'face mask', 'Skincare', 'bodycare'].includes(category) && skinType !== 'None';

    let keywordsArray = Array.isArray(keywords) ? keywords : (keywords?.split(',').map(k => k.trim()) || []);
    const keywordsText = keywordsArray.length > 0 ? keywordsArray.join(', ') : (isSkincare ? 'natural, organic, premium skincare' : 'high-quality ingredients');
    
    const hashtags = generateHashtags(productName, category, skinType, keywordsArray);
    const hashtagsText = hashtags.join(' ');
    
    const mainContent = isSkincare 
      ? `This luxurious skincare product is specially crafted to deliver visible results, leaving your skin feeling refreshed, rejuvenated, and radiant. Perfect for your daily skincare routine, this carefully formulated product deeply nourishes and revitalizes your complexion.`
      : `This premium ${category || 'product'} is formulated with the finest ingredients to ensure optimal performance. Designed for your daily routine, it provides the quality and effectiveness you can trust.`;

    const seoDescription = `A premium organic ${productName} enriched with natural ingredients including ${keywordsText}. ${mainContent} Experience the transformative power of nature with our premium ${productName}.\n\n${hashtagsText}`;
    
    res.json({ description: seoDescription });
  } catch (error) {
    console.error('Error in fallback generate function:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = { generateDescription, generate };