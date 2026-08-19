const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mediaId: { type: String, required: true }, // TMDB id
  mediaType: { type: String, enum: ['movie', 'tv'], required: true },
  title: String,
  poster: String,
  addedAt: { type: Date, default: Date.now }
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports={Watchlist};
