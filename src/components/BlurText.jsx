import React, { useRef, useEffect, useState } from 'react';

export default function BlurText({
  text = '',
  className = '',
  delay = 100,
  threshold = 0.1
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {words.map((word, idx) => (
        <span
          key={idx}
          style={{
            display: 'inline-block',
            marginRight: '0.25em',
            transition: `opacity 400ms ease, filter 400ms ease`,
            transitionDelay: `${idx * delay}ms`,
            opacity: isVisible ? 1 : 0,
            filter: isVisible ? 'blur(0px)' : 'blur(8px)',
            willChange: 'opacity, filter'
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
