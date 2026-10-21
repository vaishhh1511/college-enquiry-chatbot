// Vercel serverless entry point: wraps the Express app from backend/server.js
const app = require('../backend/server');
const { connectDB } = require('../backend/config/db');

// Reuse the MongoDB connection across invocations of a warm instance
let dbReady = null;

module.exports = async (req, res) => {
  try {
    dbReady = dbReady || connectDB();
    await dbReady;
  } catch (err) {
    dbReady = null; // Retry on the next request
    console.error('MongoDB connection failed:', err.message);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Database connection failed. Check MONGO_URI on Vercel.' }));
  }
  return app(req, res);
};
