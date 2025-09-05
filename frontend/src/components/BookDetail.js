import React from 'react';
import './BookDetail.css';

const BookDetail = ({ book, onClose }) => {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="book-detail">
          <div className="book-detail-image">
            <img src={book.thumbnailUrl} alt={book.title} />
          </div>
          
          <div className="book-detail-info">
            <h2>{book.title}</h2>
            
            <div className="detail-row">
              <span className="label">Rating:</span>
              <span className="value">{renderStars(book.rating)} ({book.rating}/5)</span>
            </div>
            
            <div className="detail-row">
              <span className="label">Price:</span>
              <span className="value price">£{book.price.toFixed(2)}</span>
            </div>
            
            <div className="detail-row">
              <span className="label">Availability:</span>
              <span className={`value ${book.inStock ? 'in-stock' : 'out-stock'}`}>
                {book.stockAvailability}
              </span>
            </div>
            
            <div className="detail-row">
              <span className="label">Last Updated:</span>
              <span className="value">
                {new Date(book.scrapedAt).toLocaleDateString()}
              </span>
            </div>
            
            <a 
              href={book.detailPageUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="view-original"
            >
              View on Original Site →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;