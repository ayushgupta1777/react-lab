import React, { useState } from 'react';

export default function GlassGenerator() {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(0.25);
  const [borderOpacity, setBorderOpacity] = useState(0.15);
  const [borderRadius, setBorderRadius] = useState(16);
  const [saturation, setSaturation] = useState(120);
  const [copied, setCopied] = useState(false);

  const glassStyle = {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
    borderRadius: `${borderRadius}px`,
  };

  const cssString = `background: rgba(255, 255, 255, ${opacity});
backdrop-filter: blur(${blur}px) saturate(${saturation}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
border: 1px solid rgba(255, 255, 255, ${borderOpacity});
border-radius: ${borderRadius}px;`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="panel animate-fade">
      <div className="panel-header">
        <h2 className="panel-title">Glassmorphism Builder</h2>
        <p className="panel-subtitle">Generate modern CSS styles for UI cards and dashboard elements.</p>
      </div>

      <div className="glass-workspace">
        {/* Controls */}
        <div className="sandbox-controls">
          <div className="control-group">
            <div className="control-label-row">
              <label className="control-label">Backdrop Blur</label>
              <span className="control-val">{blur}px</span>
            </div>
            <input
              id="blur-slider"
              type="range"
              min="0"
              max="40"
              value={blur}
              onChange={(e) => setBlur(parseInt(e.target.value))}
              className="slider-input"
            />
          </div>

          <div className="control-group">
            <div className="control-label-row">
              <label className="control-label">Background Opacity</label>
              <span className="control-val">{Math.round(opacity * 100)}%</span>
            </div>
            <input
              id="opacity-slider"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="slider-input"
            />
          </div>

          <div className="control-group">
            <div className="control-label-row">
              <label className="control-label">Backdrop Saturation</label>
              <span className="control-val">{saturation}%</span>
            </div>
            <input
              id="saturation-slider"
              type="range"
              min="50"
              max="250"
              value={saturation}
              onChange={(e) => setSaturation(parseInt(e.target.value))}
              className="slider-input"
            />
          </div>

          <div className="control-group">
            <div className="control-label-row">
              <label className="control-label">Border Radius</label>
              <span className="control-val">{borderRadius}px</span>
            </div>
            <input
              id="radius-slider"
              type="range"
              min="0"
              max="48"
              value={borderRadius}
              onChange={(e) => setBorderRadius(parseInt(e.target.value))}
              className="slider-input"
            />
          </div>

          <div className="control-group">
            <div className="control-label-row">
              <label className="control-label">Border Opacity</label>
              <span className="control-val">{Math.round(borderOpacity * 100)}%</span>
            </div>
            <input
              id="border-opacity-slider"
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={borderOpacity}
              onChange={(e) => setBorderOpacity(parseFloat(e.target.value))}
              className="slider-input"
            />
          </div>
        </div>

        {/* Workspace Preview & Output */}
        <div className="glass-code-panel">
          <div className="glass-preview-area" id="glass-preview-area">
            {/* Background floating circles */}
            <div className="glass-preview-circle-1"></div>
            <div className="glass-preview-circle-2"></div>
            
            {/* Rendered glass element */}
            <div className="glass-card" style={glassStyle} id="glass-card-element">
              <h3 className="glass-card-title">Dynamic Card</h3>
              <p className="glass-card-text">
                This container uses CSS backdrop-filter to blur behind itself. Works beautifully against vibrant background patterns.
              </p>
            </div>
          </div>

          <div className="code-container">
            <button 
              id="copy-css-btn" 
              className="copy-btn" 
              onClick={copyToClipboard}
            >
              {copied ? '✓ Copied!' : 'Copy CSS'}
            </button>
            <pre className="code-block" id="glass-css-output">
              {cssString}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
