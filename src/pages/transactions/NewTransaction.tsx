// src/pages/transactions/NewTransaction.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../../components/forms/TransactionForm';
import { transactionService } from '../../services/transactionService';
import Loader from '../../components/ui/Loader';

interface CartItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}

const NewTransaction = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const cart = JSON.parse(storedCart);
        setCartItems(cart);
      } catch (err) {
        console.error('Failed to parse cart:', err);
      }
    }
  }, []);

  const handleSubmit = async (customerName: string, customerEmail: string) => {
    setLoading(true);
    setError(null);
    try {
      // Convert cart items to transaction items format
      const transactionItems = cartItems.map((item) => ({
        book_id: item.bookId,
        quantity: item.quantity,
      }));

      await transactionService.createTransaction(transactionItems);
      alert(`Transaksi berhasil dibuat atas nama ${customerName}!`);
      
      // Clear cart
      localStorage.removeItem('cart');
      
      // Redirect to transactions list
      navigate('/transactions');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal membuat transaksi. Pastikan data valid dan stok cukup.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', textAlign: 'center' }}>
        <div className="book-detail-error">
          <h2>Keranjang Kosong</h2>
          <p>Tidak ada item di keranjang. Silakan tambahkan buku terlebih dahulu.</p>
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#FFD700',
              color: '#3E2723',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Kembali ke Buku
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', border: '4px solid #eab308' }}>
      <h2 style={{ textAlign: 'center', color: '#3b2a1a', marginBottom: '30px' }}>📜 CIPTAKAN TRANSAKSI BARU</h2>
      <TransactionForm
        cartItems={cartItems}
        onSubmit={handleSubmit}
        loading={loading}
        submitError={error}
      />
    </div>
  );
};
export default NewTransaction;
