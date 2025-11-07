import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  useEffect(() => {
    // Set a temporary token for development/testing if not exists
    if (!localStorage.getItem('auth_token')) {
      localStorage.setItem('auth_token', 'temp_token_dev')
      localStorage.setItem('auth_user', JSON.stringify({ email: 'maurigar@gmail.com' }))
    }
  }, [])

  const token = localStorage.getItem('auth_token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
