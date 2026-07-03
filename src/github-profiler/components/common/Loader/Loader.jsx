import React from 'react';

export default function Loader({ message = 'Loading...' }) {
  // Inline spinning animation keyframes style tag injected dynamically
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
