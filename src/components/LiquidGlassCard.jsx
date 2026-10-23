/*
 * Copyright 2026 Phoenix (phoenixdevellopment75@gmail.com)
 * Licensed under the Apache License, Version 2.0
 *
 * LiquidGlassCard — Tactile Monochrome Card with Cursor-Reactive Radial Border
 * Dynamically updates --x and --y on mousemove for 60fps radial edge lighting.
 */

import React, { useRef } from 'react';
import './LiquidGlassCard.css';

export default function LiquidGlassCard({
  children,
  className = '',
  interactive = true,
  onClick,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !interactive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !interactive) return;
    cardRef.current.style.setProperty('--x', '-1000px');
    cardRef.current.style.setProperty('--y', '-1000px');
  };

  return (
    <div
      ref={cardRef}
      className={`liquid-glass-card ${interactive ? 'interactive' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={style}
      {...props}
    >
      {/* Specular monochrome glare */}
      {interactive && <div className="glass-specular-glare" />}

      <div className="liquid-glass-content">
        {children}
      </div>
    </div>
  );
}
