import React, { useState, useEffect } from 'react';
import './App.css';
import BookList from './components/BookList';
import SearchFilter from './components/SearchFilter';
import BookDetail from './components/BookDetail';
import Pagination from './components/Pagination';
import { fetchBooks, fetchBookById, refreshBooks } from './services/api';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    minRating: '',
    maxRating: '',
    minPrice: '',
    maxPrice: '',
    inStock: '',
    sortBy: 'title',
    sortOrder: 'asc'
  });

  useEffect(() => {
    loadBooks();
  }, [filters, pagination.currentPage]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBooks({
        ...filters,
        page: pagination.currentPage,
        limit: 12
      });
      setBooks(data.books);
      setPagination(data.pagination);
    } catch (err) {
      setError('Failed to load books. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = async (bookId) => {
    try {
      const book = await fetchBookById(bookId);
      setSelectedBook(book);
      setShowModal(true);
    } catch (err) {
      console.error('Failed to fetch book details:', err);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    window.scrollTo(0, 0);
  };

  const handleRefresh = async () => {
    try {
      await refreshBooks();
      alert('Book data refresh initiated. This may take a few minutes.');
      setTimeout(loadBooks, 5000);
    } catch (err) {
      alert('Failed to refresh book data.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Book Explorer</h1>
        <p>Discover your next great read</p>
        <button className="refresh-btn" onClick={handleRefresh}>
          🔄 Refresh Data
        </button>
      </header>

      <main className="App-main">
        <SearchFilter 
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {loading && <div className="loading">Loading books...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <>
            <div className="results-info">
              Showing {books.length} of {pagination.totalItems} books
            </div>
            <BookList 
              books={books}
              onBookClick={handleBookClick}
            />
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {showModal && selectedBook && (
          <BookDetail
            book={selectedBook}
            onClose={() => {
              setShowModal(false);
              setSelectedBook(null);
            }}
          />
        )}
      </main>

      <footer className="App-footer">
        <p>© 2024 Book Explorer. Built with React & Node.js</p>
      </footer>
    </div>
  );
}

export default App;