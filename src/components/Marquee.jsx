import React from 'react';
import './Marquee.css';

export default function Marquee({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className = ''
}) {
  return (
    <div className={`marquee-container ${pauseOnHover ? 'pause-on-hover' : ''} ${className}`}>
      <div 
        className={`marquee-content direction-${direction}`}
        style={{ '--speed': `${speed}s` }}
      >
        {children}
      </div>
      <div 
        className={`marquee-content direction-${direction}`}
        style={{ '--speed': `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
}
