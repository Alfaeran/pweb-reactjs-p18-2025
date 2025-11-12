// src/pages/books/BookDetail.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../../services/bookService';
import { Book } from '../../types/index';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDetail = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await bookService.getBookById(id);
      setBook(response.data);
    } catch (err: any) {
      // Error 404 dari backend (Book not found) akan ditangkap di sini
      setError(err.response?.data?.message || 'Gagal memuat detail buku.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);
  
  const handleDelete = async () => {
    if (!isAuthenticated) {
        alert('Akses ditolak. Anda harus login untuk menghapus buku.');
        return;
    }
    if (!window.confirm(`Yakin ingin menghapus buku "${book?.title}"?`)) {
      return;
    }
    setLoading(true);
    try {
      if (id) {
        await bookService.deleteBook(id);
        alert(`Buku "${book?.title}" berhasil dihapus.`);
        navigate('/'); 
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal menghapus buku. Pastikan Anda memiliki izin dan sesi Anda aktif.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!book) return;

    const existingCart = localStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];
    const existingItem = cart.find((item: any) => item.bookId === book.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ 
        bookId: book.id, 
        title: book.title, 
        price: book.price, 
        quantity: 1 
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`"${book.title}" ditambahkan ke keranjang!`);
  };

  if (loading) return <Loader message="Membuka halaman detail..." />;
  if (error) return (
    <div className="book-detail-error">
      <h2>Oops!</h2>
      <p>{error}</p>
    </div>
  );
  if (!book) return (
    <div className="book-detail-error">
      <h2>Not Found</h2>
      <p>Buku tidak ditemukan.</p>
    </div>
  );

  return (
    <div className="book-detail-container">
      <button className="book-detail-back-btn" onClick={() => navigate('/')}>
        ← Back to Books
      </button>

      <div className="book-detail-wrapper">
        {/* Header Section */}
        <div className="book-detail-header">
          <h1>{book.title}</h1>
          <div className="book-detail-price">{book.price.toLocaleString('id-ID')}</div>
        </div>

        {/* Main Content */}
        <div className="book-detail-content">
          {/* Left: Book Cover & Info Grid */}
          <div className="book-detail-cover">
            <div className="book-detail-image">📖</div>
            
            <div className="book-detail-info">
              <div className="book-detail-info-row">
                <span className="book-detail-info-label">Penulis</span>
                <div className="book-detail-info-value">{book.writer}</div>
              </div>
              <div className="book-detail-info-row">
                <span className="book-detail-info-label">Penerbit</span>
                <div className="book-detail-info-value">{book.publisher}</div>
              </div>
              <div className="book-detail-info-row">
                <span className="book-detail-info-label">Tahun Terbit</span>
                <div className="book-detail-info-value">{book.publication_year}</div>
              </div>
              <div className="book-detail-info-row">
                <span className="book-detail-info-label">Genre</span>
                <div className="book-detail-info-value">{book.genre.name}</div>
              </div>
              <div className="book-detail-info-row">
                <span className="book-detail-info-label">Stok</span>
                <div className="book-detail-info-value">{book.stock_quantity}</div>
              </div>
            </div>
          </div>

          {/* Right: Description & Actions */}
          <div>
            {/* Stock Status */}
            <div className={`book-detail-stock ${book.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {book.stock_quantity > 0 ? '✓ In Stock' : '✗ Out of Stock'}
            </div>

            {/* Description */}
            <div className="book-detail-section">
              <h3>Deskripsi</h3>
              <p className="book-detail-description">
                {book.description || 'Tidak ada deskripsi tersedia untuk buku ini.'}
              </p>
            </div>

            {/* Actions */}
            <div className="book-detail-actions">
              <button 
                className="book-detail-btn-primary" 
                onClick={handleAddToCart}
                disabled={book.stock_quantity <= 0}
              >
                Add to Cart
              </button>
              
              {isAuthenticated && (
                <>
                  <button 
                    className="book-detail-btn-danger" 
                    onClick={handleDelete} 
                    disabled={loading}
                  >
                    Delete Book
                  </button>
                  <button 
                    className="book-detail-btn-secondary" 
                    onClick={() => navigate(`/books/edit/${book.id}`)}
                  >
                    Edit Book
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookDetail;