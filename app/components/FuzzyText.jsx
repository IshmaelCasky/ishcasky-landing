'use client';

import { useRef, useEffect, useMemo } from 'react';

export default function FuzzyText({ 
  children = '404',
  fontSize = '8rem',
  fontWeight = 900,
  color = '#000',
  enableHover = true 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const isHoveringRef = useRef(false);

  const text = useMemo(() => String(children), [children]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };
    updateSize();

    // Animation
    let time = 0;
    const animate = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Set font
      ctx.font = `${fontWeight} ${fontSize} system-ui, -apple-system, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Calculate intensity based on hover state
      const intensity = isHoveringRef.current ? 8 : 2;
      
      // Draw fuzzy layers
      const layers = 5;
      for (let i = 0; i < layers; i++) {
        const offset = (i - layers / 2) * 0.5;
        const alpha = 1 - (Math.abs(offset) / (layers / 2)) * 0.3;
        
        // Add some noise/distortion
        const noiseX = Math.sin(time * 0.02 + i) * intensity;
        const noiseY = Math.cos(time * 0.015 + i * 0.5) * intensity * 0.5;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillText(
          text,
          rect.width / 2 + noiseX,
          rect.height / 2 + offset * 2 + noiseY
        );
        ctx.restore();
      }
      
      // Add glitch lines occasionally
      if (Math.random() > 0.95 || isHoveringRef.current) {
        const glitchHeight = 2 + Math.random() * 4;
        const glitchY = Math.random() * rect.height;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.1;
        ctx.fillRect(0, glitchY, rect.width, glitchHeight);
        ctx.globalAlpha = 1;
      }
      
      time++;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [text, fontSize, fontWeight, color]);

  const handleMouseEnter = () => {
    if (enableHover) isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-48 md:h-64"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 cursor-pointer"
      />
    </div>
  );
}
