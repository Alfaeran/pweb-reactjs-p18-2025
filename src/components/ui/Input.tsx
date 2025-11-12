// src/components/ui/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  icon?: string;
  isTextArea?: boolean;
}

const Input: React.FC<InputProps> = ({ label, name, icon, isTextArea = false, ...props }) => {
  return (
    <div style={{ flex: 1, marginBottom: '10px' }}>
      <label htmlFor={name} style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#5a4632' }}>
        {icon} {label}
      </label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={props.type || 'text'}
          style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          {...props}
        />
      )}
    </div>
  );
};
export default Input;