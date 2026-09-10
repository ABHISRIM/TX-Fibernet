const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedData = require('./seedRunner');

dotenv.config();

const runSeed = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tx_fibernet';
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(mongoURI);
    await seedData();
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

runSeed();
