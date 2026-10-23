/*
 * Copyright 2026 Phoenix (phoenixdevellopment75@gmail.com)
 * Licensed under the Apache License, Version 2.0
 * See LICENSE file for details.
 *
 * KineticShapeIntro — Precision SVG line-draw entrance with staggered
 * text reveal. Respects prefers-reduced-motion.
 */

import React, { useState, useEffect, useCallback } from 'react';
import './KineticShapeIntro.css';

export default function KineticShapeIntro({ onComplete, force = false }) {
  const [exiting, setExiting] = useState(false);
  const [phase, setPhase]     = useState('idle'); // idle → shapes → text → done
  const [hidden, setHidden]   = useState(() => {
    if (force) return false;
    try { return sessionStorage.getItem('phoenix-intro-seen') === 'true'; }
    catch { return false; }
  });

  const finish = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    try { sessionStorage.setItem('phoenix-intro-seen', 'true'); } catch {}
    setTimeout(() => {
      setHidden(true);
      if (onComplete) onComplete();
    }, 700);
  }, [exiting, onComplete]);

  useEffect(() => {
    if (hidden) { if (onComplete) onComplete(); return; }
    // Staggered phase advances
    const t1 = setTimeout(() => setPhase('shapes'), 80);
    const t2 = setTimeout(() => setPhase('text'),   600);
    const t3 = setTimeout(finish, 2600);

    const handleKey = (e) => { if (e.key === 'Escape' || e.key === ' ') finish(); };
    window.addEventListener('keydown', handleKey);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); window.removeEventListener('keydown', handleKey); };
  }, [hidden, finish, onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`kinetic-intro-overlay ${exiting ? 'exiting' : ''} phase-${phase}`}
      onClick={finish}
      role="button"
      tabIndex={0}
      aria-label="Click or press Esc to skip"
    >
      <div className="intro-grid-backdrop" />

      <button
        type="button"
        className="intro-skip-btn"
        onClick={(e) => { e.stopPropagation(); finish(); }}
        aria-label="Skip introduction"
      >
        Skip <span className="skip-key">[Esc]</span>
      </button>

      <div className="intro-stage">
        {/* ── SVG Line-Draw Geometry ── */}
        <div className="intro-shape-wrapper">
          <svg
            className="intro-svg"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer rounded square — draws in via stroke-dashoffset */}
            <rect
              className="intro-draw-outer"
              x="20" y="20" width="160" height="160" rx="36"
              stroke="white" strokeWidth="1" strokeOpacity="0.35"
            />

            {/* Middle ring — counter-rotating */}
            <circle
              className="intro-draw-mid"
              cx="100" cy="100" r="64"
              stroke="white" strokeWidth="1.25" strokeOpacity="0.55"
              strokeDasharray="8 5"
            />

            {/* SVG line crosshair */}
            <line className="intro-draw-h" x1="20" y1="100" x2="180" y2="100"
              stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
            <line className="intro-draw-v" x1="100" y1="20" x2="100" y2="180"
              stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />

            {/* Inner solid circle — pulses in */}
            <circle
              className="intro-draw-inner"
              cx="100" cy="100" r="36"
              stroke="white" strokeWidth="1.75" strokeOpacity="0.9"
            />

            {/* Core diamond */}
            <polygon
              className="intro-core-diamond"
              points="100,78 122,100 100,122 78,100"
              fill="white"
            />

            {/* Cardinal satellite dots */}
            <circle className="intro-sat sat-n" cx="100" cy="36" r="2.5" fill="white" />
            <circle className="intro-sat sat-s" cx="100" cy="164" r="2.5" fill="white" />
            <circle className="intro-sat sat-e" cx="164" cy="100" r="2.5" fill="white" />
            <circle className="intro-sat sat-w" cx="36"  cy="100" r="2.5" fill="white" />
          </svg>
        </div>

        {/* ── Staggered Typography Reveal ── */}
        <div className="intro-text-wrapper" aria-live="polite">
          <div className="intro-title">
            {'PHOENIX'.split('').map((ch, i) => (
              <span key={i} className="intro-char" style={{ '--char-idx': i }}>{ch}</span>
            ))}
            <span className="intro-dot">.</span>
          </div>
          <div className="intro-tagline">
            <span className="intro-tag-word" style={{ '--w': 0 }}>Android</span>
            <span className="intro-tag-sep" aria-hidden="true">·</span>
            <span className="intro-tag-word" style={{ '--w': 1 }}>Web</span>
            <span className="intro-tag-sep" aria-hidden="true">·</span>
            <span className="intro-tag-word" style={{ '--w': 2 }}>Cloud</span>
            <span className="intro-tag-sep" aria-hidden="true">·</span>
            <span className="intro-tag-word" style={{ '--w': 3 }}>Music</span>
          </div>
        </div>
      </div>
    </div>
  );
}
