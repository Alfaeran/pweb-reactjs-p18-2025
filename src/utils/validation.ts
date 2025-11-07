import { VALIDATION_RULES, MESSAGES } from './constants'

/**
 * Validation error object
 */
export interface ValidationErrors {
  isValid: boolean
  errors: {
    [key: string]: string
  }
}

/**
 * Validate email format
 * @param email Email address to validate
 * @returns True if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL_PATTERN.test(email)
}

/**
 * Validate password
 * @param password Password to validate
 * @returns Validation error object
 */
export const validatePassword = (password: string): ValidationErrors => {
  const errors: { [key: string]: string } = {}

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    errors.password = `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validate login form
 * @param email User email
 * @param password User password
 * @returns Validation error object
 */
export const validateLoginForm = (email: string, password: string): ValidationErrors => {
  const errors: { [key: string]: string } = {}

  // Email validation
  if (!email) {
    errors.email = 'Email is required'
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Password validation
  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    errors.password = `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validate registration form
 * @param email User email
 * @param password User password
 * @param confirmPassword Password confirmation
 * @param name User name
 * @returns Validation error object
 */
export const validateRegisterForm = (
  email: string,
  password: string,
  confirmPassword: string,
  name: string
): ValidationErrors => {
  const errors: { [key: string]: string } = {}

  // Name validation
  if (!name) {
    errors.name = 'Name is required'
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  // Email validation
  if (!email) {
    errors.email = 'Email is required'
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Password validation
  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    errors.password = `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`
  }

  // Confirm password validation
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validate book form
 * @param title Book title
 * @param writer Book writer/author
 * @param price Book price
 * @param stock Book stock quantity
 * @param genreId Genre ID
 * @returns Validation error object
 */
export const validateBookForm = (
  title: string,
  writer: string,
  price: number | string,
  stock: number | string,
  genreId: string
): ValidationErrors => {
  const errors: { [key: string]: string } = {}

  // Title validation
  if (!title) {
    errors.title = 'Book title is required'
  } else if (title.length > VALIDATION_RULES.BOOK_TITLE_MAX_LENGTH) {
    errors.title = `Title must not exceed ${VALIDATION_RULES.BOOK_TITLE_MAX_LENGTH} characters`
  }

  // Writer validation
  if (!writer) {
    errors.writer = 'Author/Writer is required'
  } else if (writer.length > VALIDATION_RULES.BOOK_WRITER_MAX_LENGTH) {
    errors.writer = `Writer must not exceed ${VALIDATION_RULES.BOOK_WRITER_MAX_LENGTH} characters`
  }

  // Price validation
  if (price === '' || price === null || price === undefined) {
    errors.price = 'Price is required'
  } else {
    const priceNum = typeof price === 'string' ? parseFloat(price) : price
    if (isNaN(priceNum)) {
      errors.price = 'Price must be a valid number'
    } else if (priceNum < VALIDATION_RULES.PRICE_MIN) {
      errors.price = `Price must be at least ${VALIDATION_RULES.PRICE_MIN}`
    } else if (priceNum > VALIDATION_RULES.PRICE_MAX) {
      errors.price = `Price cannot exceed ${VALIDATION_RULES.PRICE_MAX}`
    }
  }

  // Stock validation
  if (stock === '' || stock === null || stock === undefined) {
    errors.stock = 'Stock is required'
  } else {
    const stockNum = typeof stock === 'string' ? parseInt(stock, 10) : stock
    if (isNaN(stockNum)) {
      errors.stock = 'Stock must be a valid number'
    } else if (stockNum < VALIDATION_RULES.STOCK_MIN) {
      errors.stock = `Stock must be at least ${VALIDATION_RULES.STOCK_MIN}`
    } else if (stockNum > VALIDATION_RULES.STOCK_MAX) {
      errors.stock = `Stock cannot exceed ${VALIDATION_RULES.STOCK_MAX}`
    }
  }

  // Genre validation
  if (!genreId) {
    errors.genreId = 'Please select a genre'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validate transaction item
 * @param bookId Book ID
 * @param quantity Quantity
 * @returns Validation error object
 */
export const validateTransactionItem = (bookId: string, quantity: number): ValidationErrors => {
  const errors: { [key: string]: string } = {}

  if (!bookId) {
    errors.bookId = 'Book ID is required'
  }

  if (!quantity || quantity < 1) {
    errors.quantity = 'Quantity must be at least 1'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validate search query
 * @param query Search query string
 * @returns True if valid, false otherwise
 */
export const validateSearchQuery = (query: string): boolean => {
  return query.trim().length > 0
}

/**
 * Format validation errors for display
 * @param errors Validation error object
 * @returns Formatted error messages
 */
export const formatValidationErrors = (errors: { [key: string]: string }): string => {
  return Object.values(errors).join(', ')
}
