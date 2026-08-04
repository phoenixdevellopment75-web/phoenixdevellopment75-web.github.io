import React, { useRef, useEffect, useState } from 'react';

export default function BlurText({
  text = '',
  className = '',
  delay = 100,
  threshold = 0.1,
  animateBy = 'words', // 'words' or 'letters'
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
              transition: `opacity 500ms ease ${itemDelay}ms, filter 500ms ease ${itemDelay}ms, transform 500ms ease ${itemDelay}ms`,
              opacity: isVisible ? 1 : 0,
              filter: isVisible ? 'blur(0px)' : 'blur(10px)',
              transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
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
