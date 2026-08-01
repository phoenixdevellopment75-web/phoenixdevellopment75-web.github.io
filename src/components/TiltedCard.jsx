import React, { useRef, useState } from 'react';
import './TiltedCard.css';

export default function TiltedCard({
  children,
  className = '',
  tiltMaxAngle = 12,
  scale = 1.02,
  perspective = 1000,
  glareEnable = true,
  glareMaxOpacity = 0.15
}) {
  const cardRef = useRef(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    setIsLeaving(false);
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = x / width;
    const yPct = y / height;
    
    const rotateX = (0.5 - yPct) * tiltMaxAngle * 2;
    const rotateY = (xPct - 0.5) * tiltMaxAngle * 2;
    
    setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);
    
    if (glareEnable) {
      setGlareStyle({
        '--glare-x': `${x}px`,
        '--glare-y': `${y}px`,
        '--glare-opacity': glareMaxOpacity
      });
    }
  };

  const handleMouseLeave = () => {
    setIsLeaving(true);
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`);
    if (glareEnable) {
      setGlareStyle({
        '--glare-opacity': 0
      });
    }
  };

  return (
    <div className={`tilted-card-wrapper ${className}`}>
      <div
        ref={cardRef}
        className={`tilted-card ${isLeaving ? 'leaving' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform }}
      >
        {children}
        {glareEnable && <div className="tilted-card-glare" style={glareStyle} />}
      </div>
    </div>
  );
}
