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
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

// Fungsi untuk Register
export const registerUser = async (email: string, password: string) => {
  // Ganti '/register' dengan endpoint Anda
  const response = await axios.post(`${API_URL}/register`, { 
    email, 
    password 
  });
  return response.data;
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