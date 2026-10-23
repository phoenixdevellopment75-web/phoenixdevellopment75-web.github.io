/*
 * Copyright 2026 Phoenix (phoenixdevellopment75@gmail.com)
 * Licensed under the Apache License, Version 2.0
 *
 * ScrollReveal — IntersectionObserver-powered scroll entrance.
 * Each child can set a custom delay via style --reveal-delay.
 */

import React, { useRef, useEffect } from 'react';
import './ScrollReveal.css';

export default function ScrollReveal({
  children,
  className = '',
  threshold = 0.15,
  delay = 0,         // ms base delay
  distance = '28px', // how far elements travel in
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip animation if reduced-motion is preferred
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (pref.matches) { el.style.opacity = '1'; el.style.transform = 'none'; return; }

    el.style.setProperty('--reveal-delay', `${delay}ms`);
    el.style.setProperty('--reveal-distance', distance);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible');
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, delay, distance]);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`} {...props}>
      {children}
    </div>
  );
}
