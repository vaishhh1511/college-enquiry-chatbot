const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors((req, callback) => {
    const origin = req.header('Origin');
    // Same-origin requests (frontend and API served from one domain, e.g. on Vercel)
    const host = req.header('X-Forwarded-Host') || req.header('Host');
    const isSameOrigin = origin && origin.replace(/^https?:\/\//, '') === host;
    // Allow requests with no origin (e.g. mobile apps, curl, Postman)
    const allowed =
      !origin || isSameOrigin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production';

    callback(allowed ? null : new Error('Blocked by CORS policy'), {
      origin: allowed,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Import route modules
const chatbotRoutes = require('./routes/chatbotRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Mount REST API routes
app.use('/api', chatbotRoutes);
app.use('/api', collegeRoutes);
app.use('/api', courseRoutes);

// In production, serve the built React frontend from the same server
const clientDist = path.join(__dirname, '..', 'frontend', 'dist');
if (process.env.NODE_ENV === 'production' && fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/^\/(?!api(\/|$)).*/, (req, res) => res.sendFile(path.join(clientDist, 'index.html')));
}

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    project: 'AI Chatbot for College Enquiry API',
    endpoints: {
      chat: 'POST /api/chat',
      college: 'GET /api/college',
      courses: 'GET /api/courses',
      admissions: 'GET /api/admissions',
      fees: 'GET /api/fees',
      facilities: 'GET /api/facilities',
      placements: 'GET /api/placements',
      faqs: 'GET /api/faqs',
    },
  });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Connect to MongoDB and start Express server when run directly
// (on Vercel, api/index.js imports the app and connects per serverless instance)
if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🌐 Base URL: http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Failed to start server due to DB connection error:', err);
      process.exit(1);
    });
}

module.exports = app;
