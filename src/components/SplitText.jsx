import React, { useRef, useEffect, useState } from 'react';

export default function SplitText({
  text = '',
  className = '',
  delay = 50,
  animationFrom = { opacity: 0, transform: 'translateY(40px)' },
  animationTo = { opacity: 1, transform: 'translateY(0)' },
  threshold = 0.1,
  onAnimationComplete
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

  const words = text.split(' ').map(word => word.split(''));

  useEffect(() => {
    if (isVisible && onAnimationComplete) {
      const totalDelay = text.replace(/\s/g, '').length * delay;
      const timeout = setTimeout(onAnimationComplete, totalDelay + 300);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, delay, text, onAnimationComplete]);

  let charIndex = 0;

  return (
    <div ref={containerRef} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} style={{ display: 'inline-flex', marginRight: '0.25em', whiteSpace: 'pre' }}>
          {word.map((char, charIdx) => {
            const currentDelay = charIndex * delay;
            charIndex++;
            return (
              <span
                key={charIdx}
                style={{
                  display: 'inline-block',
                  transition: `opacity 300ms ease, transform 300ms ease`,
                  transitionDelay: `${currentDelay}ms`,
                  ...(isVisible ? animationTo : animationFrom),
                  willChange: 'opacity, transform'
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
