const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// 1. Dynamic CORS Configuration for Production & Local Development
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL // Will hold your Vercel URL on Render
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or server-to-server calls)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Production-Ready Database Connection
const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  const seedFunc = require('./seedRunner');

  if (!mongoURI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in environment variables.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000 // Waits 5s for Atlas before timing out
    });
    console.log('MongoDB Atlas connected successfully!');
    
    // Run seed runner if available
    if (typeof seedFunc === 'function') {
      await seedFunc();
    }
  } catch (error) {
    console.error('MongoDB Atlas Connection Error:', error.message);
    // Exit process with failure so Render flags the deployment error cleanly
    process.exit(1);
  }
};

// Initialize DB Connection
connectDB();

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/plans', require('./routes/plans'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/support', require('./routes/support'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/corporate', require('./routes/corporate'));
app.use('/api/connection', require('./routes/connection'));

// Health check endpoint (Render uses this to check if your server is alive)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'TX Fibernet API', timestamp: new Date() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`TX Fibernet Server running on port ${PORT}`);
});