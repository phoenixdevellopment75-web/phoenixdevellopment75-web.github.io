import React, { useEffect, useRef, useState } from 'react';
import './ScrollVelocity.css';

export default function ScrollVelocity({
  texts = [],
  velocity = 5,
  className = ''
}) {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const requestRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = (currentTime - lastTime.current) / 1000;

      if (deltaTime > 0) {
        const v = deltaY / deltaTime;
        setScrollVelocity(v * 0.05);
      }

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Decay velocity back to 0 over time
    const decay = () => {
      setScrollVelocity((prev) => prev * 0.92);
      requestRef.current = requestAnimationFrame(decay);
    };

    requestRef.current = requestAnimationFrame(decay);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const totalVelocity = velocity + Math.min(Math.max(scrollVelocity, -30), 30);
  const duration = Math.max(8, 40 / (1 + Math.abs(totalVelocity) * 0.1));

  return (
    <div className={`scroll-velocity-container ${className}`}>
      {texts.map((text, idx) => (
        <div key={idx} className="scroll-velocity-row">
          <div
            className="scroll-velocity-track"
            style={{
              animationDuration: `${duration}s`,
              animationDirection: totalVelocity < 0 ? 'reverse' : 'normal'
            }}
          >
            <span>{text} &nbsp;•&nbsp; </span>
            <span>{text} &nbsp;•&nbsp; </span>
            <span>{text} &nbsp;•&nbsp; </span>
            <span>{text} &nbsp;•&nbsp; </span>
          </div>
        </div>
      ))}
    </div>
  );
}
