// src/pages/auth/Login.tsx
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm';
import { useAuth } from '../../context/AuthContext';
// Import CSS dari panduan sebelumnya untuk styling
// (Saya asumsikan Anda menyimpannya di 'Login.css')
import './Login.css'; 

const Login = () => {
  const { isAuthenticated, loading } = useAuth();

  // Jika sedang loading verifikasi token, jangan tampilkan apa-apa
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Jika sudah login, redirect ke halaman utama
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        {/* <img src={logo} alt="Hogwarts Logo" className="login-logo" /> */}
        <h2 className="login-title">WELCOME TO HOGWARTS LIBRARY</h2>
        <p className="login-subtitle">Enter your credentials to continue</p>
        
        <LoginForm />

        <p className="register-link">
          New student? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
