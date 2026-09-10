const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection with In-Memory Fallback
const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tx_fibernet';
  const seedFunc = require('./seedRunner');
  try {
    console.log('Connecting to MongoDB at:', mongoURI);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000
    });
    console.log('MongoDB connected successfully!');
    await seedFunc();
  } catch (error) {
    console.log('Local MongoDB connection failed/unavailable. Launching MongoDB Memory Server fallback...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log('MongoDB Memory Server running and connected at:', uri);
      
      await seedFunc();
    } catch (memError) {
      console.error('Failed to initialize MongoDB Memory Server:', memError);
    }
  }
};

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

// Health check endpoint
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
