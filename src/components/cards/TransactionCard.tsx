import React from 'react'
import { useNavigate } from 'react-router-dom'

interface TransactionCardProps {
  id: string
  date: string
  totalAmount: number
  totalPrice: number
  status: string
  itemCount: number
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  id,
  date,
  totalAmount,
  totalPrice,
  status,
  itemCount,
}) => {
  const navigate = useNavigate()

  const getStatusClass = (status: string): string => {
    return `status status-${status.toLowerCase()}`
  }

  const handleViewDetails = () => {
    navigate(`/transactions/${id}`)
  }

  return (
    <div className="transaction-card">
      <div className="card-content">
        <div className="card-header">
          <h3 className="transaction-id">#{id}</h3>
          <span className={getStatusClass(status)}>{status}</span>
        </div>

        <div className="card-body">
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Date</span>
              <span className="value">{date}</span>
            </div>
            <div className="info-item">
              <span className="label">Items</span>
              <span className="value">{itemCount}</span>
            </div>
            <div className="info-item">
              <span className="label">Amount</span>
              <span className="value">{totalAmount}</span>
            </div>
            <div className="info-item">
              <span className="label">Total</span>
              <span className="price">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button className="view-btn" onClick={handleViewDetails}>
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionCard
