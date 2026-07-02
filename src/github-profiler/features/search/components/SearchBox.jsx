import React, { useState } from 'react';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';

export default function SearchBox({ onSubmit, loading }) {
  const [username, setUsername] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <label htmlFor="username-input" style={{ fontWeight: '600', fontSize: '0.9rem' }}>Search GitHub User</label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Input
          id="username-input"
          placeholder="e.g. gaearon"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ flex: 1 }}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? '...' : 'Search'}
        </Button>
      </div>
    </form>
  );
}
