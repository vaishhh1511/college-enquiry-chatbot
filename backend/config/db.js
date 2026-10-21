const mongoose = require('mongoose');

let isMemoryServer = false;

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college_chatbot';

  try {
    // Attempt connecting to the provided MONGO_URI with a 4 second timeout
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 4000,
    });
    console.log(` MongoDB Connected to Host: ${conn.connection.host} / Database: ${conn.connection.name}`);

    // Seed an empty database (e.g. a fresh MongoDB Atlas cluster) so the chatbot works on first deploy
    try {
      const CollegeInfo = require('../models/CollegeInfo');
      if ((await CollegeInfo.countDocuments()) === 0) {
        const { seedDatabase } = require('../seed/seedData');
        await seedDatabase(false);
      }
    } catch (seedError) {
      console.warn(`⚠️ Auto-seeding skipped: ${seedError.message}`);
    }
    return conn;
  } catch (error) {
    console.warn(`⚠️ Could not connect to local/remote MongoDB at "${primaryUri}": ${error.message}`);
    // The in-memory fallback downloads a ~500MB MongoDB binary, so it is for local use only
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      throw error;
    }
    console.log('🔄 Attempting fallback to in-memory MongoDB engine for zero-setup academic evaluation...');

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      isMemoryServer = true;

      const conn = await mongoose.connect(memoryUri);
      console.log(`✅ Fallback in-memory MongoDB started successfully at ${memoryUri}`);

      // Auto seed in-memory instance so the chatbot is instantly functional
      const { seedDatabase } = require('../seed/seedData');
      await seedDatabase(false);
      return conn;
    } catch (fallbackError) {
      console.error('❌ MongoDB Connection Fatal Error:', fallbackError.message);
      console.error('Please ensure MongoDB is running locally or specify a valid MONGO_URI in your .env file.');
      throw fallbackError;
    }
  }
};

module.exports = { connectDB, isMemoryServer: () => isMemoryServer };
