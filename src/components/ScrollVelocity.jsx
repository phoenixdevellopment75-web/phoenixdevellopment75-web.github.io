import React, { useRef, useEffect } from 'react';
import './ScrollVelocity.css';

/**
 * ScrollVelocity — Smooth infinite horizontal marquee
 * Uses pure CSS animation (no scroll-linked jitter).
 * Two rows scrolling in opposite directions for visual depth.
 */
export default function ScrollVelocity({
  texts = [],
  velocity = 4,
  className = ''
}) {
  // Base duration — lower velocity = slower scroll
  const baseDuration = Math.max(12, 60 / velocity);

  return (
    <div className={`scroll-velocity-container ${className}`}>
      {texts.map((text, idx) => (
        <div key={idx} className="scroll-velocity-row">
          <div
            className="scroll-velocity-track"
            style={{
              animationDuration: `${baseDuration + idx * 4}s`,
              animationDirection: idx % 2 === 0 ? 'normal' : 'reverse',
            }}
          >
            {/* Repeat 6x for seamless loop */}
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="scroll-velocity-item">
                {text}
                <span className="scroll-velocity-dot">✦</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
