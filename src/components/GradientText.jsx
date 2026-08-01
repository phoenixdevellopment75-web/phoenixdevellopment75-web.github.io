import React from 'react';
import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  colors = ['#9DC183', '#F5F2EB', '#B4DB96', '#9DC183'],
  animationSpeed = 8,
  showBorder = false
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`
  };

  return (
    <span className={`gradient-text-container ${showBorder ? 'with-border' : ''} ${className}`}>
      <span className="gradient-text" style={gradientStyle}>
        {children}
      </span>
    </span>
  );
}
