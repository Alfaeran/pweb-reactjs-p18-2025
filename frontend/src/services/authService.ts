// src/services/authService.ts
import axios from 'axios';

// Ganti dengan URL backend Anda
const API_URL = 'http://localhost:4000/auth';

// Tipe data untuk respons login (sesuaikan dengan backend Anda)
interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
}

// Fungsi untuk Login
export const loginUser = async (email: string, password: string) => {
  console.log('Attempting login at:', `${API_URL}/login`);
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, {
      email,
      password,
    });
    console.log('Login response:', { 
      status: response.status, 
      hasToken: !!response.data.token,
      hasUser: !!response.data.user 
    });
    return response.data;
  } catch (error) {
    console.error('Login request failed:', error);
    throw error;
  }
};

// Fungsi untuk Register
export const registerUser = async (email: string, password: string) => {
  console.log('Attempting registration at:', `${API_URL}/register`);
  try {
    const response = await axios.post(`${API_URL}/register`, { 
      email, 
      password 
    });
    console.log('Registration successful:', { 
      status: response.status, 
      data: response.data 
    });
    return response.data;
  } catch (error: any) {
    console.error('Registration failed:', { 
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    throw error;
  }
};

// (Opsional tapi direkomendasikan) Fungsi untuk mengambil data user
// berdasarkan token yang tersimpan
export const getSelf = async (token: string) => {
    const response = await axios.get(`${API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.user; // Sesuaikan dengan respons API Anda
}