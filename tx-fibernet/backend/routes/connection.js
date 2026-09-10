const express = require('express');
const router = express.Router();
const ConnectionRequest = require('../models/ConnectionRequest');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// @route   POST /api/connection
// @desc    Submit a request for a new broadband connection
router.post('/', async (req, res) => {
  try {
    const { fullName, mobile, email, address, city, pincode, preferredPlan, message } = req.body;

    if (!fullName || !mobile || !email || !address || !city || !pincode) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    const newRequest = new ConnectionRequest({
      fullName,
      mobile,
      email,
      address,
      city,
      pincode,
      preferredPlan: preferredPlan || 'Standard',
      message: message || ''
    });

    await newRequest.save();

    res.status(201).json({
      message: 'Your connection request has been submitted successfully.',
      connectionRequest: newRequest
    });
  } catch (error) {
    console.error('Connection request error:', error);
    res.status(500).json({ message: 'Server error submitting connection request.' });
  }
});

// @route   GET /api/connection/all
// @desc    Admin: View connection requests
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const requests = await ConnectionRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching connection requests.' });
  }
});

// @route   PUT /api/connection/:id
// @desc    Admin: Update connection request status
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const conn = await ConnectionRequest.findById(req.params.id);

    if (!conn) {
      return res.status(404).json({ message: 'Connection request not found.' });
    }

    if (status) {
      conn.status = status;
    }

    await conn.save();
    res.json({ message: 'Connection request updated', connectionRequest: conn });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating connection request.' });
  }
});

module.exports = router;
