import React from 'react';
import './Aurora.css';

const Aurora = ({
  colorStops = ['#6B8E4E', '#9DC183', '#506E39', '#B4DB96'],
  speed = 6,
  blur = 80,
  opacity = 0.4
}) => {
  return (
    <div 
      className="aurora-container"
      style={{
        opacity: opacity,
        '--blur-amount': `${blur}px`,
        '--aurora-speed': `${speed}s`,
        '--color-1': colorStops[0],
        '--color-2': colorStops[1],
        '--color-3': colorStops[2],
        '--color-4': colorStops[3] || colorStops[0],
      }}
    >
      <div className="aurora-blob aurora-blob-1"></div>
      <div className="aurora-blob aurora-blob-2"></div>
      <div className="aurora-blob aurora-blob-3"></div>
    </div>
  );
};

export default Aurora;
