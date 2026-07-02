import React from 'react';

export default function Card({ children, style = {}, ...props }) {
  return (
    <div
      style={{
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg, 8px)',
        border: '1px solid var(--border-color, #eaeaea)',
        backgroundColor: 'var(--bg-secondary, #fafafa)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
