/*
 * Copyright 2026 Phoenix (phoenixdevellopment75@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * HarmonicStringWaveform — Tactile interactive Carnatic Veena string physics.
 * 4 harmonic courses (Sa, Pa, Sa', Pa'). Pluck on hover/touch.
 * Zero CPU/GPU overhead when off-screen via IntersectionObserver.
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import './HarmonicStringWaveform.css';

// Carnatic Veena 4-string fundamental ratios (Sa - Pa - Sa' - Pa')
const STRINGS = [
  { note: 'Sa',  freq: 1.0,  label: 'Mandra Shadjam (Lower Sa)',   opacity: 0.9,  color: '#ffffff' },
  { note: 'Pa',  freq: 1.5,  label: 'Mandra Panchamam (Lower Pa)',  opacity: 0.75, color: '#e4e4e7' },
  { note: 'Sa˙', freq: 2.0,  label: 'Madhya Shadjam (Middle Sa)',   opacity: 0.6,  color: '#cbd5e1' },
  { note: 'Pa˙', freq: 3.0,  label: 'Madhya Panchamam (Middle Pa)', opacity: 0.45, color: '#94a3b8' },
];

export default function HarmonicStringWaveform() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(false);
  const [activeNote, setActiveNote] = useState('Touch or hover strings');

  // String state: amplitude, decay, phase, target displacement
  const stringStates = useRef(
    STRINGS.map(() => ({
      amp: 0,
      targetAmp: 0,
      phase: 0,
      decay: 0.965,
      nodes: 3,
    }))
  );

  const mousePos = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, prevY: -1000 });

  // Pluck a specific string index with given intensity
  const pluck = useCallback((idx, intensity = 1.0) => {
    if (idx < 0 || idx >= stringStates.current.length) return;
    const s = stringStates.current[idx];
    s.amp = Math.min(26, s.amp + 16 * intensity);
    setActiveNote(`${STRINGS[idx].note} · ${STRINGS[idx].label}`);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height || 160;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let time = 0;

    const render = () => {
      if (!isVisibleRef.current) return;

      time += 0.04;
      ctx.clearRect(0, 0, width, height);

      const numStrings = STRINGS.length;
      const verticalPadding = 26;
      const availableHeight = height - verticalPadding * 2;
      const stringSpacing = availableHeight / (numStrings - 1 || 1);

      // Draw faint brass fret lines (representing Veena frets)
      const numFrets = 12;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let f = 1; f < numFrets; f++) {
        const fx = (width / numFrets) * f;
        ctx.beginPath();
        ctx.moveTo(fx, verticalPadding - 8);
        ctx.lineTo(fx, height - verticalPadding + 8);
        ctx.stroke();
      }

      // Draw and oscillate strings
      STRINGS.forEach((strConfig, i) => {
        const state = stringStates.current[i];
        const baseY = verticalPadding + i * stringSpacing;

        // Damping physics
        state.amp *= state.decay;
        if (state.amp < 0.05) state.amp = 0;
        state.phase += 0.12 * strConfig.freq;

        // Draw string path
        ctx.beginPath();
        const steps = 80;
        for (let s = 0; s <= steps; s++) {
          const x = (width / steps) * s;
          const normalizedX = x / width;

          // Standing wave physics: fundamental + overtones
          const standingWave =
            Math.sin(normalizedX * Math.PI) * 0.75 +
            Math.sin(normalizedX * Math.PI * 2) * 0.2 +
            Math.sin(normalizedX * Math.PI * 3) * 0.05;

          const waveOffset = prefersReducedMotion
            ? 0
            : Math.sin(state.phase * 2 + normalizedX * 2) * state.amp * standingWave;

          const y = baseY + waveOffset;

          if (s === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // String styling
        ctx.strokeStyle = strConfig.color;
        ctx.globalAlpha = strConfig.opacity * (0.6 + (state.amp / 26) * 0.4);
        ctx.lineWidth = Math.max(1, 2.2 - i * 0.35);
        ctx.stroke();

        // String glow when vibrating
        if (state.amp > 1) {
          ctx.save();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.lineWidth = 4 + (state.amp / 26) * 4;
          ctx.stroke();
          ctx.restore();
        }

        // Fixed bridge pegs at ends
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(8, baseY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(width - 8, baseY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;

      if (!prefersReducedMotion) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    // IntersectionObserver: HALTS loop completely when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animFrameRef.current);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [pluck]);

  // Handle pointer hover / pluck
  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mousePos.current.prevY !== -1000) {
      const dy = Math.abs(y - mousePos.current.prevY);
      mousePos.current.vy = dy;
    }
    mousePos.current.prevY = y;
    mousePos.current.x = x;
    mousePos.current.y = y;

    // Detect closest string
    const numStrings = STRINGS.length;
    const verticalPadding = 26;
    const availableHeight = rect.height - verticalPadding * 2;
    const stringSpacing = availableHeight / (numStrings - 1 || 1);

    STRINGS.forEach((_, idx) => {
      const baseY = verticalPadding + idx * stringSpacing;
      const dist = Math.abs(y - baseY);
      if (dist < stringSpacing * 0.45) {
        pluck(idx, Math.min(1.4, Math.max(0.6, mousePos.current.vy / 8)));
      }
    });
  };

  const handlePointerLeave = () => {
    mousePos.current.prevY = -1000;
  };

  return (
    <div className="harmonic-waveform-container" ref={containerRef}>
      <div className="harmonic-meta-header">
        <div className="harmonic-badge">
          <span className="harmonic-pulse-dot" />
          <span>CARNATIC VEENA // HARMONIC RESONANCE OSCILLATOR</span>
        </div>
        <div className="harmonic-note-display">{activeNote}</div>
      </div>

      <div
        className="harmonic-canvas-wrapper"
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            handlePointerMove(e.touches[0]);
          }
        }}
      >
        <canvas ref={canvasRef} className="harmonic-canvas" />
      </div>

      <div className="harmonic-footer-meta">
        <span>SA (C#) · PA (G#) · SA' (C#') · PA' (G#')</span>
        <span>ZERO RUNTIME OFF-SCREEN // 60 FPS MATH</span>
      </div>
    </div>
  );
}
