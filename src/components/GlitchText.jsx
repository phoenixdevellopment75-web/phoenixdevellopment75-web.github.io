import React from 'react';
import './GlitchText.css';

const GlitchText = ({
  text,
  className = '',
  speed = 3,
  enableShadow = true,
  colors = { primary: 'currentColor', glitch1: '#00F0FF', glitch2: '#FF006E' }
}) => {
  const style = {
    '--glitch-speed': `${speed}s`,
    '--glitch-primary': colors.primary,
    '--glitch-color-1': colors.glitch1,
    '--glitch-color-2': colors.glitch2,
    ...(enableShadow && { textShadow: `2px 0 ${colors.glitch1}, -2px 0 ${colors.glitch2}` })
  };

  return (
    <span
      className={`glitch-text ${className}`}
      data-text={text}
      style={style}
    >
      {text}
    </span>
  );
};

export default GlitchText;
