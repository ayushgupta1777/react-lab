import React, { useState } from 'react';
import AnimationSandbox from './AnimationSandbox';
import GlassGenerator from './GlassGenerator';
import StateVisualizer from './StateVisualizer';

export default function PlaygroundDashboard() {
  const [subTab, setSubTab] = useState('animation');

  const subTabs = [
    { id: 'animation', name: 'Animation Sandbox', icon: '⚡' },
    { id: 'glass', name: 'Glass Generator', icon: '💎' },
    { id: 'state', name: 'State Visualizer', icon: '🔄' }
  ];

  const renderActiveSubView = () => {
    switch (subTab) {
      case 'animation':
        return <AnimationSandbox />;
      case 'glass':
        return <GlassGenerator />;
      case 'state':
        return <StateVisualizer />;
      default:
        return <AnimationSandbox />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Mini sub-navigation bar */}
      <div 
        style={{
          display: 'inline-flex',
          gap: '0.5rem',
          padding: '0.35rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          alignSelf: 'flex-start'
        }}
        id="playground-subtabs"
      >
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            id={`subtab-btn-${tab.id}`}
            onClick={() => setSubTab(tab.id)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: subTab === tab.id ? 'var(--accent)' : 'transparent',
              color: subTab === tab.id ? 'white' : 'var(--text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <span>{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      <div>
        {renderActiveSubView()}
      </div>

    </div>
  );
}
