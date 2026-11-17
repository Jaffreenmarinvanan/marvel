// @ts-nocheck
'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  className = '',
  suffix = '',
  prefix = '',
}: CountUpProps) {
  const [count, setCount] = useState<number>(from);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const diff = to - from;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(from + diff * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, to, from, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

