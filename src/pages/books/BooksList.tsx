// src/pages/books/BooksList.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { bookService } from '../../services/bookService';
import { BookListResponse, Book } from '../../types/index';
import BookCard from '../../components/cards/BookCard';
import Loader from '../../components/ui/Loader';
import Pagination from '../../components/ui/Pagination';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const LIMIT = 12; 
const SORT_OPTIONS = [
  { value: 'title:asc', label: 'Title (A-Z)' },
  { value: 'publication_year:desc', label: 'Year (Newest)' },
];

const BooksList = () => {
  const [booksData, setBooksData] = useState<BookListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentQuery, setCurrentQuery] = useState(''); 
  const [sortOption, setSortOption] = useState('title:asc');
  const [conditionFilter, setConditionFilter] = useState(''); 

  const loadBooks = useCallback(async (page: number, query: string, sort: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getBooks(page, LIMIT, query);
      setBooksData(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal memuat daftar buku. Cek koneksi API dan Server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooks(currentPage, currentQuery, sortOption);
  }, [currentPage, currentQuery, sortOption, loadBooks]); 

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); 
    setCurrentQuery(searchTerm); 
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setCurrentPage(1); 
  };
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const books = booksData?.data || [];
  const meta = booksData?.meta;
  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;
  const showEmptyState = !loading && books.length === 0 && !error;

  return (
    <div style={{ padding: '20px', minHeight: '80vh', backgroundColor: '#d9d3c5' }}>
      <div style={{ textAlign: 'center', backgroundColor: '#3b2a1a', color: '#eab308', padding: '40px 0', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>MAGICAL BOOKS COLLECTION</h1>
        <p style={{ margin: '5px 0 0' }}>Explore our enchanted library</p>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', padding: '0 20px', flexWrap: 'wrap' }}>
        <form onSubmit={handleSearchSubmit} style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <input type="text" placeholder="🔍 Search books or authors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #5a4632' }} />
        </form>

        <select value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #5a4632' }}>
          <option value="">All Conditions</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        
        <select value={sortOption} onChange={handleSortChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #5a4632' }}>
          {SORT_OPTIONS.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
        </select>
        
        <Link to="/books/add">
          <Button variant="primary" style={{ height: '100%', minWidth: '150px' }}>+ Add New Book</Button>
        </Link>
      </div>

      {loading && <Loader message="Memuat Koleksi Buku Ajaib..." />}
      {error && <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Error: {error}</div>}
      
      {showEmptyState && (<div style={{ textAlign: 'center', padding: '50px' }}><p style={{ fontSize: '1.2em', color: '#5a4632' }}>Perpustakaan kosong!</p></div>)}

      {!loading && books.length > 0 && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', padding: '0 20px' }}>
            {books.map((book: Book) => (<BookCard key={book.id} book={book} />))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};
export default BooksList;