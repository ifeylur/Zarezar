const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // ✅ Keep only this one
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const aiRoutes = require('./routes/aiRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');

// Load environment variables
dotenv.config({ path: '.env' });

// Log OpenAI API key status on startup
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  const maskedKey = process.env.OPENAI_API_KEY.length > 10 
    ? `${process.env.OPENAI_API_KEY.substring(0, 7)}...${process.env.OPENAI_API_KEY.substring(process.env.OPENAI_API_KEY.length - 4)}`
    : '***';
  console.log(`✅ OpenAI API Key loaded: ${maskedKey}`);
} else {
  console.warn('⚠️  OpenAI API Key not configured or using placeholder');
  console.warn('   Add your API key to backend/.env file: OPENAI_API_KEY=your_actual_key');
  console.warn('   The system will use fallback description generator until configured.');
}

const app = express();

// CORS - Must be before routes
app.use(cors({
  origin: ['http://localhost:3000', 'https://zarezar-kul3.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/test', testRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Zarezar API is running' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route working', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;