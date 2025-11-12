// src/components/cards/BookCard.tsx
import React from 'react';
import { Book } from '../../types/index';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Get existing cart from localStorage
    const existingCart = localStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if book already in cart
    const existingItem = cart.find((item: any) => item.bookId === book.id);
    
    if (existingItem) {
      // Increase quantity
      existingItem.quantity += 1;
    } else {
      // Add new item
      cart.push({
        bookId: book.id,
        title: book.title,
        price: book.price,
        quantity: 1,
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Optional: Show feedback
    alert(`"${book.title}" added to cart!`);
  };

  return (
    <div className="book-card">
      <Link to={`/books/${book.id}`} className="book-card-link">
        <div className="book-card-image">
          <span className="book-card-emoji">📚</span>
        </div>
        
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">Oleh: {book.writer}</p>

        <div className="book-card-tags">
          <span className="book-card-tag genre">
            {book.genre.name}
          </span>
          <span className="book-card-tag status">
            New 
          </span>
        </div>

        <div className="book-card-footer">
          <div className="book-card-price">⚡ {book.price.toLocaleString('id-ID')}</div>
          <div className="book-card-stock">Stok: {book.stock_quantity}</div>
        </div>
      </Link>
      
      <button 
        className="book-card-button"
        onClick={handleAddToCart}
        disabled={book.stock_quantity <= 0}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;