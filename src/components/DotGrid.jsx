import React, { useRef, useEffect } from 'react';
import './DotGrid.css';

export default function DotGrid({
  dotColor = 'rgba(107, 142, 78, 0.16)',
  activeColor = '#6B8E4E',
  dotSize = 1.6,
  spacing = 26,
  interactionRadius = 140
}) {
  const canvasRef = useRef(null);
  const targetMouseRef = useRef({ x: -1000, y: -1000 });
  const currentMouseRef = useRef({ x: -1000, y: -1000 });
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width, height;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      // High-DPI screen backing scale for retina/4K displays
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = (now) => {
      // Delta-time adjustment for 120Hz / 144Hz high refresh rate screens
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // Frame-rate independent lerp (0.08 at 60fps equivalent)
      const lerpSpeed = 1 - Math.pow(0.001, dt);
      currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * lerpSpeed;
      currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * lerpSpeed;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      const mouseX = currentMouseRef.current.x;
      const mouseY = currentMouseRef.current.y;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let currentSize = dotSize;
          let currentColor = dotColor;

          if (dist < interactionRadius) {
            const factor = Math.cos((dist / interactionRadius) * (Math.PI / 2));
            currentSize = dotSize + factor * 3.2;
            currentColor = activeColor;
          }

          ctx.fillStyle = currentColor;
          ctx.beginPath();
          ctx.arc(x, y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotColor, activeColor, dotSize, spacing, interactionRadius]);

  return (
    <div className="dot-grid-container">
      <canvas ref={canvasRef} className="dot-grid-canvas" />
    </div>
  );
}
