const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true // Index for search optimization
  },
  price: {
    type: Number,
    required: true,
    index: true // Index for price range queries
  },
  stockAvailability: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true,
    index: true // Index for stock filtering
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    index: true // Index for rating queries
  },
  detailPageUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  scrapedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for complex queries
bookSchema.index({ title: 'text' });
bookSchema.index({ price: 1, rating: 1, inStock: 1 });

module.exports = mongoose.model('Book', bookSchema);
