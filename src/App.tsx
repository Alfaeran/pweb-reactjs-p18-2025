// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Komponen Halaman Utama (Contoh)
const HomePage = () => {
  return (
    <div style={{ flex: 1, padding: '2rem', color: 'white' }}>
      Selamat datang! Ini adalah Halaman Utama (BooksList).
    </div>
  );
};

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
    </Routes>
  );
}

export default App;