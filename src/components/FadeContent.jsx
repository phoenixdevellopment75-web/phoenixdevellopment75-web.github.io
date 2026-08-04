import React, { useRef, useState, useEffect } from 'react';

const FadeContent = ({
  children,
  blur = true,
  duration = 0.6,
  delay = 0,
  easing = 'ease-out',
  threshold = 0,
  initialOpacity = 1,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: '100px 0px' }
    );

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      clearTimeout(timer);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const style = {
    opacity: isVisible ? 1 : initialOpacity,
    filter: blur ? (isVisible ? 'blur(0px)' : 'blur(4px)') : 'none',
    transition: `opacity ${duration}s ${easing} ${delay}s, filter ${duration}s ${easing} ${delay}s`,
    willChange: 'opacity, filter'
  };

  return (
    <div ref={containerRef} style={style} className={className}>
      {children}
    </div>
  );
};

export default FadeContent;
