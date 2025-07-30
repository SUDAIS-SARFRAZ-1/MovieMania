const express = require('express');
const {Watchlist}= require('../Models/Watchlist');
const { jwt_authenticate } = require('../Middlewares/jwt_authentication');

const router = express.Router();

// Add to watchlist
router.post('/add', jwt_authenticate, async (req, res) => {
  try {
    const { mediaId, title, poster, mediaType } = req.body;
    const exists = await Watchlist.findOne({ userId: req.user._id, mediaId });

    if (exists) return res.status(400).json({ message: 'Already in watchlist' });

    const item = new Watchlist({ userId: req.user._id, mediaId, title, poster, mediaType });
    await item.save();
    res.status(201).json({ message: 'Added to watchlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get watchlist
router.get('/', jwt_authenticate, async (req, res) => {
  const items = await Watchlist.find({ userId: req.user._id });
  res.json(items);
});

// Delete from watchlist
router.delete('/:id', jwt_authenticate, async (req, res) => {
  await Watchlist.findOneAndDelete({ userId: req.user._id, _id: req.params.id });
  res.json({ message: 'Removed from watchlist' });
});

module.exports={router};
