import React, { useRef, useState, useEffect } from 'react';
import './ScrollFloat.css';

const ScrollFloat = ({
  children,
  className = '',
  animationDuration = 0.6,
  ease = 'ease-out',
  stagger = 0.02
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0,
        rootMargin: '100px 0px'
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      clearTimeout(timer);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const text = typeof children === 'string' ? children : '';
  const characters = text.split('');

  return (
    <div ref={containerRef} className={`scroll-float-container ${className}`}>
      {characters.map((char, index) => {
        const style = {
          transitionDelay: `${index * stagger}s`,
          transitionDuration: `${animationDuration}s`,
          transitionTimingFunction: ease
        };
        
        return (
          <span 
            key={index}
            className={`scroll-float-char ${isVisible ? 'visible' : ''}`}
            style={style}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </div>
  );
};

export default ScrollFloat;
