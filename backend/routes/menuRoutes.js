const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// GET /api/menu
// Returns all food items. Substitute modelUrl placeholder if empty.
router.get('/', async (req, res) => {
  try {
    const items = await FoodItem.find().sort({ createdAt: 1 });
    const formattedItems = items.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        image: item.image,
        modelUrl: item.modelUrl || '', // Returns empty string if missing or null, per requirements
      };
    });
    res.json(formattedItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Server error fetching menu' });
  }
});

// GET /api/menu/:id
// Returns a single food item
router.get('/:id', async (req, res) => {
  try {
    const item = await FoodItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({
      _id: item._id,
      name: item.name,
      image: item.image,
      modelUrl: item.modelUrl || '',
    });
  } catch (error) {
    // Check if error is due to an invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Invalid item ID' });
    }
    console.error('Error fetching menu item:', error);
    res.status(500).json({ error: 'Server error fetching menu item' });
  }
});

module.exports = router;
