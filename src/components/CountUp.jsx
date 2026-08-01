import React, { useEffect, useState, useRef } from 'react';

export default function CountUp({
  to = 0,
  from = 0,
  duration = 2, // in seconds
  suffix = '',
  prefix = '',
  className = '',
  threshold = 0.1
}) {
  const [count, setCount] = useState(from);
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCount();
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

  const startCount = () => {
    let startTime = null;
    const target = typeof to === 'string' ? parseFloat(to) : to;
    const startVal = typeof from === 'string' ? parseFloat(from) : from;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out expo for 120Hz smooth counting
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(startVal + (target - startVal) * easeProgress);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <span ref={containerRef} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
