const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Simple CORS - allow all for now
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Connect DB
connectDB();

// Routes
const productRoutes = require('./routes/productRoutes');
const aiRoutes = require('./routes/aiRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/products', productRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Zarezar API is running',
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

module.exports = app;