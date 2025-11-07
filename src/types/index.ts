// Auth Types
export interface User {
  id: string
  email: string
  username?: string
  created_at?: string
  updated_at?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  username?: string
}

export interface AuthResponse {
  status: boolean
  message: string
  data: {
    access_token?: string
    id?: string
    email?: string
    username?: string
  }
}

// Book Types
export interface Book {
  id: string
  title: string
  writer: string
  publisher: string
  publication_year: number
  description?: string
  price: number
  stock_quantity: number
  genre_id: string
  created_at: string
  updated_at: string
  deleted_at?: string | null
  genre: Genre
}

export interface Genre {
  id: string
  name: string
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}

export interface BookCreateRequest {
  title: string
  writer: string
  publisher: string
  publication_year: number
  description?: string
  price: number
  stock_quantity: number
  genre_id: string
}

export interface BookListResponse {
  status: boolean
  meta: {
    total: number
    page: number
    limit: number
    pages: number
  }
  data: Book[]
}

// Transaction/Order Types
export interface OrderItem {
  id: string
  quantity: number
  order_id: string
  book_id: string
  created_at: string
  updated_at: string
  book: {
    id: string
    title: string
    price: number
    writer: string
  }
}

export interface Transaction {
  id: string
  user_id: string
  created_at: string
  updated_at: string
  user: {
    id: string
    email: string
    username: string
  }
  items: OrderItem[]
}

export interface CreateTransactionRequest {
  items: Array<{
    book_id: string
    quantity: number
  }>
}

export interface TransactionResponse {
  status: boolean
  message: string
  data: Transaction
}

export interface TransactionListResponse {
  status: boolean
  data: Transaction[]
}

// Generic API Response Type
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
