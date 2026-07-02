import React from 'react';

export default function Button({ children, type = 'button', disabled = false, onClick, style = {}, ...props }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: '0.6rem 1rem',
        borderRadius: 'var(--radius-md, 4px)',
        border: 'none',
        backgroundColor: disabled ? 'var(--text-muted, #ccc)' : 'var(--accent, #0076ff)',
        color: '#fff',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '0.9rem',
        transition: 'background-color 0.2s',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}
