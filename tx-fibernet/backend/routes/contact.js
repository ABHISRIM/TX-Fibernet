const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// @route   POST /api/contact
// @desc    Submit a contact form message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    const contactMessage = new ContactMessage({
      name,
      email,
      phone,
      message
    });

    await contactMessage.save();

    res.status(201).json({
      message: 'Thank you for reaching out! We will get back to you soon.',
      contactMessage
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({ message: 'Server error submitting contact message.' });
  }
});

// @route   GET /api/contact/all
// @desc    Admin: View all contact messages
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching contact messages.' });
  }
});

module.exports = router;
