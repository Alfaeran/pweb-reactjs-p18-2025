// src/components/common/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// Buat dan import file CSS-nya
import './Navbar.css'; 

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">Hogwarts Library</Link>
      </div>
      <div className="navbar-center">
        {/* Tampilkan link ini hanya jika sudah login */}
        {isAuthenticated && (
          <>
            <Link to="/" className="nav-link">Books Collection</Link>
            <Link to="/transactions" className="nav-link">My Transactions</Link>
          </>
        )}
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            {/* <span className="nav-icon">🛒</span> */}
            <span className="nav-user-email">{user?.email}</span>
            <button onClick={handleLogout} className="nav-logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;