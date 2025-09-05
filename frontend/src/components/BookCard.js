import React from 'react';
import './BookCard.css';

const BookCard = ({ book, onClick }) => {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-image-container">
        <img src={book.thumbnailUrl} alt={book.title} />
        <div className={`stock-badge ${book.inStock ? 'in-stock' : 'out-stock'}`}>
          {book.stockAvailability}
        </div>
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <div className="book-rating">{renderStars(book.rating)}</div>
        <div className="book-price">£{book.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default BookCard;