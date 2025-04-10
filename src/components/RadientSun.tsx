import { CSSProperties, useState, useEffect, useRef } from 'react';
import { Engagement, engagements } from '../data/engagements';
import EngagementModal from './EngagementModal';

interface RadientSunProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  brightness?: number;
}

interface RayPosition {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function RadientSun({ 
  size = 200, 
  className = '', 
  style = {},
  brightness = 0
}: RadientSunProps) {
  const [selectedEngagement, setSelectedEngagement] = useState<Engagement | null>(null);
  const [rayPositions, setRayPositions] = useState<RayPosition[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  
  // Generate unique IDs for the gradients
  const gradientId = `sun-gradient-${Math.random().toString(36).substring(2, 9)}`;
  const glowGradientId = `sun-glow-gradient-${Math.random().toString(36).substring(2, 9)}`;
  
  // Calculate brightness factors
  const brightnessFactor = Math.min(1 + brightness * 0.05, 2); // Cap at 2x brightness
  const glowSize = 90 + brightness * 1; // Increase glow size with clicks
  
  // Function to handle ray click
  const handleRayClick = (engagement: Engagement) => {
    setSelectedEngagement(engagement);
  };
  
  // Function to animate rays with subtle random movement
  useEffect(() => {
    // Initialize ray positions
    const initialPositions = engagements.map((_, index) => {
      const angleStep = (2 * Math.PI) / engagements.length;
      const angle = index * angleStep;
      
      const innerRadius = 70; // Match the main sun circle
      const outerRadius = 120 + (index % 3) * 15; // Vary the length of rays
      
      return {
        x1: 100 + innerRadius * Math.cos(angle),
        y1: 100 + innerRadius * Math.sin(angle),
        x2: 100 + outerRadius * Math.cos(angle),
        y2: 100 + outerRadius * Math.sin(angle)
      };
    });
    
    setRayPositions(initialPositions);
    
    // Animation function
    const animateRays = () => {
      setRayPositions(prevPositions => 
        prevPositions.map((pos, index) => {
          const angleStep = (2 * Math.PI) / engagements.length;
          const angle = index * angleStep;
          const time = Date.now() * 0.001;
          
          // Generate smooth random movement
          const noiseX = Math.sin(time + index * 0.7) * 3;
          const noiseY = Math.cos(time * 1.2 + index * 0.5) * 3;
          
          // Only move the outer point, keep inner point fixed
          return {
            ...pos,
            x2: 100 + (120 + (index % 3) * 15) * Math.cos(angle) + noiseX,
            y2: 100 + (120 + (index % 3) * 15) * Math.sin(angle) + noiseY
          };
        })
      );
      
      animationFrameRef.current = requestAnimationFrame(animateRays);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animateRays);
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  return (
    <>
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
        
        {/* Career engagement rays */}
        {engagements.map((engagement, index) => {
          const position = rayPositions[index] || { x1: 0, y1: 0, x2: 0, y2: 0 };
          
          return (
            <g key={engagement.id}>
              <line 
                className="ray"
                x1={position.x1}
                y1={position.y1}
                x2={position.x2}
                y2={position.y2}
                stroke={engagement.color}
                strokeWidth={4}
                strokeLinecap="round"
                onClick={() => handleRayClick(engagement)}
              />
              <circle 
                cx={position.x2}
                cy={position.y2}
                r={6}
                fill={engagement.color}
                className="ray"
                onClick={() => handleRayClick(engagement)}
              />
            </g>
          );
        })}
      </svg>
      {selectedEngagement && (
        <EngagementModal 
          engagement={selectedEngagement} 
          onClose={() => setSelectedEngagement(null)} 
        />
      )}
    </>
  );
} 