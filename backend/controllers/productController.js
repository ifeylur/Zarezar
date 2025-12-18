const Product = require('../models/Product');

// Create Product
const createProduct = async (req, res) => {
  try {
    console.log('📦 Creating product:', req.body);
    const product = new Product(req.body);
    await product.save();
    console.log('✅ Product created:', product._id);
    res.status(201).json(product);
  } catch (error) {
    console.error('❌ Error creating product:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    console.log('📦 Fetching all products...');
    const products = await Product.find({}).sort({ createdAt: -1 });
    console.log(`✅ Found ${products.length} products`);
    res.json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get Single Product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};