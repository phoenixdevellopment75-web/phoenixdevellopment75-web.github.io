import React, { useState, useEffect, useCallback } from 'react';
import './KineticShapeIntro.css';

export default function KineticShapeIntro({ onComplete, force = false }) {
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(() => {
    if (force) return false;
    try {
      return sessionStorage.getItem('phoenix-intro-seen') === 'true';
    } catch {
      return false;
    }
  });

  const finish = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    try {
      sessionStorage.setItem('phoenix-intro-seen', 'true');
    } catch {}

    setTimeout(() => {
      setHidden(true);
      if (onComplete) onComplete();
    }, 550);
  }, [exiting, onComplete]);

  useEffect(() => {
    if (hidden) {
      if (onComplete) onComplete();
      return;
    }

    // Auto-advance after 1.8 seconds
    const autoTimer = setTimeout(finish, 1850);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        finish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(autoTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hidden, finish, onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`kinetic-intro-overlay ${exiting ? 'exiting' : ''}`}
      onClick={finish}
      role="button"
      tabIndex={0}
      aria-label="Click to skip animated intro"
    >
      <div className="intro-grid-backdrop" />

      <button
        type="button"
        className="intro-skip-btn"
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
        aria-label="Skip introduction"
      >
        <span>Skip</span>
        <span style={{ opacity: 0.6 }}>[Esc]</span>
      </button>

      <div className="intro-stage">
        <div className="intro-shape-wrapper">
          {/* Liquid Glass Frosted Lens */}
          <div className="intro-glass-lens" />

          {/* Precision Monochrome SVG Geometry */}
          <svg className="intro-svg" viewBox="0 0 200 200" fill="none">
            {/* Outer morphing ring */}
            <rect
              className="intro-shape-outer"
              x="30"
              y="30"
              width="140"
              height="140"
              rx="40"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeOpacity="0.45"
              strokeDasharray="6 4"
            />

            {/* Inner rotating octagon/diamond */}
            <circle
              className="intro-shape-inner"
              cx="100"
              cy="100"
              r="52"
              stroke="#ffffff"
              strokeWidth="1.75"
              strokeOpacity="0.8"
            />

            {/* Kinetic satellite dots */}
            <circle cx="100" cy="48" r="2.5" fill="#ffffff" />
            <circle cx="100" cy="152" r="2.5" fill="#ffffff" />
            <circle cx="48" cy="100" r="2.5" fill="#ffffff" />
            <circle cx="152" cy="100" r="2.5" fill="#ffffff" />

            {/* Core pulsing solid diamond/aperture */}
            <polygon
              className="intro-shape-core"
              points="100,74 126,100 100,126 74,100"
              fill="#ffffff"
            />
          </svg>
        </div>

        <div className="intro-text-wrapper">
          <div className="intro-title">
            <span>PHOENIX</span>
            <span className="intro-dot">.</span>
          </div>
          <div className="intro-tagline">
            Android · Web · Cloud · Music
          </div>
        </div>
      </div>
    </div>
  );
}
