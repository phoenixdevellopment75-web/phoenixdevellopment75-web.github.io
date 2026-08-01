import React, { useRef, useEffect, useState } from 'react';

export default function AnimatedContent({
  children,
  distance = 60,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = ''
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
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : transformFrom,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}
