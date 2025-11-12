import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { transactionService } from '../../services/transactionService'
import { bookService } from '../../services/bookService'
import { Transaction, Book } from '../../types'
import './EditTransaction.css'

interface CartItem {
  book_id: string
  quantity: number
  book?: any
}

const EditTransaction: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Fetch transaction and books
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          setError('Invalid transaction ID')
          return
        }

        setLoading(true)
        const [transactionRes, booksRes] = await Promise.all([
          transactionService.getTransactionById(id),
          bookService.getBooks(1, 100),
        ])

        setTransaction(transactionRes.data)
        setBooks(booksRes.data || [])

        // Initialize cart items from transaction
        const items: CartItem[] = transactionRes.data.items.map((item) => ({
          book_id: item.book_id,
          quantity: item.quantity,
          book: item.book,
        }))
        setCartItems(items)
        setError(null)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load transaction')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

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
      await transactionService.updateTransaction(id!, cartItems.map((item) => ({ book_id: item.book_id, quantity: item.quantity })))
      navigate(`/transactions/${id}`)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update transaction')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="edit-transaction-container loading">Loading...</div>
  }

  if (error && !transaction) {
    return <div className="edit-transaction-container error">{error}</div>
  }

  return (
    <div className="edit-transaction-container">
      <button className="back-btn" onClick={() => navigate(`/transactions/${id}`)}>
        ← Back to Transaction
      </button>

      <div className="edit-transaction-card">
        <h1>Edit Transaction</h1>
        <p className="transaction-id">Transaction ID: {id}</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          {/* Available Books Section */}
          <div className="form-section">
            <h3>Add Books to Transaction</h3>
            <div className="books-grid">
              {books.map((book) => (
                <div key={book.id} className="book-option">
                  <div className="book-info">
                    <h4>{book.title}</h4>
                    <p className="book-price">Rp {book.price.toLocaleString('id-ID')}</p>
                  </div>
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => handleAddItem(book.id)}
                    disabled={cartItems.some((item) => item.book_id === book.id)}
                  >
                    {cartItems.some((item) => item.book_id === book.id) ? '✓ Added' : 'Add'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Current Items Section */}
          <div className="form-section">
            <h3>Transaction Items ({cartItems.length})</h3>

            {cartItems.length === 0 ? (
              <p className="empty-message">No items in this transaction</p>
            ) : (
              <div className="items-list">
                {cartItems.map((item) => (
                  <div key={item.book_id} className="item-row">
                    <div className="item-info">
                      <h4>{item.book?.title || 'Unknown Book'}</h4>
                      <p className="item-price">Rp {(item.book?.price || 0).toLocaleString('id-ID')}</p>
                    </div>
                    <div className="item-quantity">
                      <label>Quantity:</label>
                      <input
                        type="number"
                        min="1"
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
              <span>{cartItems.length}</span>
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
              {submitting ? 'Updating...' : 'Update Transaction'}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(`/transactions/${id}`)}
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

export default EditTransaction
