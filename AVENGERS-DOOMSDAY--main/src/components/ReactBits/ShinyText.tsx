// @ts-nocheck
'use client';

import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shineColor?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
  shineColor = '#ffffff',
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`shiny-text inline-block relative font-bold ${className}`}
      style={{
        backgroundImage: disabled
          ? 'none'
          : `linear-gradient(120deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.45) 30%, ${shineColor} 50%, rgba(255, 255, 255, 0.45) 70%, rgba(255, 255, 255, 0.45) 100%)`,
        backgroundSize: '250% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: disabled ? 'inherit' : 'transparent',
        animation: disabled ? 'none' : `shineSweep ${animationDuration} ease-in-out infinite`,
      }}
    >
      {text}
      <style jsx>{`
        @keyframes shineSweep {
          0% {
            background-position: 150% 0;
          }
          100% {
            background-position: -150% 0;
          }
        }
      `}</style>
    </span>
  );
}

