const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  skinType: {
    type: String,
    required: true,
    enum: ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal', 'All','none']
  },
  ingredients: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['face scrub', 'face mask','Skincare', 'Makeup', 'Others', 'bodycare', 'haircare']
  },
  seoDescription: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'products' // Explicitly set collection name to 'products'
});

module.exports = mongoose.model('Product', productSchema);

