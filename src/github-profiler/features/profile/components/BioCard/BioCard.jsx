import React from 'react';

export default function BioCard({ avatarUrl, name, login, bio, htmlUrl }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '1rem' }}>
      <img
        src={avatarUrl}
        alt={`${name || login} avatar`}
        style={{ width: '120px', height: '120px', borderRadius: '50%', border: '2px solid var(--border-color)' }}
      />
      <div>
        <h2 style={{ margin: 0 }}>{name || login}</h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>@{login}</p>
      </div>
      
      {bio && (
        <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', margin: 0 }}>
          "{bio}"
        </p>
      )}

      <a
        href={htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-github"
        style={{ textDecoration: 'none', display: 'inline-block', marginTop: '0.5rem' }}
      >
        View Profile on GitHub
      </a>
    </div>
  );
}
