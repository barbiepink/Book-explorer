const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const cron = require('node-cron');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookexplorer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Book Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  stockAvailability: { type: String, required: true },
  inStock: { type: Boolean, required: true },
  rating: { type: Number, required: true },
  detailPageUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  scrapedAt: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

// Rating mapping
const ratingMap = {
  'One': 1,
  'Two': 2,
  'Three': 3,
  'Four': 4,
  'Five': 5
};

// Main scraping function
async function scrapeBooks() {
  console.log('Starting book scraping...');
  const baseUrl = 'https://books.toscrape.com';
  let currentPage = 1;
  let hasNextPage = true;
  const allBooks = [];

  try {
    while (hasNextPage) {
      const url = currentPage === 1 
        ? `${baseUrl}/index.html`
        : `${baseUrl}/catalogue/page-${currentPage}.html`;
      
      console.log(`Scraping page ${currentPage}: ${url}`);
      
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      // Extract books from current page
      $('.product_pod').each((index, element) => {
        const title = $(element).find('h3 a').attr('title');
        const priceText = $(element).find('.price_color').text();
        const price = parseFloat(priceText.replace('£', ''));
        
        const availabilityClass = $(element).find('.availability').attr('class');
        const inStock = availabilityClass && availabilityClass.includes('instock');
        const stockAvailability = inStock ? 'In stock' : 'Out of stock';
        
        const ratingClass = $(element).find('.star-rating').attr('class');
        const ratingWord = ratingClass ? ratingClass.split(' ')[1] : 'Zero';
        const rating = ratingMap[ratingWord] || 0;
        
        const relativeDetailUrl = $(element).find('h3 a').attr('href');
        const detailPageUrl = currentPage === 1
          ? `${baseUrl}/${relativeDetailUrl}`
          : `${baseUrl}/catalogue/${relativeDetailUrl.replace('../', '')}`;
        
        const relativeThumbnailUrl = $(element).find('.thumbnail').attr('src');
        const thumbnailUrl = currentPage === 1
          ? `${baseUrl}/${relativeThumbnailUrl}`
          : `${baseUrl}/${relativeThumbnailUrl.replace('../', '')}`;
        
        allBooks.push({
          title,
          price,
          stockAvailability,
          inStock,
          rating,
          detailPageUrl,
          thumbnailUrl
        });
      });
      
      // Check if there's a next page
      const nextButton = $('.next a');
      hasNextPage = nextButton.length > 0;
      
      if (hasNextPage) {
        currentPage++;
      }
    }
    
    console.log(`Scraped ${allBooks.length} books total`);
    
    // Clear existing data and insert new data
    await Book.deleteMany({});
    await Book.insertMany(allBooks);
    
    console.log('Books successfully saved to database');
    return allBooks;
    
  } catch (error) {
    console.error('Scraping error:', error);
    throw error;
  }
}

// Run scraper immediately
scrapeBooks()
  .then(() => {
    console.log('Initial scraping complete');
    
    // Schedule scraper to run daily at 2 AM (optional)
    if (process.env.ENABLE_CRON === 'true') {
      cron.schedule('0 2 * * *', async () => {
        console.log('Running scheduled scraping...');
        await scrapeBooks();
      });
      console.log('Cron job scheduled for daily scraping at 2 AM');
    }
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

// Export for use in backend refresh endpoint
module.exports = { scrapeBooks };