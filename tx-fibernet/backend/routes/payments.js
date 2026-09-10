const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Subscription = require('../models/Subscription');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// @route   POST /api/payments
// @desc    Process demo payment for subscription
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { subscriptionId, amount, paymentMethod } = req.body;

    if (!subscriptionId || !amount || !paymentMethod) {
      return res.status(400).json({ message: 'Subscription ID, amount, and payment method are required.' });
    }

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found.' });
    }

    // Generate random transaction ID: TXN-XXXXXXXX
    const randomHex = Math.random().toString(36).substring(2, 10).toUpperCase();
    const transactionId = `TXN-${randomHex}`;

    const payment = new Payment({
      userId: req.user.userId,
      subscriptionId,
      amount,
      paymentMethod,
      transactionId,
      status: 'Success'
    });

    await payment.save();

    // Mark subscription as Active and update dates
    subscription.status = 'Active';
    subscription.startDate = new Date();
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + 30);
    subscription.expiryDate = expDate;
    await subscription.save();

    res.status(201).json({
      message: 'Payment successful! Subscription activated.',
      payment,
      subscription
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Server error processing payment.' });
  }
});

// @route   GET /api/payments/my
// @desc    Get current user payment history
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.userId })
      .populate({
        path: 'subscriptionId',
        populate: { path: 'planId' }
      })
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching payments.' });
  }
});

// @route   GET /api/payments/all
// @desc    Admin: Get all payments
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'name email phone')
      .populate({
        path: 'subscriptionId',
        populate: { path: 'planId' }
      })
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching all payments.' });
  }
});

module.exports = router;
