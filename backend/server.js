// server.js
// 1. Load environment variables first
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserProgress = require('./models/UserProgress');

const app = express();

// 2. Configure CORS using environment variables
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// 3. Connect to MongoDB using process.env
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('FATAL ERROR: MONGODB_URI environment variable is not defined.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API Endpoint: Get user progress
app.get('/api/progress/:userId', async (req, res) => {
  try {
    let progress = await UserProgress.findOne({ userId: req.params.userId });
    if (!progress) {
      progress = await UserProgress.create({ userId: req.params.userId });
    }
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user progress' });
  }
});

// API Endpoint: Save user progress
app.post('/api/progress', async (req, res) => {
  const { userId, currentStep, completedSteps } = req.body;
  try {
    const progress = await UserProgress.findOneAndUpdate(
      { userId },
      { currentStep, completedSteps, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// 4. Start Server on process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));
