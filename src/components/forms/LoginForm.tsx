// src/components/forms/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('student@hogwarts.edu'); // Sesuai gambar
  const [password, setPassword] = useState('password'); // Sesuai gambar
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validasi Sederhana
    if (!email || !password) {
      setError('Email dan password tidak boleh kosong.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/'); // Redirect ke halaman utama setelah login
    } catch (err) {
      console.error(err);
      setError('Login gagal. Periksa kembali email atau password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="login-button" disabled={loading}>
        {loading ? 'Loading...' : 'Enter the Library'}
      </button>
    </form>
  );
};

export default LoginForm;