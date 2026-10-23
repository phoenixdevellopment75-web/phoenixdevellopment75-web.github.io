/*
 * Copyright 2026 Phoenix (phoenixdevellopment75@gmail.com)
 * Licensed under the Apache License, Version 2.0
 *
 * MagneticButton — cursor-tracking magnetic pull with tactile press physics.
 * Purely CSS+JS, GPU-only (transform/opacity). No dependencies.
 */

import React, { useRef, useCallback } from 'react';
import './MagneticButton.css';

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,  // 0–1, how strongly element follows cursor
  as: Component = 'button',
  ...props
}) {
  const ref    = useRef(null);
  const animId = useRef(null);
  const state  = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const lerp = (a, b, t) => a + (b - a) * t;

  const tick = useCallback(() => {
    const s = state.current;
    s.x = lerp(s.x, s.tx, 0.12);
    s.y = lerp(s.y, s.ty, 0.12);
    if (ref.current) {
      ref.current.style.transform = `translate(${s.x}px, ${s.y}px)`;
    }
    animId.current = requestAnimationFrame(tick);
  }, []);

  const handleEnter = useCallback(() => {
    animId.current = requestAnimationFrame(tick);
  }, [tick]);

  const handleMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    state.current.tx = (e.clientX - cx) * strength;
    state.current.ty = (e.clientY - cy) * strength;
  }, [strength]);

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(animId.current);
    state.current.tx = 0;
    state.current.ty = 0;
    // spring back
    if (ref.current) ref.current.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    setTimeout(() => {
      if (ref.current) {
        ref.current.style.transform  = 'translate(0px, 0px)';
        ref.current.style.transition = '';
        state.current.x = 0;
        state.current.y = 0;
      }
    }, 20);
  }, []);

  return (
    <Component
      ref={ref}
      className={`magnetic-btn ${className}`}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </Component>
  );
}
