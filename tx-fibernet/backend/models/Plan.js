const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  speed: {
    type: String,
    required: true
  },
  validity: {
    type: String,
    default: '30 Days'
  },
  data: {
    type: String,
    default: 'Unlimited Data'
  },
  description: {
    type: String,
    default: ''
  },
  benefits: [{
    type: String
  }],
  location: [{
    type: String
  }],
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Plan', planSchema);
