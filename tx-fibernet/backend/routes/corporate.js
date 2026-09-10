const express = require('express');
const router = express.Router();
const CorporateInquiry = require('../models/CorporateInquiry');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// @route   POST /api/corporate
// @desc    Submit a corporate internet inquiry
router.post('/', async (req, res) => {
  try {
    const { contactName, companyName, email, phone, companyAddress, requiredSpeed, message } = req.body;

    if (!contactName || !companyName || !email || !phone || !companyAddress || !requiredSpeed) {
      return res.status(400).json({ message: 'Please fill all required company details.' });
    }

    const inquiry = new CorporateInquiry({
      contactName,
      companyName,
      email,
      phone,
      companyAddress,
      requiredSpeed,
      message
    });

    await inquiry.save();

    res.status(201).json({
      message: 'Your corporate inquiry has been submitted successfully. Our enterprise team will contact you shortly.',
      inquiry
    });
  } catch (error) {
    console.error('Corporate inquiry error:', error);
    res.status(500).json({ message: 'Server error submitting corporate inquiry.' });
  }
});

// @route   GET /api/corporate/all
// @desc    Admin: View corporate inquiries
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const inquiries = await CorporateInquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching corporate inquiries.' });
  }
});

module.exports = router;
