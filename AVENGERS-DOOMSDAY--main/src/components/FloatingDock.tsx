// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { Layers, X, ChevronUp } from 'lucide-react';
import MarvelDock from './MarvelDock';

export default function FloatingDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!scrolled) return null;

  return (
    <div className="floating-dock-root">
      {!isOpen ? (
        <button
          type="button"
          className="dock-launch-pill"
          onClick={() => setIsOpen(true)}
          aria-label="Open Floating MCU Dock"
          title="Open Floating Quick Navigation Dock"
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>MCU DOCK</span>
          <ChevronUp className="w-3.5 h-3.5 opacity-70" />
        </button>
      ) : (
        <div className="floating-dock-panel">
          <div className="floating-dock-bar-header">
            <span className="floating-dock-badge">MCU ARCHIVES DOCK</span>
            <button
              type="button"
              className="dock-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Floating Dock"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="floating-dock-content">
            <MarvelDock
              showCategoryTabs={true}
              baseItemSize={40}
              magnification={58}
              autoHide={false}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .floating-dock-root {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 990;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: auto;
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, 15px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .dock-launch-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 0, 0, 0.95);
          border: 1px solid rgba(201, 168, 76, 0.4);
          border-radius: 9999px;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8), 0 0 12px rgba(201, 168, 76, 0.2);
          backdrop-filter: blur(16px);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .dock-launch-pill:hover {
          background: #0a0a0a;
          border-color: var(--gold);
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.7), 0 0 18px rgba(201, 168, 76, 0.35);
        }

        .floating-dock-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          background: rgba(11, 13, 20, 0.92);
          border: 1px solid rgba(201, 168, 76, 0.35);
          border-radius: 20px;
          padding: 0.75rem 1.25rem 1rem;
          box-shadow: 0 24px 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(201, 168, 76, 0.15);
          backdrop-filter: blur(20px);
          max-width: 95vw;
        }

        .floating-dock-bar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0 0.5rem;
        }

        .floating-dock-badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--gold);
          text-transform: uppercase;
        }

        .dock-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s ease, background 0.15s ease;
        }

        .dock-close-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.1);
        }

        .floating-dock-content {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
