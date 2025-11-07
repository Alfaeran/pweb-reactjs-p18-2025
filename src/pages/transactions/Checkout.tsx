import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface CartItem {
  bookId: string
  title: string
  price: number
  quantity: number
}

const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderSummary, setOrderSummary] = useState({
    totalItems: 0,
    totalPrice: 0,
  })

  useEffect(() => {
    // Load cart from localStorage or API
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      const items = JSON.parse(storedCart)
      setCartItems(items)
      calculateSummary(items)
    }
  }, [])

  const calculateSummary = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setOrderSummary({ totalItems, totalPrice })
  }

  const handleQuantityChange = (bookId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(bookId)
      return
    }

    const updatedCart = cartItems.map((item) =>
      item.bookId === bookId ? { ...item, quantity: newQuantity } : item
    )

    setCartItems(updatedCart)
    calculateSummary(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleRemoveItem = (bookId: string) => {
    const updatedCart = cartItems.filter((item) => item.bookId !== bookId)
    setCartItems(updatedCart)
    calculateSummary(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Cart is empty')
      return
    }

    try {
      setLoading(true)
      setError(null)

      // const transactionData = {
      //   items: cartItems.map(item => ({
      //     bookId: item.bookId,
      //     quantity: item.quantity
      //   }))
      // }
      // const response = await transactionService.createTransaction(transactionData)
      // localStorage.removeItem('cart')
      // navigate(`/transactions/${response.id}`)

      setError(null)
    } catch (err) {
      setError('Failed to complete checkout')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0 && !loading) {
    return (
      <div className="checkout-container empty">
        <div className="empty-state">
          <div className="coin-icon">🪙</div>
          <h2>Your cart is empty</h2>
          <p>Add books to your cart to proceed with checkout</p>
          <button className="continue-btn" onClick={() => navigate('/books')}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <h1>Checkout - Gringotts Vault</h1>

      <div className="checkout-content">
        {/* Cart Items */}
        <div className="cart-section">
          <h2>Your Items</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.bookId} className="cart-item">
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="price">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>

                <div className="quantity-control">
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.bookId, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.bookId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="item-subtotal">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.bookId)}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary - Sticky */}
        <aside className="order-summary">
          <div className="summary-card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items:</span>
              <span className="value">{orderSummary.totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span className="value">Rp {orderSummary.totalPrice.toLocaleString('id-ID')}</span>
            </div>

            <div className="summary-row">
              <span>Shipping:</span>
              <span className="value">Free</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total:</span>
              <span className="value">Rp {orderSummary.totalPrice.toLocaleString('id-ID')}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={loading || cartItems.length === 0}
            >
              {loading ? 'Processing...' : 'Complete Purchase'}
            </button>

            <button
              className="continue-shopping-btn"
              onClick={() => navigate('/books')}
              disabled={loading}
            >
              Continue Shopping
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Checkout
