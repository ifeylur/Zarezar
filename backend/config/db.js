const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGO_URI is actually loaded
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from Environment Variables");
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    // IMPORTANT: Remove process.exit(1) so the server stays alive to report the error
  }
};

module.exports = connectDB;