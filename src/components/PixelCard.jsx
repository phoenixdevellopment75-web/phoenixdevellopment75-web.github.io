import React, { useRef, useEffect, useState } from 'react';
import './PixelCard.css';

const PixelCard = ({
  children,
  className = '',
  gap = 6,
  speed = 35,
  colors = '#9DC183,#6B8E4E,#506E39',
  noFocus = false,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Memoize color array so effect dependencies are clean
  const colorArray = colors.split(',');

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let pixels = [];
    const pixelSize = 4;
    
    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const createPixels = () => {
      const newPixels = [];
      const width = canvas.width;
      const height = canvas.height;
      
      // Generate potential pixel positions along the border
      for (let x = 0; x < width; x += gap) {
        newPixels.push({ x, y: 0, life: Math.random() * 100, maxLife: 100, active: false });
        newPixels.push({ x, y: height - pixelSize, life: Math.random() * 100, maxLife: 100, active: false });
      }
      for (let y = 0; y < height; y += gap) {
        newPixels.push({ x: 0, y, life: Math.random() * 100, maxLife: 100, active: false });
        newPixels.push({ x: width - pixelSize, y, life: Math.random() * 100, maxLife: 100, active: false });
      }
      return newPixels;
    };

    pixels = createPixels();

    let lastTime = 0;
    const animate = (time) => {
      if (lastTime === 0) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isHovered) {
        pixels.forEach((p) => {
           // Randomly activate dormant pixels
           if (!p.active && Math.random() < 0.05) p.active = true;
           
           if (p.active) {
             p.life -= deltaTime * (speed / 1000);
             
             // Reset pixel when life ends
             if (p.life <= 0) {
               p.life = 100;
               p.active = false;
               // Slight random jitter for organic feel
               p.x += (Math.random() - 0.5) * gap;
               p.y += (Math.random() - 0.5) * gap;
             }
             
             const alpha = p.life / p.maxLife;
             ctx.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
             ctx.globalAlpha = Math.max(0, alpha);
             ctx.fillRect(p.x, p.y, pixelSize, pixelSize);
           }
        });
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, gap, speed, colors]); // colors string as dependency

  return (
    <div 
      className={`pixel-card-container ${className}`}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => !noFocus && setIsHovered(true)}
      onBlur={() => !noFocus && setIsHovered(false)}
      tabIndex={noFocus ? -1 : 0}
    >
      <canvas 
        ref={canvasRef} 
        className="pixel-card-canvas"
      />
      <div className="pixel-card-content">
        {children}
      </div>
    </div>
  );
};

export default PixelCard;
