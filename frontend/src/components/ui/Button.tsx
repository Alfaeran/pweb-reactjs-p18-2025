// src/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const styles: { [key in 'primary' | 'danger' | 'secondary']: React.CSSProperties } = {
    primary: { backgroundColor: '#eab308', color: '#3b2a1a' },
    danger: { backgroundColor: '#cc0000', color: 'white' },
    secondary: { backgroundColor: '#5a4632', color: '#c7bdae' },
  };

  return (
    <button 
      style={{ 
        padding: '10px 20px', 
        borderRadius: '4px', 
        cursor: 'pointer', 
        fontWeight: 'bold',
        transition: 'opacity 0.3s',
        border: 'none',
        ...styles[variant], 
        ...props.style,
        opacity: props.disabled ? 0.6 : 1, // Visual untuk disabled state
      }} 
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;