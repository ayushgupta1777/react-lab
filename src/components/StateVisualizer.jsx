import React, { useState, useEffect, useRef } from 'react';

export default function StateVisualizer() {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);
  const [activePhase, setActivePhase] = useState('idle');
  const isFirstRender = useRef(true);

  const addLog = (type, message) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prevLogs) => [
      { id: Date.now() + Math.random(), timestamp, type, message },
      ...prevLogs
    ]);
  };

  // Trigger phase progression
  const incrementCount = () => {
    setActivePhase('state');
    setCount((prev) => prev + 1);
    addLog('state', `setCount(count + 1) -> triggers state update`);
  };

  const forceReRender = () => {
    setActivePhase('state');
    // Just trigger state update with same/new reference or count
    setCount((prev) => prev);
    addLog('state', `Force re-render clicked`);
  };

  useEffect(() => {
    addLog('render', `Reconciled virtual DOM and updated layout. Count is: ${count}`);
    
    if (isFirstRender.current) {
      addLog('effect', `Initial mount useEffect runs`);
      isFirstRender.current = false;
      setActivePhase('effect');
    } else {
      setActivePhase('effect');
      addLog('effect', `dependency [count] changed. Effect callback runs.`);
    }

    return () => {
      addLog('effect', `Cleanup callback runs before next effect (count was ${count})`);
    };
  }, [count]);

  // Adjust phase indicators asynchronously to show visual flows
  useEffect(() => {
    if (activePhase === 'state') {
      const timer1 = setTimeout(() => setActivePhase('render'), 500);
      const timer2 = setTimeout(() => setActivePhase('commit'), 1000);
      const timer3 = setTimeout(() => setActivePhase('effect'), 1500);
      const timer4 = setTimeout(() => setActivePhase('idle'), 2500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [activePhase]);

  const clearLogs = () => {
    setLogs([]);
    isFirstRender.current = true;
    addLog('render', `Logs cleared`);
  };

  return (
    <div className="panel animate-fade">
      <div className="panel-header">
        <h2 className="panel-title">React Render & Effect Lifecycle</h2>
        <p className="panel-subtitle">Trace state transitions, reconciliation updates, and useEffect triggers in real-time.</p>
      </div>

      <div className="state-viz-grid">
        {/* Logs column */}
        <div className="event-logs">
          <div className="event-logs-header">
            <span>Lifecycle Logs</span>
            <button className="clear-logs-btn" onClick={clearLogs} id="clear-logs-btn">
              Clear Logs
            </button>
          </div>
          <ul className="event-logs-list" id="logs-list">
            {logs.map((log) => (
              <li key={log.id} className={`log-item ${log.type}`}>
                <span style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }}>[{log.timestamp}]</span>
                <strong style={{ textTransform: 'uppercase', fontSize: '0.7rem', marginRight: '0.5rem' }}>
                  {log.type}:
                </strong>
                <span>{log.message}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visualizer Column */}
        <div className="visualizer-canvas" id="visualizer-canvas">
          <div className="viz-flow-container">
            {/* Step 1: State Update */}
            <div className={`viz-node ${activePhase === 'state' ? 'active' : ''}`} id="node-state">
              <span className="viz-node-title">1. State Mutation</span>
              <span className="viz-node-desc">Trigger state setter or change props.</span>
            </div>

            <div className="viz-arrow">➜</div>

            {/* Step 2: Render */}
            <div className={`viz-node ${activePhase === 'render' ? 'active' : ''}`} id="node-render">
              <span className="viz-node-title">2. Reconciliation</span>
              <span className="viz-node-desc">Call function, evaluate JSX diff.</span>
            </div>

            <div className="viz-arrow">➜</div>

            {/* Step 3: Commit / Paint */}
            <div className={`viz-node ${activePhase === 'commit' ? 'active' : ''}`} id="node-commit">
              <span className="viz-node-title">3. Commit DOM</span>
              <span className="viz-node-desc">React updates real DOM elements.</span>
            </div>

            <div className="viz-arrow">➜</div>

            {/* Step 4: Effects */}
            <div className={`viz-node ${activePhase === 'effect' ? 'active' : ''}`} id="node-effect">
              <span className="viz-node-title">4. Run Effects</span>
              <span className="viz-node-desc">Execute useEffect, cleanups run.</span>
            </div>
          </div>

          <div className="viz-controls">
            <button 
              id="increment-btn" 
              className="btn btn-primary" 
              onClick={incrementCount}
            >
              Increment Count (Currently: {count})
            </button>
            <button 
              id="rerender-btn" 
              className="btn btn-secondary" 
              onClick={forceReRender}
            >
              Force Render Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
