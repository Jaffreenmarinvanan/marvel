// @ts-nocheck
'use client';

import React, { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover';
  sequential?: boolean;
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=~[]{}|;:,.<>?';

export default function DecryptedText({
  text,
  speed = 45,
  maxIterations = 10,
  characters = DEFAULT_CHARS,
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-sky-400 opacity-80',
  animateOn = 'hover',
  sequential = true,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const triggerAnimation = () => {
    let currentIteration = 0;
    const originalText = text;
    const textLength = originalText.length;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (sequential) {
              if (index < Math.floor((currentIteration / maxIterations) * textLength)) {
                return originalText[index];
              }
            } else {
              if (currentIteration >= maxIterations) {
                return originalText[index];
              }
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      currentIteration++;

      if (currentIteration > maxIterations + (sequential ? textLength : 0)) {
        clearInterval(interval);
        setDisplayText(originalText);
      }
    }, speed);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              setHasAnimated(true);
              triggerAnimation();
            }
          });
        },
        { threshold: 0.2 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [animateOn, hasAnimated, text]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      setIsHovering(true);
      triggerAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === 'hover') {
      setIsHovering(false);
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block font-mono tracking-wider cursor-default ${parentClassName}`}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}

