import React from 'react';

export default function SearchHistory({ searchHistory, activeUser, onHistoryClick, onClear }) {
  if (searchHistory.length === 0) return null;

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem'
      }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted, #666)' }}>Recent Searches</span>
        <button
          onClick={onClear}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--danger, #ff3b30)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            padding: 0
          }}
        >
          Clear
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {searchHistory.map((histUser) => (
          <button
            key={histUser}
            onClick={() => onHistoryClick(histUser)}
            style={{
              padding: '0.3rem 0.6rem',
              borderRadius: '12px',
              border: '1px solid var(--border-color, #ccc)',
              backgroundColor: histUser === activeUser ? 'var(--accent-light, #e6f0ff)' : 'var(--bg-tertiary, #fff)',
              borderColor: histUser === activeUser ? 'var(--accent, #0076ff)' : 'var(--border-color, #ccc)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              color: 'inherit'
            }}
          >
            {histUser}
          </button>
        ))}
      </div>
    </div>
  );
}
