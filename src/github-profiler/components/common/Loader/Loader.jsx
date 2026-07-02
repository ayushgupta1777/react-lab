import React from 'react';

export default function Loader({ message = 'Loading...' }) {
  // Inline spinning animation keyframes style tag injected dynamically
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5rem 0'
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <span style={{
        fontSize: '2.5rem',
        display: 'inline-block',
        animation: 'spin 1s linear infinite'
      }}>
        🔄
      </span>
      <p style={{ marginTop: '1rem', color: 'var(--text-muted, #666)' }}>{message}</p>
    </div>
  );
}
