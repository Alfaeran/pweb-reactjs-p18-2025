// src/components/ui/Loader.tsx
import React from 'react';

const Loader = ({ message = "Memuat data..." }) => {
  const spinStyle: React.CSSProperties = {
    border: '4px solid #f3f3f3', 
    borderTop: '4px solid #eab308', 
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite', 
    margin: '0 auto 10px',
  };
  // Catatan: Keyframes 'spin' perlu didefinisikan di CSS global Anda.

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <div style={spinStyle}></div>
      <p style={{ color: '#5a4632' }}>{message}</p>
    </div>
  );
};
export default Loader;