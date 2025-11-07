import { apiClient } from './api'
import { Book, BookListResponse, BookCreateRequest } from '@/types'

export const bookService = {
  getBooks: async (page: number = 1, limit: number = 10, search: string = '') => {
    const response = await apiClient.get<BookListResponse>('/books', {
      params: {
        page,
        limit,
        q: search,
      },
    })
    return response.data
  },

  getBookById: async (id: string) => {
    const response = await apiClient.get<{ status: boolean; data: Book }>(`/books/${id}`)
    return response.data
  },

  getBooksByGenre: async (genreId: string, page: number = 1, limit: number = 10, search: string = '') => {
    const response = await apiClient.get<BookListResponse>(`/books/genre/${genreId}`, {
      params: {
        page,
        limit,
        q: search,
      },
    })
    return response.data
  },

  createBook: async (bookData: BookCreateRequest) => {
    const response = await apiClient.post<{ status: boolean; message: string; data: Book }>('/books', bookData)
    return response.data
  },

  updateBook: async (id: string, bookData: Partial<BookCreateRequest>) => {
    const response = await apiClient.patch<{ status: boolean; message: string; data: Book }>(`/books/${id}`, bookData)
    return response.data
  },

  deleteBook: async (id: string) => {
    const response = await apiClient.delete<{ status: boolean; message: string }>(`/books/${id}`)
    return response.data
  },
}
