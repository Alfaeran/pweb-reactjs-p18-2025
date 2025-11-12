import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { transactionService } from '../../services/transactionService'
import { bookService } from '../../services/bookService'
import { Book } from '../../types'
import './AddTransaction.css'

interface CartItem {
  book_id: string
  quantity: number
  book?: any
}

const AddTransaction: React.FC = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Fetch available books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const booksRes = await bookService.getBooks(1, 100)
        setBooks(booksRes.data || [])
        setError(null)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load books')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const handleQuantityChange = (bookId: string, quantity: number) => {
    if (quantity < 1) return
    setCartItems((items) =>
      items.map((item) => (item.book_id === bookId ? { ...item, quantity } : item))
    )
  }

  const handleAddItem = (bookId: string) => {
    const existingItem = cartItems.find((item) => item.book_id === bookId)
    const book = books.find((b) => b.id === bookId)

    if (existingItem) {
      handleQuantityChange(bookId, existingItem.quantity + 1)
    } else {
      setCartItems([...cartItems, { book_id: bookId, quantity: 1, book }])
    }
  }

  const handleRemoveItem = (bookId: string) => {
    setCartItems((items) => items.filter((item) => item.book_id !== bookId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      setError('Transaction must have at least one item')
      return
    }

    try {
      setSubmitting(true)
      const result = await transactionService.createTransaction(
        cartItems.map((item) => ({ book_id: item.book_id, quantity: item.quantity }))
      )
      
      // Redirect to transaction detail page
      if (result.data?.id) {
        navigate(`/transactions/${result.data.id}`)
      } else {
        navigate('/transactions')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create transaction')
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="add-transaction-container loading">Loading...</div>
  }

  return (
    <div className="add-transaction-container">
      <button className="back-btn" onClick={() => navigate('/transactions')}>
        ← Back to Transactions
      </button>

      <div className="add-transaction-card">
        <h1>Create New Transaction</h1>
        <p className="subtitle">Select books and quantities to create a new transaction</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          {/* Available Books Section */}
          <div className="form-section">
            <h3>Available Books</h3>
            {books.length === 0 ? (
              <p className="empty-message">No books available</p>
            ) : (
              <div className="books-grid">
                {books.map((book) => (
                  <div key={book.id} className="book-option">
                    <div className="book-info">
                      <h4>{book.title}</h4>
                      <p className="book-writer">{book.writer}</p>
                      <p className="book-price">Rp {book.price.toLocaleString('id-ID')}</p>
                      <p className="book-stock">Stock: {book.stock_quantity}</p>
                    </div>
                    <button
                      type="button"
                      className="add-btn"
                      onClick={() => handleAddItem(book.id)}
                      disabled={
                        cartItems.some((item) => item.book_id === book.id) ||
                        book.stock_quantity === 0
                      }
                    >
                      {cartItems.some((item) => item.book_id === book.id) ? '✓ Added' : 'Add'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Items Section */}
          <div className="form-section">
            <h3>Selected Books ({cartItems.length})</h3>

            {cartItems.length === 0 ? (
              <p className="empty-message">No books selected yet</p>
            ) : (
              <div className="items-list">
                {cartItems.map((item) => (
                  <div key={item.book_id} className="item-row">
                    <div className="item-info">
                      <h4>{item.book?.title || 'Unknown Book'}</h4>
                      <p className="item-writer">{item.book?.writer}</p>
                      <p className="item-price">Rp {(item.book?.price || 0).toLocaleString('id-ID')}</p>
                    </div>
                    <div className="item-quantity">
                      <label>Qty:</label>
                      <input
                        type="number"
                        min="1"
                        max={item.book?.stock_quantity || 100}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.book_id, parseInt(e.target.value) || 1)}
                      />
                    </div>
                    <div className="item-subtotal">
                      Rp {((item.book?.price || 0) * item.quantity).toLocaleString('id-ID')}
                    </div>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.book_id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total Section */}
          <div className="form-section total-section">
            <div className="total-row">
              <span>Total Items:</span>
              <span>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <div className="total-row grand-total">
              <span>Total Price:</span>
              <span>
                Rp{' '}
                {cartItems
                  .reduce((sum, item) => sum + (item.book?.price || 0) * item.quantity, 0)
                  .toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={submitting || cartItems.length === 0}
            >
              {submitting ? 'Creating...' : 'Create Transaction'}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/transactions')}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTransaction
