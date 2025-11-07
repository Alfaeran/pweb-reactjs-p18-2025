import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '../services/authService'
import { User, AuthResponse } from '@/types'

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username?: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('auth_token')
      if (storedToken) {
        try {
          localStorage.setItem('auth_token', storedToken)
          const userData = await authService.getCurrentUser()
          setUser(userData.data)
          setToken(storedToken)
        } catch (error) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')
          console.error('Token verification failed:', error)
        }
      }
      setLoading(false)
    }

    verifyToken()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password)
    const accessToken = response.data?.access_token || ''
    localStorage.setItem('auth_token', accessToken)
    localStorage.setItem('auth_user', JSON.stringify(response.data))
    setToken(accessToken)
    setUser(response.data as User)
  }

  const register = async (email: string, password: string, username?: string) => {
    await authService.register(email, password, username)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    setToken(null)
  }

  const value: AuthContextType = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}