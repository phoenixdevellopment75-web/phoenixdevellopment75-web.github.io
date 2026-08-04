import React, { useEffect, useRef } from 'react';

const Ribbons = ({
  baseHue = 120,
  count = 5,
  speed = 0.8,
  opacity = 0.35,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let time = 0;
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Initialize ribbon properties
    const ribbons = Array.from({ length: count }, () => ({
      yOffset: (Math.random() - 0.5) * canvas.height * 0.5,
      phase: Math.random() * Math.PI * 2,
      amplitude: 50 + Math.random() * 150,
      frequency: 0.001 + Math.random() * 0.003,
      width: 20 + Math.random() * 80,
      hue: baseHue + (Math.random() * 40 - 20),
      speedMult: 0.5 + Math.random() * 1.5,
    }));

    const render = () => {
      time += speed * 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        
        let startY = canvas.height / 2 + ribbon.yOffset + Math.sin(ribbon.phase + time * ribbon.speedMult) * ribbon.amplitude;
        ctx.moveTo(0, startY);

        for (let x = 0; x <= canvas.width; x += 20) {
          const y = canvas.height / 2 + ribbon.yOffset + 
            Math.sin(x * ribbon.frequency + ribbon.phase + time * ribbon.speedMult) * ribbon.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineWidth = ribbon.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = `hsla(${ribbon.hue}, 60%, 55%, ${opacity})`;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [baseHue, count, speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default Ribbons;
