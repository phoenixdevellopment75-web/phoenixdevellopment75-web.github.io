import React, { useRef, useEffect, useState } from 'react';

export default function AnimatedContent({
  children,
  distance = 30,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  threshold = 0,
  className = ''
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
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

  let transformFrom = '';
  switch (direction) {
    case 'up': transformFrom = `translateY(${distance}px)`; break;
    case 'down': transformFrom = `translateY(-${distance}px)`; break;
    case 'left': transformFrom = `translateX(${distance}px)`; break;
    case 'right': transformFrom = `translateX(-${distance}px)`; break;
    default: transformFrom = `translateY(${distance}px)`;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        transition: `opacity ${duration}s ease, transform ${duration}s ease`,
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0.8,
        transform: isVisible ? 'translate(0, 0)' : transformFrom,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}
