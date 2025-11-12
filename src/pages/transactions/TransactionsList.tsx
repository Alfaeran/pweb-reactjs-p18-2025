import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { transactionService } from '../../services/transactionService'
import { Transaction } from '../../types'
import './TransactionsList.css'

const TransactionsList: React.FC = () => {
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchId, setSearchId] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'price-desc' | 'price-asc' | 'date-desc' | 'date-asc'>('date-desc')
  const itemsPerPage = 10

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        const response = await transactionService.getTransactions(currentPage, itemsPerPage)
        if (response.status && Array.isArray(response.data)) {
          setTransactions(response.data)
        }
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load transactions')
        setTransactions([])
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [currentPage])

  // Filter transactions by ID
  let filteredTransactions = transactions.filter((transaction) =>
    transaction.id.toLowerCase().includes(searchId.toLowerCase())
  )

  // Sort transactions based on sortBy
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const getTotalPrice = (transaction: Transaction) => {
      return transaction.items.reduce((sum, item) => sum + item.book.price * item.quantity, 0)
    }

    switch (sortBy) {
      case 'price-desc':
        return getTotalPrice(b) - getTotalPrice(a)
      case 'price-asc':
        return getTotalPrice(a) - getTotalPrice(b)
      case 'date-desc':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case 'date-asc':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      default:
        return 0
    }
  })

  // Paginate
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleViewDetails = (id: string) => {
    navigate(`/transactions/${id}`)
  }

  // Calculate total amount and price from items
  const calculateTotals = (transaction: Transaction) => {
    const totalQty = transaction.items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = transaction.items.reduce((sum, item) => sum + item.book.price * item.quantity, 0)
    return { totalQty, totalPrice }
  }

  if (loading) {
    return (
      <div className="transactions-container loading-state">
        <div className="loader">Loading transactions...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="transactions-container error-state">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="transactions-container">
      {/* Header Section */}
      <div className="transactions-header">
        <div className="header-content">
          <h1 className="header-title">Transaction History</h1>
          <p className="header-subtitle">Your magical ledger of purchases</p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="transactions-controls">
        <div className="control-group">
          <div className="search-wrapper">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="var(--sepia)"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by Transaction ID..."
              value={searchId}
              onChange={(e) => {
                setSearchId(e.target.value)
                setCurrentPage(1)
              }}
              className="search-input"
            />
          </div>
        </div>

        <div className="sort-controls">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as 'price-desc' | 'price-asc' | 'date-desc' | 'date-asc')
              setCurrentPage(1)
            }}
            className="sort-select"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="price-desc">Highest Price</option>
            <option value="price-asc">Lowest Price</option>
          </select>

          <button 
            className="add-transaction-btn"
            onClick={() => navigate('/transactions/add')}
            title="Create a new transaction"
          >
            + Add Transaction
          </button>

          <div className="results-info">
            <span className="results-count">
              {sortedTransactions.length} transaction{sortedTransactions.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      {paginatedTransactions.length > 0 ? (
        <div className="transactions-content">
          <div className="table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th className="col-id">Transaction ID</th>
                  <th className="col-date">Date</th>
                  <th className="col-items">Items</th>
                  <th className="col-qty">Quantity</th>
                  <th className="col-price">Total Price</th>
                  <th className="col-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction) => {
                  const { totalQty, totalPrice } = calculateTotals(transaction)
                  return (
                    <tr key={transaction.id} className="transaction-row">
                      <td className="col-id">
                        <span className="transaction-id">{transaction.id.substring(0, 8)}...</span>
                      </td>
                      <td className="col-date">
                        <span className="date-value">
                          {new Date(transaction.created_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </td>
                      <td className="col-items">
                        <div className="items-list">
                          {transaction.items.slice(0, 2).map((item, idx) => (
                            <span key={idx} className="item-tag">
                              {item.book.title}
                            </span>
                          ))}
                          {transaction.items.length > 2 && (
                            <span className="item-tag more">+{transaction.items.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="col-qty">
                        <span className="qty-badge">{totalQty}</span>
                      </td>
                      <td className="col-price">
                        <span className="price-value">Rp {totalPrice.toLocaleString('id-ID')}</span>
                      </td>
                      <td className="col-action">
                        <button
                          className="action-button"
                          onClick={() => handleViewDetails(transaction.id)}
                          title="View transaction details"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>

              <div className="pagination-info">
                Page <span className="current-page">{currentPage}</span> of{' '}
                <span className="total-pages">{totalPages}</span>
              </div>

              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📖</div>
          <h3>No Transactions Found</h3>
          <p>
            {searchId
              ? `No transactions match your search for "${searchId}"`
              : 'Your transaction history is empty. Start shopping!'}
          </p>
        </div>
      )}
    </div>
  )
}

export default TransactionsList
