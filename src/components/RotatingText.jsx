import React, { useState, useEffect } from 'react';
import './RotatingText.css';

export default function RotatingText({
  texts = [],
  rotationInterval = 2800,
  className = ''
}) {
  const [index, setIndex] = useState(0);
  const [animState, setAnimState] = useState('active');

  useEffect(() => {
    if (texts.length <= 1) return;

    const interval = setInterval(() => {
      setAnimState('exit');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setAnimState('enter');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimState('active');
          });
        });
      }, 400);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts, rotationInterval]);

  return (
    <span className={`rotating-text-wrapper ${className}`}>
      <span className={`rotating-text-item ${animState}`}>
        {texts[index]}
      </span>
    </span>
  );
}
