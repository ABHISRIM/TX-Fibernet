const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// @route   GET /api/plans
// @desc    Get all active internet plans (optional location filter)
router.get('/', async (req, res) => {
  try {
    const { location } = req.query;
    let query = { active: true };

    if (location && location !== 'All') {
      query.location = { $in: [location, 'All'] };
    }

    const plans = await Plan.find(query).sort({ price: 1 });
    res.json(plans);
  } catch (error) {
    console.error('Fetch plans error:', error);
    res.status(500).json({ message: 'Server error fetching plans.' });
  }
});

// @route   GET /api/plans/:id
// @desc    Get plan by ID
router.get('/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found.' });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching plan.' });
  }
});

// @route   POST /api/plans
// @desc    Admin: Create new plan
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, price, speed, validity, data, description, benefits, location } = req.body;

    if (!name || !price || !speed) {
      return res.status(400).json({ message: 'Name, price, and speed are required.' });
    }

    const plan = new Plan({
      name,
      price,
      speed,
      validity: validity || '30 Days',
      data: data || 'Unlimited Data',
      description,
      benefits: benefits || [],
      location: location || ['Tiruppur', 'Erode', 'Palladam', 'Sulur', 'Palani', 'Kodaikanal']
    });

    await plan.save();
    res.status(201).json({ message: 'Plan created successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Server error creating plan.' });
  }
});

// @route   PUT /api/plans/:id
// @desc    Admin: Update plan
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found.' });
    }
    res.json({ message: 'Plan updated successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating plan.' });
  }
});

// @route   DELETE /api/plans/:id
// @desc    Admin: Delete or deactivate plan
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found.' });
    }
    res.json({ message: 'Plan deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting plan.' });
  }
});

module.exports = router;
