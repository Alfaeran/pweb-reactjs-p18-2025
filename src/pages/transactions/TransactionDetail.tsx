import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { transactionService } from '../../services/transactionService'
import { Transaction } from '../../types'
import './TransactionDetail.css'

const TransactionDetail: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    // Fetch transaction details
    const fetchTransaction = async () => {
      try {
        if (!id) {
          setError('Invalid transaction ID')
          return
        }
        setLoading(true)
        const response = await transactionService.getTransactionById(id)
        setTransaction(response.data)
        setError(null)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load transaction details')
      } finally {
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this transaction? This action cannot be undone.')) {
      return
    }

    try {
      setDeleting(true)
      await transactionService.deleteTransaction(id!)
      navigate('/transactions')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete transaction')
      setDeleting(false)
    }
  }

  if (loading) {
    return <div className="transaction-detail-container loading">Loading...</div>
  }

  if (error) {
    return <div className="transaction-detail-container error">{error}</div>
  }

  if (!transaction) {
    return <div className="transaction-detail-container empty">Transaction not found</div>
  }

  return (
    <div className="transaction-detail-container">
      <button className="back-btn" onClick={() => navigate('/transactions')}>
        ← Back to Transactions
      </button>

      <div className="receipt-card">
        {/* Receipt Header with Wax Seal */}
        <div className="receipt-header">
          <div className="wax-seal">🧾</div>
          <h1>Transaction Receipt</h1>
        </div>

        {/* Transaction Info */}
        <div className="receipt-info">
          <div className="info-row">
            <span className="label">Transaction ID:</span>
            <span className="value">{transaction.id}</span>
          </div>
          <div className="info-row">
            <span className="label">Date:</span>
            <span className="value">{new Date(transaction.created_at).toLocaleDateString('id-ID')}</span>
          </div>
          <div className="info-row">
            <span className="label">User:</span>
            <span className="value">{transaction.user.email}</span>
          </div>
        </div>

        <div className="divider"></div>

        {/* Items Table */}
        <div className="items-section">
          <h2>Purchased Items</h2>
          <div className="table-wrapper">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {transaction.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.book.title}</td>
                    <td>{item.quantity}</td>
                    <td>Rp {item.book.price.toLocaleString('id-ID')}</td>
                    <td className="subtotal">Rp {(item.book.price * item.quantity).toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="divider"></div>

        {/* Summary */}
        <div className="receipt-summary">
          <div className="summary-row">
            <span className="label">Total Items:</span>
            <span className="value">{transaction.items.length}</span>
          </div>
          <div className="summary-row total">
            <span className="label">Total Price:</span>
            <span className="value">
              Rp{' '}
              {transaction.items
                .reduce((sum, item) => sum + item.book.price * item.quantity, 0)
                .toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Watermark */}
        <div className="watermark">⚡</div>

        {/* Footer */}
        <div className="receipt-footer">
          <p>Thank you for your purchase!</p>
          <p className="authentication">Hogwarts Library & Bookshop</p>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className="edit-btn" 
            onClick={() => navigate(`/transactions/edit/${id}`)}
            disabled={deleting}
          >
            ✎ Edit Transaction
          </button>
          <button 
            className="delete-btn" 
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : '🗑️ Delete Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetail
