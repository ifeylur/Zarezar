const mongoose = require('mongoose');

const connectDB = async () => {
  // Skip if already connected
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const mongoURI = process.env.MONGO_URI;
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    throw error; // Don't use process.exit in serverless
  }
};

module.exports = connectDB;