// src/components/common/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading, token } = useAuth();

  console.log('ProtectedRoute Check:', { isAuthenticated, loading, hasToken: !!token });

  // Tampilkan loading spinner selagi verifikasi token
  if (loading) {
    return <div>Memuat sesi Anda...</div>;
  }

  // Jika tidak terautentikasi, arahkan ke halaman login
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Jika terautentikasi, tampilkan halaman yang diminta (child route)
  console.log('Authenticated, rendering protected content');
  return <Outlet />;
};

export default ProtectedRoute;