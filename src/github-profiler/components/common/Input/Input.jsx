import React from 'react';

export default function Input({ id, type = 'text', placeholder, value, onChange, required = false, style = {}, ...props }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        padding: '0.6rem 0.8rem',
        borderRadius: 'var(--radius-md, 4px)',
        border: '1px solid var(--border-color, #ccc)',
        backgroundColor: 'var(--bg-tertiary, #fff)',
        fontSize: '0.9rem',
        color: 'inherit',
        outline: 'none',
        ...style
      }}
      {...props}
    />
  );
}
