// src/components/cards/BookCard.tsx
import React from 'react';
import { Book } from '../../types/index';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center', padding: '15px', border: '2px solid #eab308',
    }}>
      <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: '#3b2a1a' }}>
        <div style={{ height: '180px', backgroundColor: '#c7bdae', margin: '0 -15px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '3em', color: '#3b2a1a' }}>📚</span>
        </div>
        
        <h3 style={{ margin: '5px 0', fontSize: '1.2em' }}>{book.title}</h3>
        <p style={{ margin: '0 0 10px', color: '#5a4632' }}>Oleh: {book.writer}</p>

        <div>
          <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '12px', fontSize: '0.8em', marginRight: '5px', fontWeight: 'bold', backgroundColor: '#eab308', color: '#3b2a1a' }}>
            {book.genre.name}
          </span>
          <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '12px', fontSize: '0.8em', marginRight: '5px', fontWeight: 'bold', backgroundColor: '#cc0000', color: 'white' }}>
            New 
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontWeight: 'bold' }}>
          <p style={{ color: '#eab308' }}>⚡ {book.price.toLocaleString('id-ID')}</p>
          <p style={{ color: '#3b2a1a' }}>Stok: {book.stock_quantity}</p>
        </div>
      </Link>
      
      <Button 
        variant="secondary" 
        style={{ width: '100%', marginTop: '10px' }}
        disabled={book.stock_quantity <= 0}
      >
        Add to Cart
      </Button>
    </div>
  );
};
export default BookCard;