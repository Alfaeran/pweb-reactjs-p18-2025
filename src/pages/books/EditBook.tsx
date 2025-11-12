// src/pages/books/EditBook.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '../../components/forms/BookForm';
import { bookService } from '../../services/bookService';
import { CreateBookPayload, Book } from '../../types/index';
import Loader from '../../components/ui/Loader';

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load book data
  const loadBook = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await bookService.getBookById(id);
      setBook(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal memuat data buku.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadBook();
  }, [loadBook]);

  const handleSubmit = async (data: CreateBookPayload) => {
    setSubmitLoading(true);
    setSubmitError(null);
    try {
      const bookData = { ...data, description: data.description || '' } as any;
      if (id) {
        await bookService.updateBook(id, bookData);
        alert('Buku berhasil diperbarui!');
        navigate('/');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal memperbarui buku. Pastikan token valid atau data unik.';
      setSubmitError(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <Loader message="Memuat data buku..." />;
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
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', border: '4px solid #eab308' }}>
      <h2 style={{ textAlign: 'center', color: '#3b2a1a', marginBottom: '30px' }}>EDIT MAGICAL BOOK</h2>
      <BookForm
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        loading={submitLoading}
        submitError={submitError}
        initialData={book as any}
      />
    </div>
  );
};
export default EditBook;
