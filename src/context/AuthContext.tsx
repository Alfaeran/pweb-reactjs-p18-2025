// src/context/AuthContext.tsx
import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import * as authService from '../services/authService';

// Tipe untuk data user
interface User {
  id: number;
  email: string;
}

// Tipe untuk nilai context
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean; // Untuk menampilkan loading state saat verifikasi token
}

// Buat Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Buat Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Cek token di localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Verifikasi token ke backend
          const userData = await authService.getSelf(storedToken); 
          setUser(userData);
          setToken(storedToken);
        } catch (error) {
          // Token tidak valid
          localStorage.removeItem('token');
          console.error("Sesi tidak valid, silahkan login kembali.", error);
        }
      }
      setLoading(false);
    };
    verifyToken();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.loginUser(email, password);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (email: string, password: string) => {
    await authService.registerUser(email, password);
    // Di sini Anda bisa memilih untuk langsung login atau redirect ke halaman login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    isAuthenticated: !!token,
    user,
    token,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook untuk mempermudah penggunaan context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};