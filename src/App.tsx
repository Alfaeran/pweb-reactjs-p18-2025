<<<<<<< HEAD
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
=======
// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
>>>>>>> origin/main
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

<<<<<<< HEAD
// Import book components
import BooksList from './pages/books/BooksList';
import BookDetail from './pages/books/BookDetail';
import AddBook from './pages/books/AddBook';

// Transactions Page Component
const TransactionsPage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-yellow-500 mb-4">My Transactions</h1>
    <div className="bg-brown-800 p-4 rounded-lg">
      <p className="text-yellow-100">Transaction history will appear here.</p>
    </div>
  </div>
);

// Protected Layout Component
const ProtectedLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brown-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
=======
// Komponen Halaman Utama (Contoh)
const HomePage = () => {
  return (
    <div style={{ flex: 1, padding: '2rem', color: 'white' }}>
      Selamat datang! Ini adalah Halaman Utama (BooksList).
>>>>>>> origin/main
    </div>
  );
};

<<<<<<< HEAD
const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route index element={<BooksList />} />
          <Route path="books" element={<BooksList />} />
          <Route path="books/add" element={<AddBook />} />
          <Route path="books/:id" element={<BookDetail />} />
          <Route path="transactions" element={<TransactionsPage />} />
        </Route>
      </Route>

      {/* Catch-all redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
=======
// Komponen Halaman Transaksi (Contoh)
const TransactionsPage = () => {
   return (
    <div style={{ flex: 1, padding: '2rem', color: 'white' }}>
      Ini adalah Halaman Transaksi.
    </div>
  );
}

// Layout untuk Halaman yang Terproteksi
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#2a1a0a' }}>
    <Navbar />
    {children}
    <Footer />
  </div>
);


function App() {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rute Terproteksi */}
      <Route element={<ProtectedRoute />}>
        <Route 
          path="/" 
          element={
            <ProtectedLayout>
              <HomePage />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/transactions" 
          element={
            <ProtectedLayout>
              <TransactionsPage />
            </ProtectedLayout>
          } 
        />
        {/* Tambahkan rute terproteksi lainnya di sini */}
      </Route>
>>>>>>> origin/main
    </Routes>
  );
}

export default App;