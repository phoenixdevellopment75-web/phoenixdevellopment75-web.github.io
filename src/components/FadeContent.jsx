import React, { useRef, useState, useEffect } from 'react';

const FadeContent = ({
  children,
  blur = true,
  duration = 0.8,
  delay = 0,
  easing = 'ease-out',
  threshold = 0.15,
  initialOpacity = 0,
  className = ''
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
        threshold
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
  }, [threshold]);

  const style = {
    opacity: isVisible ? 1 : initialOpacity,
    filter: blur ? (isVisible ? 'blur(0px)' : 'blur(8px)') : 'none',
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
