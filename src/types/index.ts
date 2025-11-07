// src/types/index.ts

export interface Genre {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Book {
  id: string;
  title: string;
  writer: string;
  publisher: string;
  publication_year: number;
  description?: string | null;
  price: number;
  stock_quantity: number;
  genre_id: string;
  genre: Genre;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface BookListResponse {
  status: boolean;
  meta: Meta;
  data: Book[];
}

export interface BookDetailResponse {
  status: boolean;
  data: Book;
}

export interface CreateBookPayload {
  title: string;
  writer: string;
  publisher: string;
  publication_year: number;
  description?: string | null;
  price: number;
  stock_quantity: number;
  genre_id: string;
}

export interface UpdateBookPayload extends Partial<CreateBookPayload> {}

export interface ErrorResponse {
  status: false;
  message: string;
  field?: string;
}
