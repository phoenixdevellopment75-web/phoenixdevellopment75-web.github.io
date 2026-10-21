import React, { useRef, useState } from 'react';
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || !interactive) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`liquid-glass-card ${interactive ? 'interactive' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={style}
      {...props}
    >
      {/* Specular Monochrome Glare Reflection */}
      {interactive && (
        <div
          className="glass-specular-glare"
          style={{
            background: `radial-gradient(circle 240px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 70%)`,
          }}
        />
      )}

      <div className="liquid-glass-content">
        {children}
      </div>
    </div>
  );
}
