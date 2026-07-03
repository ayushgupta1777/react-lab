import React from 'react';
import { Link } from 'react-router-dom';

export default function UserCard({ user }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px solid var(--border-color)' }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
          <Link
            to={`?username=${user.login}`}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600 }}
          >
            {user.login}
          </Link>
        </h3>
      </div>
      <Link
        to={`?username=${user.login}`}
        className="btn btn-github"
        style={{ textDecoration: 'none', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
      >
        View Profile
      </Link>
    </div>
  );
}
