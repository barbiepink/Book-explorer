const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { scrapeBooks } = require('../../Scraper/scraper');

// GET /api/books - Get paginated list of books with filters
router.get('/books', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      minRating,
      maxRating,
      minPrice,
      maxPrice,
      inStock,
      sortBy = 'title',
      sortOrder = 'asc'
    } = req.query;

    // Build query
    const query = {};

    // Text search
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Rating filter
    if (minRating || maxRating) {
      query.rating = {};
      if (minRating) query.rating.$gte = parseInt(minRating);
      if (maxRating) query.rating.$lte = parseInt(maxRating);
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Stock filter
    if (inStock !== undefined && inStock !== '') {
      query.inStock = inStock === 'true';
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const [books, totalCount] = await Promise.all([
      Book.find(query)
        .sort(sort)
        .limit(limitNum)
        .skip(skip)
        .lean(),
      Book.countDocuments(query)
    ]);

    res.json({
      books,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalItems: totalCount,
        itemsPerPage: limitNum,
        hasNextPage: pageNum < Math.ceil(totalCount / limitNum),
        hasPrevPage: pageNum > 1
      }
    });

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// GET /api/books/:id - Get single book details
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Failed to fetch book details' });
  }
});

// POST /api/refresh - Trigger fresh scraping (Bonus)
router.post('/refresh', async (req, res) => {
  try {
    res.json({ message: 'Scraping initiated. This may take a few minutes.' });
    
    // Run scraping in background
    scrapeBooks()
      .then(books => {
        console.log(`Successfully scraped ${books.length} books`);
      })
      .catch(error => {
        console.error('Scraping failed:', error);
      });
      
  } catch (error) {
    console.error('Error initiating refresh:', error);
    res.status(500).json({ error: 'Failed to initiate refresh' });
  }
});

module.exports = router;
