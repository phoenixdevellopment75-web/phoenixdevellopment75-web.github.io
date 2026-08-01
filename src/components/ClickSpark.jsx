import React, { useEffect, useRef } from 'react';

export default function ClickSpark({
  sparkColor = '#9DC183',
  sparkSize = 10,
  sparkRadius = 25,
  sparkCount = 8,
  duration = 400,
  children
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handlePointerDown = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();

      for (let i = 0; i < sparkCount; i++) {
        const angle = (2 * Math.PI * i) / sparkCount;
        sparksRef.current.push({
          x,
          y,
          angle,
          startTime: now
        });
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);

    const animate = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.startTime;
        if (elapsed > duration) return false;

        const progress = elapsed / duration;
        const distance = progress * sparkRadius;
        const currentX = spark.x + Math.cos(spark.angle) * distance;
        const currentY = spark.y + Math.sin(spark.angle) * distance;
        const currentSize = sparkSize * (1 - progress);

        ctx.fillStyle = sparkColor;
        ctx.beginPath();
        ctx.arc(currentX, currentY, currentSize / 2, 0, 2 * Math.PI);
        ctx.fill();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99999
        }}
      />
      {children}
    </>
  );
}
