// src/components/forms/TransactionForm.tsx
import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface CartItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}

interface TransactionFormProps {
  cartItems: CartItem[];
  onSubmit: (customerName: string, customerEmail: string) => Promise<void>;
  loading: boolean;
  submitError: string | null;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ cartItems, onSubmit, loading, submitError }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerName.trim()) {
      setFormError('Nama pelanggan tidak boleh kosong.');
      return;
    }
    if (!customerEmail.trim()) {
      setFormError('Email pelanggan tidak boleh kosong.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      setFormError('Email tidak valid.');
      return;
    }
    if (cartItems.length === 0) {
      setFormError('Keranjang belanja kosong. Tambahkan buku terlebih dahulu.');
      return;
    }

    await onSubmit(customerName, customerEmail);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Cart Items Summary */}
      <div style={{
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '2px solid #FFD700',
      }}>
        <h3 style={{ color: '#FFD700', marginBottom: '1rem', fontFamily: "'Cinzel', serif", fontSize: '1.3rem' }}>
          📦 Ringkasan Pesanan
        </h3>
        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
          {cartItems.length > 0 ? (
            <table style={{ width: '100%', color: '#F4E8C1', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #FFD700', marginBottom: '10px' }}>
                  <th style={{ textAlign: 'left', padding: '8px 0' }}>Buku</th>
                  <th style={{ textAlign: 'center', padding: '8px 0' }}>Qty</th>
                  <th style={{ textAlign: 'right', padding: '8px 0' }}>Harga</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.bookId} style={{ borderBottom: '1px solid rgba(255, 215, 0, 0.2)' }}>
                    <td style={{ padding: '8px 0' }}>{item.title}</td>
                    <td style={{ textAlign: 'center', padding: '8px 0' }}>{item.quantity}</td>
                    <td style={{ textAlign: 'right', padding: '8px 0' }}>
                      {(item.price * item.quantity).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#FFB6C1' }}>Keranjang belanja kosong.</p>
          )}
        </div>
        <div style={{
          borderTop: '2px solid #FFD700',
          marginTop: '1rem',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#50C878',
        }}>
          <span>Total:</span>
          <span>{totalPrice.toLocaleString('id-ID')} Galleons</span>
        </div>
      </div>

      {/* Customer Information */}
      <div>
        <h3 style={{ color: '#FFD700', marginBottom: '1rem', fontFamily: "'Cinzel', serif", fontSize: '1.3rem' }}>
          👤 Informasi Pelanggan
        </h3>
        <Input
          label="Nama Pelanggan"
          name="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          icon="👤"
          placeholder="Masukkan nama lengkap"
        />
        <div style={{ marginTop: '15px' }}>
          <Input
            label="Email Pelanggan"
            name="customerEmail"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            icon="📧"
            placeholder="nama@example.com"
          />
        </div>
      </div>

      {/* Error Messages */}
      {(submitError || formError) && (
        <div style={{
          backgroundColor: 'rgba(139, 0, 0, 0.15)',
          color: '#FF6B6B',
          padding: '1rem',
          borderRadius: '8px',
          border: '2px solid #8B0000',
          textAlign: 'center',
        }}>
          <p style={{ margin: 0 }}>❌ {submitError || formError}</p>
        </div>
      )}

      {/* Submit Buttons */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
        <Button type="submit" variant="primary" disabled={loading} style={{ flex: 1 }}>
          {loading ? 'Processing...' : `Create Transaction - ${totalPrice.toLocaleString('id-ID')} Galleons`}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
export default TransactionForm;
