import React, { useState } from 'react';

export default function PracticeForm() {
  // 1. Single State Object representing form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  // 2. Validation Errors state
  const [errors, setErrors] = useState({});

  // 3. Success state
  const [submittedData, setSubmittedData] = useState(null);

  // General change handler for all text inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear validation error for this field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(null);

    const isValid = validateForm();
    if (isValid) {
      // Simulate API submission
      setSubmittedData(formData);
      
      // Reset form fields
      setFormData({
        username: '',
        email: '',
        password: '',
        agreeToTerms: false,
      });
      setErrors({});
    }
  };

  return (
    <div className="panel animate-fade">
      <div className="panel-header">
        <h2 className="panel-title">Practice Assignment: Controlled Forms</h2>
        <p className="panel-subtitle">
          Master controlled components using unified state structures, change handlers, and validation routines.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', marginTop: '1rem' }}>
        
        {/* Left: Interactive Form */}
        <div>
          <form 
            onSubmit={handleSubmit}
            style={{
              padding: '2rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              textAlign: 'left'
            }}
          >
            <div className="control-group">
              <label className="control-label">Username</label>
              <input
                id="form-username-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. dev_jane"
                style={{
                  padding: '0.65rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${errors.username ? 'var(--danger)' : 'var(--border-color)'}`,
                  backgroundColor: 'var(--bg-tertiary)',
                  outline: 'none'
                }}
              />
              {errors.username && (
                <span style={{ fontSize: '0.75rem', color: 'var(--danger)' }} id="error-username">
                  ⚠️ {errors.username}
                </span>
              )}
            </div>

            <div className="control-group">
              <label className="control-label">Email Address</label>
              <input
                id="form-email-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                style={{
                  padding: '0.65rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${errors.email ? 'var(--danger)' : 'var(--border-color)'}`,
                  backgroundColor: 'var(--bg-tertiary)',
                  outline: 'none'
                }}
              />
              {errors.email && (
                <span style={{ fontSize: '0.75rem', color: 'var(--danger)' }} id="error-email">
                  ⚠️ {errors.email}
                </span>
              )}
            </div>

            <div className="control-group">
              <label className="control-label">Password</label>
              <input
                id="form-password-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                style={{
                  padding: '0.65rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${errors.password ? 'var(--danger)' : 'var(--border-color)'}`,
                  backgroundColor: 'var(--bg-tertiary)',
                  outline: 'none'
                }}
              />
              {errors.password && (
                <span style={{ fontSize: '0.75rem', color: 'var(--danger)' }} id="error-password">
                  ⚠️ {errors.password}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  fontSize: '0.85rem', 
                  cursor: 'pointer',
                  fontWeight: '500' 
                }}
              >
                <input
                  id="form-agree-checkbox"
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  style={{ accentColor: 'var(--accent)', width: '16px', height: '16px' }}
                />
                I agree to the Terms of Service and Privacy Policy.
              </label>
              {errors.agreeToTerms && (
                <span style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: '0.25rem' }} id="error-agree">
                  ⚠️ {errors.agreeToTerms}
                </span>
              )}
            </div>

            <button 
              id="form-submit-btn"
              type="submit" 
              className="btn btn-primary"
              style={{ padding: '0.75rem', marginTop: '0.5rem' }}
            >
              Submit Registration
            </button>
          </form>
        </div>

        {/* Right: Submission Feedback & Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Submission Output */}
          <div 
            className="stat-card" 
            style={{ 
              padding: '1.5rem', 
              textAlign: 'left',
              minHeight: '200px',
              justifyContent: submittedData ? 'flex-start' : 'center',
              alignItems: submittedData ? 'stretch' : 'center'
            }}
          >
            {submittedData ? (
              <>
                <span className="stat-label" style={{ color: 'var(--success)' }}>✓ Submitted Data</span>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }} id="submitted-data-output">
                  <p style={{ fontSize: '0.85rem' }}><strong>Username:</strong> {submittedData.username}</p>
                  <p style={{ fontSize: '0.85rem' }}><strong>Email:</strong> {submittedData.email}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}><strong>Password length:</strong> {submittedData.password.length} chars (masked)</p>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>📋</span>
                No submission data yet. Fill the form to see output.
              </div>
            )}
          </div>

          {/* Student Practice Tasks */}
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
              Open <code>src/components/PracticeForm.jsx</code>:
            </p>

            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>Task 1:</strong> Add a 'Confirm Password' input and validate that both passwords match on submit.</li>
              <li><strong>Task 2:</strong> Add a reset/clear button to reset all fields and clear validation error states.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
