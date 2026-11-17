// @ts-nocheck
'use client';

import React, { useRef, useState, MouseEvent } from 'react';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

export default function TiltedCard({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.03,
  perspective = 1000,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? `perspective(${perspective}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${scale}, ${scale}, ${scale})`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      }}
    >
      {children}

      {/* Glare effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}

