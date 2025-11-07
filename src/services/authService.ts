import { apiClient } from './api'
import { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types'

export const authService = {
  register: async (email: string, password: string, username?: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', {
      email,
      password,
      username,
    })
    return response.data
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    })
    return response.data
  },

  getCurrentUser: async (): Promise<{ status: boolean; data: User }> => {
    const response = await apiClient.get<{ status: boolean; data: User }>('/auth/me')
    return response.data
  },

  logout: () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  },
}