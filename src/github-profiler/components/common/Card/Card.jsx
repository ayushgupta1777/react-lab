import React from 'react';

export default function Card({ children, style = {}, ...props }) {
  return (
    <div style={style} {...props}>
      {children}
    </div>
  );
}
