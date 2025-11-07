// src/pages/auth/Register.tsx
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import RegisterForm from '../../components/forms/RegisterForm';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">REGISTER NEW STUDENT</h2>
        <p className="login-subtitle">Create your account</p>
        
        <RegisterForm />

        <p className="register-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;