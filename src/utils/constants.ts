// App Configuration
export const APP_NAME = 'Hogwarts Library & Bookshop'
export const API_BASE_URL = 'http://localhost:3000/api'

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  AUTH_USER: 'auth_user',
  CART: 'cart',
}

// Routing Paths
export const ROUTES = {
  // Public
  LOGIN: '/login',
  REGISTER: '/register',

  // Protected
  BOOKS_LIST: '/books',
  BOOK_DETAIL: '/books/:id',
  ADD_BOOK: '/books/add',
  TRANSACTIONS_LIST: '/transactions',
  TRANSACTION_DETAIL: '/transactions/:id',
  CHECKOUT: '/checkout',
}

// Transaction Status
export const TRANSACTION_STATUS = {
  COMPLETED: 'completed',
  PENDING: 'pending',
  CANCELLED: 'cancelled',
}

// Book Conditions
export const BOOK_CONDITIONS = {
  NEW: 'new',
  GOOD: 'good',
  FAIR: 'fair',
  POOR: 'poor',
}

// Messages
export const MESSAGES = {
  // Success Messages
  SUCCESS_LOGIN: 'Login successful! Welcome back.',
  SUCCESS_REGISTER: 'Registration successful! Please log in.',
  SUCCESS_ADD_BOOK: 'Book added successfully!',
  SUCCESS_UPDATE_BOOK: 'Book updated successfully!',
  SUCCESS_DELETE_BOOK: 'Book deleted successfully!',
  SUCCESS_CHECKOUT: 'Order placed successfully!',

  // Error Messages
  ERROR_LOGIN: 'Invalid email or password',
  ERROR_REGISTER: 'Registration failed. Please try again.',
  ERROR_NETWORK: 'Network error. Please check your connection.',
  ERROR_UNAUTHORIZED: 'Unauthorized. Please log in.',
  ERROR_NOT_FOUND: 'Resource not found.',
  ERROR_GENERIC: 'An error occurred. Please try again.',
  ERROR_CART_EMPTY: 'Your cart is empty.',
  ERROR_INVALID_FORM: 'Please fill in all required fields.',

  // Info Messages
  INFO_LOADING: 'Loading...',
  INFO_EMPTY: 'No items found.',
  INFO_LOGOUT: 'You have been logged out.',
}

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  BOOK_TITLE_MAX_LENGTH: 255,
  BOOK_WRITER_MAX_LENGTH: 100,
  PRICE_MIN: 0,
  PRICE_MAX: 999999999,
  STOCK_MIN: 0,
  STOCK_MAX: 999999,
}

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  DEFAULT_PAGE: 1,
}

// Sort Options
export const SORT_OPTIONS = {
  DATE_DESC: { label: 'Latest', value: 'date_desc' },
  DATE_ASC: { label: 'Oldest', value: 'date_asc' },
  AMOUNT_DESC: { label: 'Highest Amount', value: 'amount_desc' },
  AMOUNT_ASC: { label: 'Lowest Amount', value: 'amount_asc' },
  PRICE_DESC: { label: 'Highest Price', value: 'price_desc' },
  PRICE_ASC: { label: 'Lowest Price', value: 'price_asc' },
}

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGOUT: '/auth/logout',

  // Books
  BOOKS_LIST: '/books',
  BOOKS_DETAIL: '/books/:id',
  BOOKS_CREATE: '/books',
  BOOKS_UPDATE: '/books/:id',
  BOOKS_DELETE: '/books/:id',
  GENRES: '/genres',

  // Transactions
  TRANSACTIONS_LIST: '/transactions',
  TRANSACTIONS_DETAIL: '/transactions/:id',
  TRANSACTIONS_CREATE: '/transactions',
  TRANSACTIONS_SEARCH: '/transactions/search',
}

// Timeouts (in milliseconds)
export const TIMEOUTS = {
  API_REQUEST: 10000,
  DEBOUNCE_SEARCH: 300,
}

// Limits
export const LIMITS = {
  MAX_CART_ITEMS: 100,
  MAX_BOOKS_PER_TRANSACTION: 50,
}
