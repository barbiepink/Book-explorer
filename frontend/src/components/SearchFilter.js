import React, { useState } from 'react';
import './SearchFilter.css';

const SearchFilter = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      minRating: '',
      maxRating: '',
      minPrice: '',
      maxPrice: '',
      inStock: '',
      sortBy: 'title',
      sortOrder: 'asc'
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="search-filter">
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <input
            type="text"
            name="search"
            placeholder="🔍 Search books by title..."
            value={localFilters.search}
            onChange={handleInputChange}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
          <button 
            type="button" 
            className="filter-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            ⚙️ Filters {isExpanded ? '▲' : '▼'}
          </button>
        </div>

        {isExpanded && (
          <div className="filter-panel">
            <div className="filter-group">
              <h4>Rating</h4>
              <div className="filter-row">
                <select
                  name="minRating"
                  value={localFilters.minRating}
                  onChange={handleInputChange}
                >
                  <option value="">Min Rating</option>
                  <option value="1">⭐ 1+</option>
                  <option value="2">⭐ 2+</option>
                  <option value="3">⭐ 3+</option>
                  <option value="4">⭐ 4+</option>
                  <option value="5">⭐ 5</option>
                </select>
                <select
                  name="maxRating"
                  value={localFilters.maxRating}
                  onChange={handleInputChange}
                >
                  <option value="">Max Rating</option>
                  <option value="1">⭐ 1</option>
                  <option value="2">⭐ 2</option>
                  <option value="3">⭐ 3</option>
                  <option value="4">⭐ 4</option>
                  <option value="5">⭐ 5</option>
                </select>
              </div>
            </div>

            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="filter-row">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min £"
                  value={localFilters.minPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max £"
                  value={localFilters.maxPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="filter-group">
              <h4>Availability</h4>
              <select
                name="inStock"
                value={localFilters.inStock}
                onChange={handleInputChange}
                className="full-width"
              >
                <option value="">All Books</option>
                <option value="true">In Stock Only</option>
                <option value="false">Out of Stock Only</option>
              </select>
            </div>

            <div className="filter-group">
              <h4>Sort By</h4>
              <div className="filter-row">
                <select
                  name="sortBy"
                  value={localFilters.sortBy}
                  onChange={handleInputChange}
                >
                  <option value="title">Title</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
                <select
                  name="sortOrder"
                  value={localFilters.sortOrder}
                  onChange={handleInputChange}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            <div className="filter-actions">
              <button type="submit" className="apply-btn">Apply Filters</button>
              <button type="button" onClick={handleReset} className="reset-btn">Reset All</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchFilter;