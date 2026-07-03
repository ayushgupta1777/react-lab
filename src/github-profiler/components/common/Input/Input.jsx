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
      style={style}
      {...props}
    />
  );
}
