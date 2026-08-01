import React, { useEffect, useState, useRef } from 'react';

export default function DecryptedText({
  text = '',
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  animateOn = 'view', // 'view' or 'hover'
  threshold = 0.1
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            triggerAnimation();
            observer.disconnect();
          }
        },
        { threshold }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [animateOn, threshold]);

  const triggerAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const originalText = text;
    const textLength = originalText.length;

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            
            let isRevealed = false;
            if (sequential) {
              if (revealDirection === 'start') {
                isRevealed = idx < Math.floor((iteration / maxIterations) * textLength);
              } else {
                isRevealed = idx >= textLength - Math.floor((iteration / maxIterations) * textLength);
              }
            } else {
              isRevealed = iteration >= maxIterations;
            }

            if (isRevealed) return char;

            const charSet = useOriginalCharsOnly
              ? originalText.replace(/\s/g, '')
              : characters;
            return charSet[Math.floor(Math.random() * charSet.length)];
          })
          .join('')
      );

      iteration += 1;

      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsAnimating(false);
      }
    }, speed);
  };

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      triggerAnimation();
    }
  };

  return (
    <span
      ref={containerRef}
      className={`${parentClassName} ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      {displayText}
    </span>
  );
}
