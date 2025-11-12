import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'

const API_BASE_URL = 'http://localhost:4000'

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

/**
 * Generic API request function
 * @template T The response data type
 * @param method HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param endpoint API endpoint path
 * @param options Optional request configuration (data, params, headers)
 * @returns Promise with response data
 */
export const apiRequest = async <T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  options?: {
    data?: any
    params?: any
    headers?: any
  }
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient({
      method,
      url: endpoint,
      data: options?.data,
      params: options?.params,
      headers: options?.headers,
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || 'API request failed'
      throw new Error(message)
    }
    throw error
  }
}

export default apiClient
