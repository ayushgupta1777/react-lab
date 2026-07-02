import React from 'react';

export default function RepoCard({ repo }) {
  // Simple color helper for common languages
  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Python: '#3572A5',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Java: '#b07219',
      C: '#555555',
      'C++': '#f34b7d',
      'C#': '#178600',
      PHP: '#4F5D95',
      Swift: '#F05138'
    };
    return colors[lang] || '#8b8b8b';
  };

  return (
    <div
      style={{
        padding: '1.25rem',
        borderRadius: 'var(--radius-md, 4px)',
        border: '1px solid var(--border-color, #eaeaea)',
        backgroundColor: 'var(--bg-secondary, #fafafa)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        textAlign: 'left'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent, #0076ff)',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            {repo.name}
          </a>
          {repo.private ? (
            <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', border: '1px solid #ccc', borderRadius: '10px', marginLeft: '0.5rem', color: '#666' }}>Private</span>
          ) : (
            <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', border: '1px solid #ccc', borderRadius: '10px', marginLeft: '0.5rem', color: '#666' }}>Public</span>
          )}
        </h3>
        
        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted, #666)' }}>
          <span title="Stars">⭐ {repo.stargazers_count}</span>
          <span title="Forks">🍴 {repo.forks_count}</span>
        </div>
      </div>

      {repo.description && (
        <p style={{
          margin: 0,
          fontSize: '0.9rem',
          color: 'var(--text-secondary, #444)',
          lineHeight: '1.4'
        }}>
          {repo.description}
        </p>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted, #666)',
        marginTop: '0.5rem'
      }}>
        {repo.language && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: getLanguageColor(repo.language),
              display: 'inline-block'
            }}></span>
            <span>{repo.language}</span>
          </div>
        )}
        <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
