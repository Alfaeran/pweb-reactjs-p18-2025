// src/components/forms/BookForm.tsx
import React, { useState, useEffect } from 'react';
import { Genre, Book, CreateBookPayload } from '../../types/index';
import Loader from '../ui/Loader';
import { fetchGenres } from '../../services/bookService';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface BookFormProps {
  initialData?: Book | null;
  onSubmit: (data: CreateBookPayload) => Promise<void>;
  submitLabel: string;
  loading: boolean;
  submitError: string | null;
}

const initialFormState: CreateBookPayload = {
    title: '', writer: '', publisher: '', publication_year: 0, 
    description: '', price: 0, stock_quantity: 0, genre_id: '',
};

const BookForm: React.FC<BookFormProps> = ({ initialData, onSubmit, submitLabel, loading, submitError }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [formLoading, setFormLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Fetch Genres & Set Initial Data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
        if (data.length > 0 && !initialData) {
          setFormData(prev => ({ ...prev, genre_id: data[0].id }));
        }
      } catch (err) {
        setFormError('Gagal memuat daftar genre.');
      } finally {
        setFormLoading(false);
      }
    };
    loadData();
  }, [initialData]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title, writer: initialData.writer, publisher: initialData.publisher, 
        publication_year: initialData.publication_year, description: initialData.description || '',
        price: initialData.price, stock_quantity: initialData.stock_quantity, genre_id: initialData.genre_id,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: CreateBookPayload) => ({
      ...prev,
      [name]: (type === 'number' || ['publication_year', 'price', 'stock_quantity'].includes(name)) 
              ? Number(value) : value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.genre_id) { setFormError('Harap pilih genre.'); return; }
    if (formData.price <= 0 || formData.stock_quantity < 0 || formData.publication_year <= 0) {
        setFormError('Data harga/stok/tahun terbit tidak valid.'); return;
    }
    
    await onSubmit({ 
      ...formData, 
      description: formData.description || null 
    });
  };

  if (formLoading) return <Loader message="Memuat form dan genre..." />;
  
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Input label="Book Title" name="title" value={formData.title} onChange={handleChange} required icon="📚" />
      
      <div style={{ display: 'flex', gap: '15px' }}>
        <Input label="Author" name="writer" value={formData.writer} onChange={handleChange} required icon="✍️" />
        <Input label="Publisher" name="publisher" value={formData.publisher} onChange={handleChange} required icon="🏛️" />
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <Input label="Price (Galleons)" name="price" type="number" value={formData.price} onChange={handleChange} required icon="💰" min={1} />
        <Input label="Stock Quantity" name="stock_quantity" type="number" value={formData.stock_quantity} onChange={handleChange} required icon="📦" min={0} />
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Genre</label>
            <select name="genre_id" value={formData.genre_id} onChange={handleChange} required style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}>
                <option value="" disabled>Pilih Genre</option>
                {genres.map(genre => (<option key={genre.id} value={genre.id}>{genre.name}</option>))}
            </select>
        </div>
        <Input label="ISBN" name="isbn" value={''} onChange={() => {}} icon="🔖" disabled placeholder="N/A" />
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <Input label="Publication Year" name="publication_year" type="number" value={formData.publication_year} onChange={handleChange} required icon="📅" max={new Date().getFullYear()} />
        <Input label="Condition" name="condition" value="New" onChange={() => {}} icon="✨" disabled />
      </div>
      
      <Input label="Description" name="description" value={formData.description || ''} onChange={handleChange} isTextArea icon="📝" />

      {(submitError || formError) && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>Error: {submitError || formError}</p>}

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Processing...' : submitLabel}
      </Button>
      
      <Button type="button" variant="secondary" onClick={() => window.history.back()} style={{ marginTop: '5px' }}>
        Cancel
      </Button>
    </form>
  );
};
export default BookForm;