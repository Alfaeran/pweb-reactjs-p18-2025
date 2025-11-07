// src/components/forms/RegisterForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validasi
    if (!email || !password || !confirmPassword) {
      setError('Semua field tidak boleh kosong.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }

    setLoading(true);
    try {
      console.log('Starting registration process for:', email);
      await register(email, password);
      console.log('Registration successful, preparing to redirect');
      setSuccess('Registrasi berhasil! Anda akan diarahkan ke halaman login.');
      
      // Give user time to see the success message
      setTimeout(() => {
        console.log('Redirecting to login page');
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.response?.data?.message) {
        setError(`Registrasi gagal: ${err.response.data.message}`);
      } else if (err.message.includes('Network Error')) {
        setError('Tidak dapat terhubung ke server. Mohon periksa koneksi Anda.');
      } else {
        setError('Registrasi gagal. Silakan coba lagi nanti.');
      }
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
      <div className="input-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <button type="submit" className="login-button" disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;