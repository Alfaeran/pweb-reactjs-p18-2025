// src/pages/books/AddBook.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../../components/forms/BookForm';
import { createBook } from '../../services/bookService';
import { CreateBookPayload } from '../../types/index';

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateBookPayload) => {
    setLoading(true);
    setError(null);
    try {
      await createBook(data);
      alert('Buku berhasil ditambahkan!');
      navigate('/'); 
    } catch (err: any) {
      // Menangkap error dari backend, seperti validasi atau duplikasi judul.
      const errorMessage = err.response?.data?.message || 'Gagal menambahkan buku. Pastikan token valid atau data unik.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', border: '4px solid #eab308' }}>
      <h2 style={{ textAlign: 'center', color: '#3b2a1a', marginBottom: '30px' }}>ADD NEW MAGICAL BOOK</h2>
      <BookForm
        onSubmit={handleSubmit}
        submitLabel="Add Book with Seal"
        loading={loading}
        submitError={error}
        initialData={null}
      />
    </div>
  );
};
export default AddBook;