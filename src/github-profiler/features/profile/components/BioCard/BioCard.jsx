import React from 'react';

export default function BioCard({ avatarUrl, name, login, bio, htmlUrl }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={avatarUrl}
        alt={`${name || login} avatar`}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '1rem',
          border: '3px solid var(--border-color, #eaeaea)'
        }}
      />
      <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.3rem' }}>{name || login}</h2>
      <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted, #666)', fontSize: '0.9rem' }}>@{login}</p>
      
      {bio && (
        <p style={{
          fontSize: '0.85rem',
          lineHeight: '1.4',
          margin: '0 0 1.25rem 0',
          color: 'var(--text-secondary, #444)',
          fontStyle: 'italic'
        }}>
          "{bio}"
        </p>
      )}

      <a
        href={htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          width: '100%',
          padding: '0.5rem 0',
          backgroundColor: '#24292e',
          color: '#fff',
          borderRadius: 'var(--radius-md, 4px)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: '600',
          marginBottom: '1.25rem'
        }}
      >
        View GitHub Profile
      </a>
    </div>
  );
}
