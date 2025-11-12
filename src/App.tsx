import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ProtectedRoute from './components/common/ProtectedRoute'
import { AuthContext } from './context/AuthContext'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Books Pages
import BooksList from './pages/books/BooksList'
import BookDetail from './pages/books/BookDetail'
import AddBook from './pages/books/AddBook'
import EditBook from './pages/books/EditBook'

// Transactions Pages
import TransactionsList from './pages/transactions/TransactionsList'
import TransactionDetail from './pages/transactions/TransactionDetail'
import AddTransaction from './pages/transactions/AddTransaction'
import EditTransaction from './pages/transactions/EditTransaction'
import NewTransaction from './pages/transactions/NewTransaction'
import Checkout from './pages/transactions/Checkout'

// Role-based Landing Route Component
const Dashboard = () => {
  const { user, isAuthenticated } = useContext(AuthContext) || {}

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  // Admin dashboard shows books list
  return <BooksList />
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

        {/* All other routes with Navbar & Footer */}
        <Route
          path="/*"
          element={
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar userEmail="" />
              <main style={{ flex: 1 }}>
                <Routes>
                  {/* Dashboard - Books List */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <BooksList />
                      </ProtectedRoute>
                    }
                  />

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

                  <Route
                    path="/books/edit/:id"
                    element={
                      <ProtectedRoute>
                        <EditBook />
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
                    path="/transactions/add"
                    element={
                      <ProtectedRoute>
                        <AddTransaction />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/transactions/new"
                    element={
                      <ProtectedRoute>
                        <NewTransaction />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/transactions/edit/:id"
                    element={
                      <ProtectedRoute>
                        <EditTransaction />
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
