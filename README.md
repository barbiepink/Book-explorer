# 📚 Book Explorer App

A full-stack web application that scrapes book data from Books to Scrape website, stores it in a database, and presents it through a modern, responsive interface.

## 🎯 Features

- **Automated Web Scraping**: Scrapes book data from all pages of Books to Scrape
- **RESTful API**: Clean endpoints with pagination, filtering, and search
- **Modern UI**: Responsive React frontend with smooth animations
- **Advanced Filtering**: Search by title, filter by rating, price, and availability
- **Real-time Updates**: Manual refresh capability to update book data
- **Optimized Performance**: Database indexing for fast queries

## 🏗️ Tech Stack

- **Frontend**: React 18, Axios, CSS3
- **Backend**: Node.js, Express.js, MongoDB
- **Scraper**: Cheerio, Axios, Node-cron
- **Database**: MongoDB with Mongoose ODM

## 📁 Project Structure

```
book-explorer/
├── scraper/          # Web scraping module
├── backend/          # API server
├── frontend/         # React application
└── README.md         # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/book-explorer.git
cd book-explorer
```

2. **Setup MongoDB**
   - Local: Install and start MongoDB
   - Cloud: Create a free MongoDB Atlas account and get connection string

3. **Configure Environment Variables**

Create `.env` files in each module:

**scraper/.env**
```
MONGODB_URI=mongodb://localhost:27017/bookexplorer
ENABLE_CRON=false
```

**backend/.env**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookexplorer
NODE_ENV=development
```

4. **Install Dependencies**
```bash
# Install scraper dependencies
cd scraper
npm install

# Install backend dependencies
cd ../backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

5. **Run the Scraper (First Time)**
```bash
cd scraper
npm start
```
This will populate your database with book data.

6. **Start the Backend Server**
```bash
cd backend
npm start
```
Server will run on http://localhost:5000

7. **Start the Frontend Application**
```bash
cd frontend
npm start
```
Application will open at http://localhost:3000

## 📡 API Documentation

### Endpoints

#### GET /api/books
Get paginated list of books with optional filters.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 12)
- `search` (string): Search by title
- `minRating` (number): Minimum rating (1-5)
- `maxRating` (number): Maximum rating (1-5)
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `inStock` (boolean): Filter by stock availability
- `sortBy` (string): Sort field (title, price, rating)
- `sortOrder` (string): Sort order (asc, desc)

**Response:**
```json
{
  "books": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 120,
    "itemsPerPage": 12,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### GET /api/books/:id
Get single book details.

#### POST /api/refresh
Trigger fresh scraping of the data source.

## 🌐 Deployment

### Backend Deployment (Heroku/Render)

1. **Prepare for deployment:**
   - Add `"engines": { "node": "14.x" }` to backend/package.json
   - Create a `Procfile` in backend directory: `web: node server.js`

2. **Deploy to Heroku:**
```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

3. **Deploy to Render:**
   - Connect GitHub repo
   - Set environment variables
   - Deploy

### Frontend Deployment (Vercel/Netlify)

1. **Update API URL:**
   - Create `.env.production` in frontend:
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

2. **Build for production:**
```bash
cd frontend
npm run build
```

3. **Deploy to Vercel:**
```bash
npm i -g vercel
vercel --prod
```

4. **Deploy to Netlify:**
   - Drag and drop `build` folder to Netlify
   - Or use Netlify CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=build
```

## 📊 Database Schema

### Book Collection
```javascript
{
  title: String,
  price: Number,
  stockAvailability: String,
  inStock: Boolean,
  rating: Number (0-5),
  detailPageUrl: String,
  thumbnailUrl: String,
  scrapedAt: Date,
  timestamps: true
}
```

### Indexes
- title (text index for search)
- price, rating, inStock (compound index)
- Individual indexes on price, rating, inStock

## 🔧 Scheduled Scraping (Optional)

To enable automatic daily scraping:

1. Update `scraper/.env`:
```
ENABLE_CRON=true
```

2. The scraper will run daily at 2 AM

## 🧪 Testing

```bash
# Test scraper
cd scraper && npm test

# Test backend
cd backend && npm test

# Test frontend
cd frontend && npm test
```

## 📝 License

MIT License - feel free to use this project for your portfolio!

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🆘 Support

For issues or questions, please create an issue in the GitHub repository.

## 🎉 Acknowledgments

- Books to Scrape for providing the practice scraping site
- MongoDB Atlas for free database hosting
- Vercel/Netlify for frontend hosting
- Heroku/Render for backend hosting

---

Built with ❤️ for the Full Stack Assignment