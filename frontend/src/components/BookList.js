import React from 'react';
import BookCard from './BookCard';
import './BookList.css';

const BookList = ({ books, onBookClick }) => {
  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard 
          key={book._id} 
          book={book}
          onClick={() => onBookClick(book._id)}
        />
      ))}
    </div>
  );
};

export default BookList;