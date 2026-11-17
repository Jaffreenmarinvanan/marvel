'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      setDisplayChildren(children);
      return;
    }

    // Keep route changes quick and consistent with the user's motion preference.
    setIsTransitioning(true);

    if (typeof window !== 'undefined') {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }

    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 180);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div className="page-transition-viewport">
      {/* Top Quantum Transit Laser Beam */}
      <div className={`quantum-transit-beam ${isTransitioning ? 'active' : ''}`} />

      {/* Main 3D Transition Container */}
      <div className={`page-3d-scene ${isTransitioning ? 'transitioning' : 'active'}`}>
        {displayChildren}
      </div>

      <style jsx global>{`
        .page-transition-viewport {
          position: relative;
          width: 100%;
          min-height: 100vh;
          perspective: 1200px;
          perspective-origin: 50% 30%;
        }

        .quantum-transit-beam {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          width: 0%;
          background: linear-gradient(90deg, #c41e3a 0%, #c9a84c 50%, #38bdf8 100%);
          box-shadow: 0 0 14px rgba(201, 168, 76, 0.8), 0 0 24px rgba(196, 30, 58, 0.6);
          z-index: 99999;
          pointer-events: none;
          transition: width 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease;
          opacity: 0;
        }

        .quantum-transit-beam.active {
          width: 100%;
          opacity: 1;
        }

        .page-3d-scene {
          width: 100%;
          min-height: 100vh;
          transition: transform 0.26s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.26s ease;
        }

        .page-3d-scene.transitioning {
          opacity: 0;
          transform: translate3d(0, 8px, 0) scale(0.995);
        }

        .page-3d-scene.active {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        @media (prefers-reduced-motion: reduce) {
          .quantum-transit-beam {
            display: none !important;
          }
          .page-3d-scene {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
