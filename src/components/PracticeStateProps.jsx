import React, { useState } from 'react';

// Child Component that receives props from the parent
function UserProfileCard({ name, role, points }) {
  return (
    <div 
      className="stat-card blue" 
      style={{ 
        marginTop: '1.5rem', 
        padding: '1.25rem',
        border: '1px solid var(--border-color)',
        textAlign: 'left'
      }}
    >
      <span className="stat-label">Child Component (Props Preview)</span>
      <h3 style={{ fontFamily: 'var(--font-heading)', margin: '0.25rem 0' }}>{name || 'Guest User'}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Role: {role || 'Not Assigned'}</p>
      <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '600' }}>Points: {points}</p>
    </div>
  );
}

export default function PracticeStateProps() {
  // 1. Basic State
  const [userName, setUserName] = useState('John Doe');
  const [role, setRole] = useState('Student');
  const [points, setPoints] = useState(10);

  // 2. Custom exercise state (for the user to practice with)
  const [colorToggle, setColorToggle] = useState(false);

  return (
    <div className="panel animate-fade">
      <div className="panel-header">
        <h2 className="panel-title">Practice Assignment: State & Props</h2>
        <p className="panel-subtitle">
          Learn how React handles internal component state and passes variables downward via component properties.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
        
        {/* Left Side: Parent State Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem' }}>Parent Component State</h3>
          
          <div className="control-group">
            <label className="control-label">User Name (Text input state)</label>
            <input 
              id="practice-name-input"
              type="text" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)}
              style={{
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-tertiary)',
                outline: 'none'
              }}
            />
          </div>

          <div className="control-group">
            <label className="control-label">User Role</label>
            <select
              id="practice-role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-tertiary)',
                outline: 'none'
              }}
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="Researcher">Researcher</option>
              <option value="Developer">Developer</option>
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">Modify Score Points (Number state)</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                id="practice-decrement-btn"
                className="btn btn-secondary" 
                onClick={() => setPoints(p => Math.max(0, p - 5))}
                style={{ flex: 1 }}
              >
                -5 Points
              </button>
              <button 
                id="practice-increment-btn"
                className="btn btn-primary" 
                onClick={() => setPoints(p => p + 5)}
                style={{ flex: 1 }}
              >
                +5 Points
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Render Display and Homework Exercises */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem' }}>Render Output</h3>
          
          {/* We pass the state values as props to the Child Component */}
          <UserProfileCard name={userName} role={role} points={points} />

          {/* User Exercise Practice Zone */}
          <div 
            style={{ 
              marginTop: '1rem', 
              padding: '1.25rem', 
              border: '1px dashed var(--accent)', 
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-light)'
            }}
          >
            <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginBottom: '0.5rem' }}>
              📝 Student Practice Tasks
            </h4>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Open <code>src/components/PracticeStateProps.jsx</code> to try these:
            </p>

            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>Task 1:</strong> Bind the background toggle below to change the box color.</li>
              <li><strong>Task 2:</strong> Add a reset button that clears name, role, and resets score to 0.</li>
            </ul>

            <button 
              id="practice-color-toggle-btn"
              className="btn btn-secondary" 
              onClick={() => setColorToggle(!colorToggle)}
              style={{ 
                marginTop: '1rem', 
                width: '100%', 
                backgroundColor: colorToggle ? 'var(--accent)' : 'var(--bg-secondary)',
                color: colorToggle ? 'white' : 'var(--text-primary)'
              }}
            >
              Toggle Box State Color ({colorToggle ? 'Active' : 'Inactive'})
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
