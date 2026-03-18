const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FoodItem = require('../models/FoodItem');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'models');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: async function(req, file, cb) {
    try {
      // Find the food item to derive the desired filename based on item.name
      const item = await FoodItem.findById(req.params.id);
      if (!item) {
        // Return custom error so we can catch it in our route logic
        return cb(new Error('Item not found'), null);
      }
      
      const safeName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      const filename = `${safeName}.glb`;
      
      // Attach to req so route can save the URL easily without rebuilding string
      req.generatedFilename = filename;
      req.foodItem = item;
      
      cb(null, filename);
    } catch (err) {
      if (err.kind === 'ObjectId') {
         cb(new Error('Item not found'), null);
      } else {
         cb(err, null);
      }
    }
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    // Only accept .glb files extension-wise
    if (path.extname(file.originalname).toLowerCase() === '.glb') {
      cb(null, true);
    } else {
      cb(new Error('Only .glb files are accepted'), false);
    }
  }
});

const uploadModel = upload.single('file'); 

const uploadMiddleware = (req, res, next) => {
  uploadModel(req, res, function (err) {
    if (err) {
      if (err.message === 'Item not found') {
        return res.status(404).json({ error: 'Invalid item ID' });
      } else if (err.message === 'Only .glb files are accepted') {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Failed to upload file due to server error' });
    }
    next();
  });
};

// POST /api/admin/upload-model/:id
router.post('/upload-model/:id', uploadMiddleware, async (req, res) => {
  if (!req.file) {
    // Check if the id is invalid even when there is no file
    try {
        const checkItem = await FoodItem.findById(req.params.id);
        if(!checkItem) return res.status(404).json({ error: 'Invalid item ID' });
    } catch(err) {
        if(err.kind === 'ObjectId') return res.status(404).json({ error: 'Invalid item ID' });
    }
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const item = req.foodItem; // Retrieved in multer config
    if (!item) {
       return res.status(404).json({ error: 'Invalid item ID' });
    }
    
    item.modelUrl = `/uploads/models/${req.generatedFilename}`;
    await item.save();

    res.json(item);
  } catch (error) {
    console.error('Error saving model URL to db:', error);
    res.status(500).json({ error: 'Server error saving model info' });
  }
});

module.exports = router;
