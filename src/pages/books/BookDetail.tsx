// src/pages/books/BookDetail.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookDetail, deleteBook } from '../../services/bookService';
import { Book } from '../../types/index';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext'; 

const BookDetail = () => {
  const { book_id } = useParams<{ book_id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDetail = useCallback(async () => {
    if (!book_id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getBookDetail(book_id);
      setBook(data);
    } catch (err: any) {
      // Error 404 dari backend (Book not found) akan ditangkap di sini
      setError(err.response?.data?.message || 'Gagal memuat detail buku.');
    } finally {
      setLoading(false);
    }
  }, [book_id]);

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
      if (book_id) {
        await deleteBook(book_id);
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

  if (loading) return <Loader message="Membuka halaman detail..." />;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Error: {error}</div>;
  if (!book) return <div style={{ textAlign: 'center', padding: '50px' }}>Buku tidak ditemukan.</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '30px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#3b2a1a' }}>{book.title}</h1>
      <p style={{ color: '#eab308', fontWeight: 'bold', fontSize: '1.2em' }}>⚡ {book.price.toLocaleString('id-ID')}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginTop: '20px' }}>
        <div>
          <div style={{ height: '300px', backgroundColor: '#c7bdae', borderRadius: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '5em', color: '#3b2a1a' }}>📖</span>
          </div>

          <p><strong>Penulis:</strong> {book.writer}</p>
          <p><strong>Penerbit:</strong> {book.publisher}</p>
          <p><strong>Tahun Terbit:</strong> {book.publication_year}</p>
          <p><strong>Genre:</strong> {book.genre.name}</p>
          <p><strong>Stok:</strong> {book.stock_quantity}</p>
          <p><strong>ISBN:</strong> *N/A (API)*</p>
          <p><strong>Kondisi:</strong> New</p>
        </div>

        <div>
          <h3 style={{ borderBottom: '2px solid #eab308', paddingBottom: '5px', color: '#3b2a1a' }}>Deskripsi</h3>
          <p>{book.description || 'Tidak ada deskripsi tersedia.'}</p>

          <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
            <Button variant="primary" disabled={book.stock_quantity <= 0}>Add to Cart</Button>
            
            {isAuthenticated && (
                <>
                    <Button variant="danger" onClick={handleDelete} disabled={loading}>Hapus Buku</Button>
                    <Button variant="secondary" onClick={() => navigate(`/books/edit/${book.id}`)}>Edit</Button>
                </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookDetail;