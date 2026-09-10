const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// @route   POST /api/subscriptions
// @desc    Subscribe to a broadband plan
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { planId, customerName, phone, email, address, city } = req.body;

    if (!planId || !customerName || !phone || !address) {
      return res.status(400).json({ message: 'Please fill all required subscription details.' });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Selected plan not found.' });
    }

    // Default 30 days expiry from now
    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(startDate.getDate() + 30);

    const subscription = new Subscription({
      userId: req.user.userId,
      planId,
      customerName,
      phone,
      email: email || req.user.email || '',
      address,
      city: city || 'Tiruppur',
      startDate,
      expiryDate,
      status: 'Pending'
    });

    await subscription.save();
    const populated = await Subscription.findById(subscription._id).populate('planId');

    res.status(201).json({
      message: 'Subscription request submitted successfully',
      subscription: populated
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Server error creating subscription.' });
  }
});

// @route   GET /api/subscriptions/my
// @desc    Get user subscriptions
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.user.userId })
      .populate('planId')
      .sort({ createdAt: -1 });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching subscriptions.' });
  }
});

// @route   GET /api/subscriptions/all
// @desc    Admin: get all subscriptions
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('userId', 'name email phone')
      .populate('planId')
      .sort({ createdAt: -1 });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching all subscriptions.' });
  }
});

// @route   GET /api/subscriptions/:id
// @desc    Get subscription by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate('planId');
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found.' });
    }
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching subscription.' });
  }
});

// @route   PUT /api/subscriptions/:id
// @desc    Update subscription status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found.' });
    }

    // Check ownership or admin
    if (subscription.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this subscription.' });
    }

    if (status) {
      subscription.status = status;
      if (status === 'Active') {
        subscription.startDate = new Date();
        const exp = new Date();
        exp.setDate(exp.getDate() + 30);
        subscription.expiryDate = exp;
      }
    }

    await subscription.save();
    const updated = await Subscription.findById(subscription._id).populate('planId');
    res.json({ message: 'Subscription updated successfully', subscription: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating subscription.' });
  }
});

module.exports = router;
