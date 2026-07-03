import React, { useState } from 'react';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';

export default function SearchBox({ onSubmit, loading, initialUsername = '' }) {
  const [username, setUsername] = useState(initialUsername);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label htmlFor="username-input" style={{ fontWeight: 600 }}>Search User</label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Input
          id="username-input"
          placeholder="e.g. gaearon"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ flex: 1 }}
        />
        <Button type="submit" disabled={loading} className="btn btn-github">
          {loading ? '...' : 'Search'}
        </Button>
      </div>
    </form>
  );
}
