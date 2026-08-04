import React, { useRef, useEffect, useState } from 'react';

export default function BlurText({
  text = '',
  className = '',
  delay = 60,
  threshold = 0,
  animateBy = 'words',
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '100px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const items = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      {items.map((item, idx) => {
        const itemDelay = idx * delay;
        return (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              marginRight: animateBy === 'words' ? '0.28em' : '0.02em',
              transition: `opacity 400ms ease ${itemDelay}ms, filter 400ms ease ${itemDelay}ms, transform 400ms ease ${itemDelay}ms`,
              opacity: isVisible ? 1 : 0.8,
              filter: isVisible ? 'blur(0px)' : 'blur(4px)',
              transform: isVisible ? 'translateY(0)' : 'translateY(4px)',
              willChange: 'opacity, filter, transform'
            }}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}
