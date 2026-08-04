import React, { useRef, useState, useEffect } from 'react';
import './ScrollFloat.css';

const ScrollFloat = ({
  children,
  className = '',
  animationDuration = 1,
  ease = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Back ease out approximation
  stagger = 0.03
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px' // simple way to offset trigger somewhat
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
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
