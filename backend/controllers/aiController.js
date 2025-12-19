const OpenAI = require('openai');

let openai = null;
const getOpenAIClient = () => {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
};

// --- HELPER: GENERATE HASHTAGS ---
const generateHashtags = (productName, category, skinType, keywordsArray) => {
  const hashtags = [];
  const categoryLower = category?.toLowerCase() || '';
  const isSkincare = ['face scrub', 'face mask', 'skincare', 'bodycare'].includes(categoryLower) && skinType !== 'None';

  const productNameWords = productName.toLowerCase().split(' ').filter(w => w.length > 2);
  productNameWords.forEach(word => hashtags.push(`#${word.replace(/[^a-z0-9]/g, '')}`));

  // Add Tags Based on Category
  if (isSkincare) {
    hashtags.push('#skincare', '#beauty', '#glowingskin', '#naturalskincare');
    if (skinType && skinType !== 'All' && skinType !== 'None') hashtags.push(`#${skinType.toLowerCase()}skin`);
  } else {
    hashtags.push('#premium', '#quality', '#essentials');
    if (categoryLower.includes('toothpaste') || productName.toLowerCase().includes('toothpaste')) {
      hashtags.push('#oralcare', '#hygiene', '#health');
    }
  }

  keywordsArray.forEach(kw => {
    const clean = kw.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean.length > 2) hashtags.push(`#${clean}`);
  });

  return [...new Set(hashtags)].slice(0, 15);
};

// --- CHATGPT GENERATOR ---
const generate = async (req, res) => {
  try {
    const { productName, keywords, category, skinType } = req.body;
    const isSkincare = ['face scrub', 'face mask', 'skincare', 'bodycare'].includes(category?.toLowerCase()) && skinType !== 'None';

    if (!productName) return res.status(400).json({ error: 'productName is required' });

    const client = getOpenAIClient();
    if (!client) return generateFallbackDescription(req, res);

    let keywordsArray = Array.isArray(keywords) ? keywords : keywords?.split(',').map(k => k.trim()) || [];
    const keywordsText = keywordsArray.join(', ') || 'premium quality';

    // THE DYNAMIC PROMPT (Tells AI exactly what to do)
    const prompt = `Write a professional SEO product description for:
Product Name: ${productName}
Category: ${category || 'General'}
${isSkincare ? `Skin Type: ${skinType}` : 'Note: This is NOT a skincare product. Focus on its specific category use case.'}
Keywords: ${keywordsText}

Requirements:
1. Write 150 words.
2. ${isSkincare ? 'Focus on skin benefits and complexion.' : 'DO NOT mention skin, complexion, or faces. Focus on the actual product category.'}
3. End with a call-to-action.`;

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional SEO copywriter. You adapt your tone to the specific product category provided." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    });

    const aiDescription = completion.choices[0]?.message?.content?.trim() || '';
    const hashtags = generateHashtags(productName, category, skinType, keywordsArray);
    res.json({ description: `${aiDescription}\n\n${hashtags.join(' ')}` });

  } catch (error) {
    return generateFallbackDescription(req, res);
  }
};

// --- FALLBACK GENERATOR ---
const generateFallbackDescription = async (req, res) => {
  try {
    const { productName, keywords, category, skinType } = req.body;
    const isSkincare = ['face scrub', 'face mask', 'skincare', 'bodycare'].includes(category?.toLowerCase()) && skinType !== 'None';
    
    let keywordsArray = Array.isArray(keywords) ? keywords : keywords?.split(',').map(k => k.trim()) || [];
    const keywordsText = keywordsArray.length > 0 ? keywordsArray.join(', ') : 'natural ingredients';
    const hashtags = generateHashtags(productName, category, skinType, keywordsArray);

    // DYNAMIC TEMPLATE (No more hardcoded skin text for toothpaste!)
    const descriptionText = isSkincare 
      ? `Discover ${productName}, a premium ${category} formulated for ${skinType} skin. Experience radiant, glowing results with our formula that deeply nourishes and revitalizes your complexion.`
      : `Discover ${productName}, a premium ${category} crafted with ${keywordsText}. This high-quality product is designed to deliver optimal results for your daily routine, ensuring performance and reliability.`;

    res.json({ description: `${descriptionText}\n\n${hashtags.join(' ')}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generate };