require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const menuRoutes = require('./routes/menuRoutes');
const adminRoutes = require('./routes/adminRoutes');
const seedDB = require('./seed');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/arcafe';

// Middleware
app.use(cors());
app.use(express.json());

// Setup static directories if they don't exist
const uploadsModelsDir = path.join(__dirname, 'uploads', 'models');
if (!fs.existsSync(uploadsModelsDir)) {
    fs.mkdirSync(uploadsModelsDir, { recursive: true });
}

// Serve static models - mapping /uploads directly 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes mounted
app.use('/api/menu', menuRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'AR Cafe Backend API is running' });
});

// Database connection and Server Start
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Auto-seed database automatically on initial app start up
    await seedDB();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
