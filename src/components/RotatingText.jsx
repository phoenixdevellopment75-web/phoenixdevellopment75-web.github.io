import React, { useState, useEffect } from 'react';
import './RotatingText.css';

export default function RotatingText({
  texts = [],
  rotationInterval = 2500,
  className = ''
}) {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  useEffect(() => {
    if (texts.length <= 1) return;

    const interval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFadeState('fade-in');
      }, 300);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts, rotationInterval]);

  return (
    <span className={`rotating-text-wrapper ${className}`}>
      <span className={`rotating-text-item ${fadeState}`}>
        {texts[index]}
      </span>
    </span>
  );
}
