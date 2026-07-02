import React from 'react';

export default function UserInfo({ publicRepos, followers, following, company, location, blog, createdAt }) {
  return (
    <div>
      {/* User Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        borderTop: '1px solid var(--border-color, #eaeaea)',
        borderBottom: '1px solid var(--border-color, #eaeaea)',
        padding: '0.75rem 0',
        marginBottom: '1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{publicRepos}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #666)', textTransform: 'uppercase' }}>Repos</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{followers}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #666)', textTransform: 'uppercase' }}>Followers</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{following}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #666)', textTransform: 'uppercase' }}>Following</div>
        </div>
      </div>

      {/* Additional Meta */}
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        textAlign: 'left',
        fontSize: '0.85rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        {company && (
          <li style={{ display: 'flex', gap: '0.5rem' }}>
            <span>🏢</span> <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{company}</span>
          </li>
        )}
        {location && (
          <li style={{ display: 'flex', gap: '0.5rem' }}>
            <span>📍</span> <span>{location}</span>
          </li>
        )}
        {blog && (
          <li style={{ display: 'flex', gap: '0.5rem' }}>
            <span>🔗</span> 
            <a 
              href={blog.startsWith('http') ? blog : `https://${blog}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--accent, #0076ff)', textDecoration: 'none', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {blog}
            </a>
          </li>
        )}
        <li style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-muted, #666)' }}>
          <span>📅</span> <span>Joined {new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
        </li>
      </ul>
    </div>
  );
}
