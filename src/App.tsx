import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ProtectedRoute from './components/common/ProtectedRoute'

// Auth Pages
const Login = () => <div style={{ padding: '20px', textAlign: 'center' }}>Login Coming Soon...</div>
const Register = () => <div style={{ padding: '20px', textAlign: 'center' }}>Register Coming Soon...</div>

// Books Pages
const BooksList = () => <div style={{ padding: '20px', textAlign: 'center' }}>Books List Coming Soon...</div>
const BookDetail = () => <div style={{ padding: '20px', textAlign: 'center' }}>Book Detail Coming Soon...</div>
const AddBook = () => <div style={{ padding: '20px', textAlign: 'center' }}>Add Book Coming Soon...</div>

// Transactions Pages
import TransactionsList from './pages/transactions/TransactionsList'
import TransactionDetail from './pages/transactions/TransactionDetail'
import Checkout from './pages/transactions/Checkout'

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar userEmail="maurigar@gmail.com" />
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/transactions" />} />

            {/* Protected Routes - Books */}
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <BooksList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/:id"
              element={
                <ProtectedRoute>
                  <BookDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/add"
              element={
                <ProtectedRoute>
                  <AddBook />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Transactions */}
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <TransactionsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions/:id"
              element={
                <ProtectedRoute>
                  <TransactionDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/transactions" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
