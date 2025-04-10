import { CSSProperties } from 'react';

interface RadientSunProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  brightness?: number;
}

export default function RadientSun({ 
  size = 200, 
  className = '', 
  style = {},
  brightness = 0
}: RadientSunProps) {
  // Generate unique IDs for the gradients
  const gradientId = `sun-gradient-${Math.random().toString(36).substring(2, 9)}`;
  const glowGradientId = `sun-glow-gradient-${Math.random().toString(36).substring(2, 9)}`;
  
  // Calculate brightness factors
  const brightnessFactor = Math.min(1 + brightness * 0.05, 2); // Cap at 2x brightness
  const rayOpacity = Math.min(0.5 + brightness * 0.02, 0.9); // Increase ray opacity with clicks
  const rayLength = 90 + brightness * 2; // Increase ray length with clicks (max +20)
  const glowSize = 90 + brightness * 1; // Increase glow size with clicks
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200"
      className={className}
      style={{ 
        filter: `drop-shadow(0 0 ${10 + brightness}px rgba(255, 200, 50, ${0.3 + brightness * 0.02}))`,
        transition: 'all 0.5s ease',
        ...style 
      }}
    >
      {/* Definitions for gradients */}
      <defs>
        {/* Main sun gradient - yellow to orange */}
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor={`rgb(255, ${215 + brightness * 2}, ${0 + brightness * 5})`} /> {/* Brighter gold center */}
          <stop offset="80%" stopColor="#FF8C00" /> {/* Dark orange */}
          <stop offset="100%" stopColor="#FF4500" /> {/* Orange-red edge */}
        </radialGradient>
        
        {/* Glow effect gradient */}
        <radialGradient id={glowGradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor={`rgba(255, 255, ${200 + brightness * 5}, ${0.6 + brightness * 0.01})`} />
          <stop offset="70%" stopColor={`rgba(255, ${180 + brightness * 2}, 50, ${0.3 + brightness * 0.01})`} />
          <stop offset="100%" stopColor="rgba(255, 140, 0, 0)" />
        </radialGradient>
      </defs>
      
      {/* Outer glow */}
      <circle 
        cx="100" 
        cy="100" 
        r={glowSize}
        fill={`url(#${glowGradientId})`}
      />
      
      {/* Main sun circle */}
      <circle 
        cx="100" 
        cy="100" 
        r="70"
        fill={`url(#${gradientId})`}
        style={{
          transform: `scale(${brightnessFactor * 0.9})`,
          transformOrigin: 'center',
          transition: 'transform 0.5s ease'
        }}
      />
      
      {/* Rays of the sun - subtle highlight effects */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x1 = 100 + 70 * Math.cos(angle);
        const y1 = 100 + 70 * Math.sin(angle);
        const x2 = 100 + rayLength * Math.cos(angle);
        const y2 = 100 + rayLength * Math.sin(angle);
        
        return (
          <line 
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={`rgba(255, 215, 0, ${rayOpacity})`}
            strokeWidth={3 + brightness * 0.1}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
} 