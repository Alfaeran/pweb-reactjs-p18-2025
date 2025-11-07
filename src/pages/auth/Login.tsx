// src/pages/auth/Login.tsx
import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import LoginForm from '../../components/forms/LoginForm'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#3b2a1a',
        color: 'white',
        fontSize: '2rem'
      }}>
        Loading...
      </div>
    )
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      width: '100%',
      backgroundColor: '#3b2a1a',
      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(112, 66, 20, 0.3) 0%, transparent 50%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50px',
        width: '40px',
        height: '12px',
        backgroundColor: '#FFD700',
        borderRadius: '50%',
        boxShadow: '0 0 20px #FFD700'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '35px',
        width: '30px',
        height: '10px',
        backgroundColor: '#50C878',
        borderRadius: '50%',
        boxShadow: '0 0 15px #50C878'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '55px',
        left: '20px',
        width: '25px',
        height: '8px',
        backgroundColor: '#8B0000',
        borderRadius: '50%',
        boxShadow: '0 0 10px #8B0000'
      }} />

      <div style={{ 
        backgroundColor: 'rgba(40, 30, 20, 0.95)', 
        border: '3px solid #FFD700', 
        borderRadius: '20px', 
        padding: '3rem', 
        width: '95%',
        maxWidth: '450px', 
        textAlign: 'center', 
        boxShadow: '0 0 40px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 215, 0, 0.1)', 
        color: '#f0e6d2',
        animation: 'fadeIn 0.5s ease-in'
      }}>
        {/* Magic wand icon */}
        <div style={{
          fontSize: '3.5rem',
          marginBottom: '1.5rem',
          animation: 'float 3s ease-in-out infinite'
        }}>
          ✨
        </div>

        <h2 style={{ 
          color: '#FFD700', 
          fontSize: '1.6rem', 
          margin: '0 0 1rem 0', 
          fontWeight: 'bold',
          letterSpacing: '2px',
          fontFamily: "'Cinzel', serif"
        }}>
          WELCOME TO HOGWARTS LIBRARY
        </h2>
        
        <p style={{ 
          fontSize: '0.95rem', 
          marginBottom: '2.5rem', 
          color: '#dcdcdc',
          letterSpacing: '0.5px'
        }}>
          Enter your credentials to continue
        </p>
        
        <LoginForm />

        <p style={{ 
          marginTop: '1.5rem', 
          fontSize: '0.85rem', 
          color: '#dcdcdc',
          letterSpacing: '0.3px'
        }}>
          New student? <Link to="/register" style={{ 
            color: '#FFD700', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}>Register here</Link>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 215, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 60px rgba(255, 215, 0, 0.8), inset 0 0 30px rgba(255, 215, 0, 0.15);
          }
        }
      `}</style>
    </div>
  )
}

export default Login
