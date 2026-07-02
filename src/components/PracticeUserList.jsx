import React, { useState } from 'react';

export default function PracticeUserList() {
  // 1. Initial Array State
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'UI Designer', active: true },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Backend Dev', active: false },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Product Manager', active: true },
  ]);

  // Search Input Filter state
  const [searchQuery, setSearchQuery] = useState('');

  // New User Form fields states
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Developer');

  // Handle adding user to state
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newUser = {
      id: Date.now(), // Unique ID representation
      name: newName,
      email: newEmail,
      role: newRole,
      active: true,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);

    // Reset fields
    setNewName('');
    setNewEmail('');
  };

  // Handle deleting a user
  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // Filter the list based on searchQuery state
  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="panel animate-fade">
      <div className="panel-header">
        <h2 className="panel-title">Practice Assignment: Array Mapping & Filters</h2>
        <p className="panel-subtitle">
          Practice rendering arrays dynamically, binding input search queries, and adding/removing state objects.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', marginTop: '1rem' }}>
        
        {/* Left: User Search & List Renderer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              id="user-search-input"
              type="text"
              placeholder="🔍 Filter users by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-tertiary)',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
            {searchQuery && (
              <button 
                className="btn btn-secondary" 
                onClick={() => setSearchQuery('')}
                style={{ padding: '0.75rem 1rem' }}
              >
                Clear
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }} id="users-list-container">
            {filteredUsers.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No users found matching search query.
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div 
                  key={user.id}
                  id={`user-item-${user.id}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 1.25rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-secondary)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div 
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        background: 'linear-gradient(135deg, var(--accent), #06b6d4)', 
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '0.9rem'
                      }}
                    >
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', margin: 0 }}>
                        {user.name}
                        <span 
                          style={{
                            display: 'inline-block',
                            marginLeft: '0.5rem',
                            fontSize: '0.65rem',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '10px',
                            backgroundColor: user.active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                            color: user.active ? 'var(--success)' : 'var(--text-muted)'
                          }}
                        >
                          {user.active ? 'Active' : 'Offline'}
                        </span>
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{user.email} • {user.role}</p>
                    </div>
                  </div>

                  <button 
                    id={`delete-user-${user.id}`}
                    onClick={() => handleDeleteUser(user.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--danger)',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)'
                    }}
                    title="Remove user"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Add User Form & Exercises */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <form 
            onSubmit={handleAddUser}
            style={{
              padding: '1.5rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              textAlign: 'left'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', margin: 0 }}>Add New Profile</h3>
            
            <div className="control-group">
              <label className="control-label">Full Name</label>
              <input
                id="new-user-name"
                type="text"
                placeholder="e.g. Sarah Connor"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{
                  padding: '0.55rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-tertiary)',
                  outline: 'none',
                  fontSize: '0.85rem'
                }}
                required
              />
            </div>

            <div className="control-group">
              <label className="control-label">Email Address</label>
              <input
                id="new-user-email"
                type="email"
                placeholder="e.g. sarah@skynet.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                style={{
                  padding: '0.55rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-tertiary)',
                  outline: 'none',
                  fontSize: '0.85rem'
                }}
                required
              />
            </div>

            <div className="control-group">
              <label className="control-label">Role</label>
              <select
                id="new-user-role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                style={{
                  padding: '0.55rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-tertiary)',
                  outline: 'none',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Developer">Developer</option>
                <option value="UI Designer">UI Designer</option>
                <option value="Product Owner">Product Owner</option>
                <option value="QA Lead">QA Lead</option>
              </select>
            </div>

            <button 
              id="submit-user-btn"
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.65rem' }}
            >
              Add User Profile
            </button>
          </form>

          {/* Practice tasks */}
          <div 
            style={{ 
              padding: '1.25rem', 
              border: '1px dashed var(--accent)', 
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-light)',
              textAlign: 'left'
            }}
          >
            <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginBottom: '0.5rem' }}>
              📝 Student Practice Tasks
            </h4>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Open <code>src/components/PracticeUserList.jsx</code>:
            </p>

            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>Task 1:</strong> Add an 'Active/Offline' status toggle button inside each user item.</li>
              <li><strong>Task 2:</strong> Implement a 'Sort by Name' button above the user list display.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
