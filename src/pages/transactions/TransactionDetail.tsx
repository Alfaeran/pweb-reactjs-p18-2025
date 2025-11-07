import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface TransactionItem {
  bookId: string
  title: string
  quantity: number
  price: number
  subtotal: number
}

interface Transaction {
  id: string
  date: string
  totalAmount: number
  totalPrice: number
  items: TransactionItem[]
  status: string
}

const TransactionDetail: React.FC = () => {
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch transaction details
    const fetchTransaction = async () => {
      try {
        setLoading(true)
        // const transactionId = window.location.pathname.split('/').pop()
        // const response = await transactionService.getTransactionById(transactionId)
        // setTransaction(response)
        setError(null)
      } catch (err) {
        setError('Failed to load transaction details')
      } finally {
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [])

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
            <span className="value">{transaction.date}</span>
          </div>
          <div className="info-row">
            <span className="label">Status:</span>
            <span className={`status status-${transaction.status.toLowerCase()}`}>
              {transaction.status}
            </span>
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
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>Rp {item.price.toLocaleString('id-ID')}</td>
                    <td className="subtotal">Rp {item.subtotal.toLocaleString('id-ID')}</td>
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
            <span className="value">{transaction.totalAmount}</span>
          </div>
          <div className="summary-row total">
            <span className="label">Total Price:</span>
            <span className="value">Rp {transaction.totalPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Watermark */}
        <div className="watermark">⚡</div>

        {/* Footer */}
        <div className="receipt-footer">
          <p>Thank you for your purchase!</p>
          <p className="authentication">Hogwarts Library & Bookshop</p>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetail
