// src/components/common/Footer.tsx
import React from 'react';
// Buat file CSS jika perlu, misal 'Footer.css'
// import './Footer.css'; 

const Footer = () => {
  const footerStyle: React.CSSProperties = {
    backgroundColor: '#3b2a1a',
    color: '#c7bdae',
    textAlign: 'center',
    padding: '1.5rem',
    marginTop: 'auto', // Mendorong footer ke bawah
    borderTop: '2px solid #eab308'
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Hogwarts Library. All rights reserved.</p>
    </footer>
  );
};

export default Footer;