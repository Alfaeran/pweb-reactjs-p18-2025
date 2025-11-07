// src/services/bookService.ts
import axios from 'axios';
import { BookListResponse, Book, CreateBookPayload, Genre } from '../types/index';

const BASE_URL = 'http://localhost:4000'; 

// Helper untuk mendapatkan token dari localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/** GET /books?page=1&limit=12&q=keyword&sort=field:order */
export const fetchBooks = async (
  page: number,
  limit: number,
  query: string,
  sort: string = 'created_at:desc' // Default sort
): Promise<BookListResponse> => {
  const qParam = query ? `&q=${query}` : '';
  const sortParam = sort ? `&sort=${sort}` : '';
  
  // Menggunakan endpoint sesuai backend Anda: /books
  const url = `${BASE_URL}/books?page=${page}&limit=${limit}${qParam}${sortParam}`;
  
  const response = await axios.get<BookListResponse>(url);
  return response.data;
};

/** GET /books/:book_id */
export const getBookDetail = async (bookId: string): Promise<Book> => {
  const response = await axios.get<{ data: Book }>(`${BASE_URL}/books/${bookId}`);
  return response.data.data;
};

/** POST /books (Protected) */
export const createBook = async (payload: CreateBookPayload): Promise<Book> => {
  // Menggunakan endpoint sesuai backend Anda: /books (POST)
  const response = await axios.post<{ data: Book }>(
    `${BASE_URL}/books`, 
    payload, 
    getAuthHeaders() 
  );
  return response.data.data;
};

/** DELETE /books/:book_id (Protected) */
export const deleteBook = async (bookId: string): Promise<void> => {
  // Menggunakan endpoint sesuai backend Anda: /books/:book_id (DELETE)
  await axios.delete(`${BASE_URL}/books/${bookId}`, getAuthHeaders()); 
};

/** GET /genres (Untuk Form) */
export const fetchGenres = async (): Promise<Genre[]> => {
  // Menggunakan endpoint sesuai backend Anda: /genres
  const response = await axios.get<{ data: Genre[] }>(`${BASE_URL}/genres`);
  return response.data.data;
};