import React from 'react';

export default function UserInfo({ publicRepos, followers, following, company, location, blog, createdAt, activeTab, onTabChange }) {
  const getTabStyle = (tabName) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '8px',
    background: activeTab === tabName ? '#f0f0f0' : 'transparent',
    border: activeTab === tabName ? '1px solid #ccc' : '1px solid transparent'
  });

  return (
    <div>
      {/* User Stats */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1rem' }}>
        <div style={getTabStyle('repos')} onClick={() => onTabChange('repos')}>
          <div style={{ fontWeight: 600 }}>{publicRepos}</div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>Repos</div>
        </div>
        <div style={getTabStyle('followers')} onClick={() => onTabChange('followers')}>
          <div style={{ fontWeight: 600 }}>{followers}</div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>Followers</div>
        </div>
        <div style={getTabStyle('following')} onClick={() => onTabChange('following')}>
          <div style={{ fontWeight: 600 }}>{following}</div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>Following</div>
        </div>
      </div>

      {/* Additional Meta */}
      <ul>
        {company && <li>Company: {company}</li>}
        {location && <li>Location: {location}</li>}
        {blog && (
          <li>
            Website:{' '}
            <a 
              href={blog.startsWith('http') ? blog : `https://${blog}`} 
              target="_blank" 
              rel="noopener noreferrer" 
            >
              {blog}
            </a>
          </li>
        )}
        <li>Joined: {new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</li>
      </ul>
    </div>
  );
}
