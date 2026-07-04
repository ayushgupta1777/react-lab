import React from 'react';

export default function SearchHistory({ searchHistory, activeUser, onHistoryClick, onClear }) {
  if (searchHistory.length === 0) return null;

  return (
    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Recent Searches</span>
        <button onClick={onClear} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.85rem' }}>
          Clear
        </button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {searchHistory.map((histUser) => (
          <button
            key={histUser}
            onClick={() => onHistoryClick(histUser)}
            className={`btn ${histUser === activeUser ? 'btn-github' : 'btn-secondary'}`}
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.85rem', borderRadius: '16px' }}
          >
            {histUser}
          </button>
        ))}
      </div>
    </div>
  );
}
