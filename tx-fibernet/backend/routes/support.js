const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/SupportTicket');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// @route   POST /api/support
// @desc    Raise a support ticket
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { issueType, subject, description } = req.body;

    if (!issueType || !subject || !description) {
      return res.status(400).json({ message: 'Issue type, subject, and description are required.' });
    }

    const ticket = new SupportTicket({
      userId: req.user.userId,
      issueType,
      subject,
      description,
      status: 'Open'
    });

    await ticket.save();

    res.status(201).json({
      message: 'Support ticket submitted successfully.',
      ticket
    });
  } catch (error) {
    console.error('Support ticket error:', error);
    res.status(500).json({ message: 'Server error creating support ticket.' });
  }
});

// @route   GET /api/support/my
// @desc    Get current user tickets
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching tickets.' });
  }
});

// @route   GET /api/support/all
// @desc    Admin: get all tickets
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const tickets = await SupportTicket.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching all tickets.' });
  }
});

// @route   PUT /api/support/:id
// @desc    Admin: update ticket status
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    if (status) {
      ticket.status = status;
      ticket.updatedAt = new Date();
    }

    await ticket.save();
    res.json({ message: 'Ticket status updated', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating ticket.' });
  }
});

module.exports = router;
