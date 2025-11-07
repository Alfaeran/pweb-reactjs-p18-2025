import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ProtectedRoute from './components/common/ProtectedRoute'
import { AuthContext } from './context/AuthContext'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'

// Public Pages
import PublicLanding from './pages/public/PublicLanding'

// Books Pages
const BooksList = () => <div style={{ padding: '20px', textAlign: 'center' }}>Books List Coming Soon...</div>
const BookDetail = () => <div style={{ padding: '20px', textAlign: 'center' }}>Book Detail Coming Soon...</div>
const AddBook = () => <div style={{ padding: '20px', textAlign: 'center' }}>Add Book Coming Soon...</div>

// Transactions Pages
import TransactionsList from './pages/transactions/TransactionsList'
import TransactionDetail from './pages/transactions/TransactionDetail'
import Checkout from './pages/transactions/Checkout'

// Role-based Landing Route Component
const Dashboard = () => {
  const { user, isAuthenticated } = useContext(AuthContext) || {}

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  // Admin users see admin dashboard
  if (user?.role === 'admin') {
    return <AdminDashboard />
  }

  // Regular users see public landing
  return <PublicLanding />
}

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext) || {}

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#3b2a1a',
        color: '#FFD700',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Auth Routes - No Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Route - Shows admin dashboard or public landing based on role */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* All other routes with Navbar & Footer */}
        <Route
          path="/"
          element={
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar userEmail="" />
              <main style={{ flex: 1 }}>
                <Routes>
                  {/* Root - redirect to dashboard */}
                  <Route path="/" element={<Navigate to="/dashboard" />} />

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
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        {/* Catch remaining routes */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  )
}

export default App
