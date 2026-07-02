import React, { useState, useEffect } from 'react';

export default function AnimationSandbox() {
  const [duration, setDuration] = useState(0.8);
  const [easing, setEasing] = useState('cubic-bezier(0.175, 0.885, 0.32, 1.275)');
  const [isMoved, setIsMoved] = useState(false);
  const [playState, setPlayState] = useState('Stopped');

  const easings = [
    { name: 'Linear', value: 'linear' },
    { name: 'Ease In Out', value: 'ease-in-out' },
    { name: 'Spring (Bounce)', value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
    { name: 'Anticipate', value: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)' },
    { name: 'Bouncy Custom', value: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)' }
  ];

  const triggerAnimation = () => {
    setIsMoved(!isMoved);
    setPlayState('Running');
  };

  useEffect(() => {
    if (playState === 'Running') {
      const timer = setTimeout(() => {
        setPlayState('Finished');
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isMoved, playState, duration]);

  return (
    <div className="panel animate-fade">
      <div className="panel-header">
        <h2 className="panel-title">Interactive Motion Playground</h2>
        <p className="panel-subtitle">Fine-tune cubic-bezier curves and transitions to create micro-interactions.</p>
      </div>

      <div className="overview-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <span className="stat-label">Active Easing</span>
          <span className="stat-value" style={{ fontSize: '1.25rem' }}>
            {easings.find(e => e.value === easing)?.name || 'Custom'}
          </span>
          <span className="stat-desc">Transition curve pattern</span>
        </div>
        <div className="stat-card blue">
          <span className="stat-label">Duration</span>
          <span className="stat-value">{duration}s</span>
          <span className="stat-desc">Time to complete transition</span>
        </div>
        <div className="stat-card green">
          <span className="stat-label">Play State</span>
          <span className="stat-value" style={{ color: playState === 'Running' ? 'var(--accent)' : 'inherit' }}>
            {playState}
          </span>
          <span className="stat-desc">Current animation progress</span>
        </div>
      </div>

      <div className="sandbox-layout">
        {/* Controls Column */}
        <div className="sandbox-controls">
          <div className="control-group">
            <div className="control-label-row">
              <label className="control-label">Duration (seconds)</label>
              <span className="control-val">{duration}s</span>
            </div>
            <input
              id="duration-slider"
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={duration}
              onChange={(e) => setDuration(parseFloat(e.target.value))}
              className="slider-input"
            />
          </div>

          <div className="control-group">
            <label className="control-label">Select Easing Function</label>
            <div className="radio-group" id="easing-select-group">
              {easings.map((e) => (
                <button
                  key={e.name}
                  id={`easing-${e.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`radio-btn ${easing === e.value ? 'active' : ''}`}
                  onClick={() => {
                    setEasing(e.value);
                    setPlayState('Stopped');
                  }}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group" style={{ marginTop: '0.5rem' }}>
            <label className="control-label">Transition Style Preview</label>
            <div className="code-container" style={{ padding: '0.75rem' }}>
              <code className="code-block" style={{ fontSize: '0.8rem' }}>
                transition: transform {duration}s {easing};
              </code>
            </div>
          </div>
        </div>

        {/* Canvas Display Column */}
        <div>
          <div className="sandbox-canvas" id="sandbox-canvas">
            <div
              id="animated-box"
              className="animated-element"
              style={{
                transition: `transform ${duration}s ${easing}`,
                transform: isMoved 
                  ? 'translate(280px, -50%) scale(1.15) rotate(45deg)' 
                  : 'translate(0px, -50%) scale(1) rotate(0deg)',
              }}
            />
          </div>

          <div className="trigger-row">
            <button 
              id="trigger-btn" 
              className="btn btn-primary" 
              onClick={triggerAnimation}
            >
              {isMoved ? 'Reset Position' : 'Trigger Animation'}
            </button>
            <button 
              id="stop-btn" 
              className="btn btn-secondary" 
              onClick={() => {
                setIsMoved(false);
                setPlayState('Stopped');
              }}
            >
              Reset All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
