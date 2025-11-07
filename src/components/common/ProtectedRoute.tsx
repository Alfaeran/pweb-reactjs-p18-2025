// src/components/common/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Tampilkan loading spinner selagi verifikasi token
  if (loading) {
    return <div>Memuat sesi Anda...</div>;
  }

  // Jika tidak terautentikasi, arahkan ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika terautentikasi, tampilkan halaman yang diminta (child route)
  return <Outlet />;
};

export default ProtectedRoute;