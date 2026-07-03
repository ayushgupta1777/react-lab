import React from 'react';

export default function Button({ children, type = 'button', disabled = false, onClick, style = {}, ...props }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
