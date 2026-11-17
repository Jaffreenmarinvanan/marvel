'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, FastForward } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   MATRIX EQUALIZER LOADING BAR (Capsule + Spectrum Waves + %)
   ───────────────────────────────────────────────────────────── */
function MatrixEqualizerBar({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const drawRef = useRef<(() => void) | null>(null);
  const animationEnabledRef = useRef(false);
  progressRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    const barCount = 48;
    let t = 0;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let shouldAnimate = window.innerWidth > 768 && !motionPreference.matches;
    animationEnabledRef.current = shouldAnimate;

    const resize = () => {
      if (!canvas) return;
      const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const cssWidth = canvas.parentElement?.clientWidth || 440;
      const cssHeight = 36;
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();

    const render = () => {
      if (shouldAnimate) t += 0.09;
      const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      const totalBarWidth = w / barCount;
      const barPadding = 3.2;
      const barWidth = Math.max(2.4, totalBarWidth - barPadding);
      const activeThreshold = (progressRef.current / 100) * barCount;

      for (let i = 0; i < barCount; i++) {
        const x = i * totalBarWidth + barPadding / 2;
        const isActive = i <= activeThreshold;

        // Dynamic frequency height waveform
        const wave1 = Math.sin(t * 3.2 + i * 0.38);
        const wave2 = Math.cos(t * 4.8 - i * 0.22);
        const wave3 = Math.sin(t * 7.5 + i * 0.75);
        const centerEmphasis = 1 - Math.abs((i - barCount / 2) / (barCount / 2)) * 0.25;
        const rawFactor = (0.35 + 0.38 * wave1 + 0.18 * wave2 + 0.09 * wave3) * centerEmphasis;
        const heightFactor = Math.max(0.18, Math.min(0.96, rawFactor));

        const maxBarH = h - 6;
        const barH = isActive ? Math.max(7, maxBarH * heightFactor) : Math.max(4, maxBarH * 0.15);
        const y = (h - barH) / 2;

        ctx.beginPath();
        // Use roundRect if supported, fallback to rect
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, y, barWidth, barH, 2);
        } else {
          ctx.rect(x, y, barWidth, barH);
        }

        if (isActive) {
          const grad = ctx.createLinearGradient(0, y, 0, y + barH);
          grad.addColorStop(0, '#a7f3d0');
          grad.addColorStop(0.3, '#00ff88');
          grad.addColorStop(0.7, '#10b981');
          grad.addColorStop(1, '#047857');
          ctx.fillStyle = grad;
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = 'rgba(0, 255, 136, 0.14)';
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      if (shouldAnimate) animId = requestAnimationFrame(render);
    };

    drawRef.current = render;
    render();

    const handleResize = () => {
      cancelAnimationFrame(animId);
      resize();
      shouldAnimate = window.innerWidth > 768 && !motionPreference.matches;
      animationEnabledRef.current = shouldAnimate;
      render();
    };

    const handleMotionPreference = () => {
      cancelAnimationFrame(animId);
      shouldAnimate = window.innerWidth > 768 && !motionPreference.matches;
      animationEnabledRef.current = shouldAnimate;
      render();
    };

    window.addEventListener('resize', handleResize);
    motionPreference.addEventListener('change', handleMotionPreference);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      motionPreference.removeEventListener('change', handleMotionPreference);
      drawRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Static mobile and reduced-motion bars still track the changing load value.
    if (!animationEnabledRef.current) drawRef.current?.();
  }, [progress]);

  return (
    <div className="matrix-equalizer-wrapper">
      <div className="matrix-capsule-track">
        <canvas ref={canvasRef} className="matrix-canvas" />
      </div>
      <div className="matrix-pct-row">
        <span className="matrix-pct-number">{Math.floor(progress)}</span>
        <span className="matrix-pct-symbol">%</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN LOADING SCREEN COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done' | 'hidden'>('loading');
  const [statusText, setStatusText] = useState('INITIALIZING MARVEL ARCHIVES');
  const [glitchActive, setGlitchActive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [show, setShow] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startIntro = useCallback(() => {
    setProgress(0);
    setPhase('loading');
    setShow(true);
    setStatusText('INITIALIZING MARVEL ARCHIVES');
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const skipIntro = useCallback(() => {
    setProgress(100);
    setStatusText('CLEARANCE CONFIRMED — ACCESS GRANTED');
    setPhase('done');
    setTimeout(() => {
      setPhase('hidden');
    }, 600);
  }, []);

  const toggleSound = useCallback(() => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  }, []);

  useEffect(() => {
    setShow(true);

    const onReplay = () => {
      startIntro();
    };

    window.addEventListener('replay-marvel-intro', onReplay);
    return () => window.removeEventListener('replay-marvel-intro', onReplay);
  }, [startIntro]);

  useEffect(() => {
    if (phase !== 'loading') return;

    const statusMessages = [
      'INITIALIZING MARVEL ARCHIVES',
      'CALIBRATING QUANTUM SPECTRUM',
      'LOADING INFINITY STONE MATRIX',
      'SYNCING HERO TELEMETRY',
      'ACCESSING S.H.I.E.L.D. SECURE DATABASE',
      'DECRYPTING CLASSIFIED DOSSIERS',
      'CONNECTING MULTIVERSE GATEWAYS',
      'SYSTEM ONLINE — ACCESS GRANTED',
    ];

    let current = 0;
    const targetDuration = 5200;
    const intervalMs = 50;
    const steps = targetDuration / intervalMs;
    const increment = 100 / steps;

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 140);
    }, 850);

    const msgInterval = setInterval(() => {
      current = Math.min(current + 1, statusMessages.length - 1);
      setStatusText(statusMessages[current]);
    }, targetDuration / statusMessages.length);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Sync with video if available
        if (videoRef.current && videoRef.current.duration) {
          const videoPct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
          if (videoPct > prev) return Math.min(100, Math.floor(videoPct));
        }

        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          clearInterval(glitchInterval);
          clearInterval(msgInterval);
          setStatusText('SYSTEM ONLINE — WELCOME, OPERATIVE');
          setProgress(100);
          setTimeout(() => {
            setPhase('done');
            setTimeout(() => {
              setPhase('hidden');
            }, 800);
          }, 500);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => {
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
      clearInterval(msgInterval);
    };
  }, [phase]);

  if (phase === 'hidden') return null;
  if (!show && phase === 'loading') return null;

  return (
    <div
      className="loading-screen-overlay"
      style={{
        opacity: phase === 'done' ? 0 : 1,
        pointerEvents: phase === 'done' ? 'none' : 'all',
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src="/marvel-intro.mp4"
        autoPlay
        muted={isMuted}
        playsInline
        onEnded={skipIntro}
        className="loading-bg-video"
      />

      {/* Dark overlay on video */}
      <div className="loading-dark-overlay" />

      {/* Scanlines */}
      <div className="loading-scanlines" />

      {/* Controls: Skip & Audio */}
      <div className="loading-controls">
        <button
          type="button"
          onClick={toggleSound}
          className="hud-ctrl-btn"
          title={isMuted ? 'Enable Sound' : 'Mute Sound'}
          aria-label="Toggle intro sound"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          <span>{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
        </button>

        <button
          type="button"
          onClick={skipIntro}
          className="hud-ctrl-btn skip-btn"
          title="Skip Intro"
          aria-label="Skip intro to website"
        >
          <span>SKIP INTRO</span>
          <FastForward size={14} />
        </button>
      </div>

      {/* Corner HUD decorations */}
      <div className="hud-corner top-left">
        <span className="hud-label">MARVEL CINEMATIC UNIVERSE</span>
        <span className="hud-sub">ARCHIVES v4.2.0</span>
      </div>
      <div className="hud-corner top-right">
        <span className="hud-label">CLEARANCE: LEVEL 7</span>
        <span className="hud-sub">S.H.I.E.L.D. AUTHORIZED</span>
      </div>
      <div className="hud-corner bottom-left">
        <span className="hud-label">THREAT LEVEL: OMEGA</span>
        <span className="hud-sub">AVENGERS PROTOCOL ACTIVE</span>
      </div>
      <div className="hud-corner bottom-right">
        <span className="hud-label">QUANTUM GRID: ONLINE</span>
        <span className="hud-sub">NODE: 616-ALPHA</span>
      </div>

      {/* Center content */}
      <div className={`loading-center ${glitchActive ? 'glitch' : ''}`}>
        {/* Marvel Studios Box */}
        <div className="marvel-logo-box">
          <span className="marvel-word">MARVEL</span>
          <span className="studios-word">STUDIOS</span>
        </div>
        <div className="archives-text">ARCHIVES</div>

        {/* Status message */}
        <div className="status-text">{statusText}</div>

        {/* Dynamic Matrix Equalizer Capsule Loading Bar */}
        <MatrixEqualizerBar progress={progress} />
      </div>

      <style jsx>{`
        .loading-screen-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .loading-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.65;
          z-index: 0;
        }

        .loading-dark-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.78) 70%, #000 100%);
          z-index: 1;
        }

        .loading-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 2px,
            rgba(0,0,0,0.14) 2px,
            rgba(0,0,0,0.14) 4px
          );
          z-index: 2;
          pointer-events: none;
        }

        .loading-controls {
          position: absolute;
          top: 24px;
          right: 24px;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hud-ctrl-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(11, 13, 20, 0.85);
          border: 1px solid rgba(201, 168, 76, 0.4);
          color: #c9a84c;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }

        .hud-ctrl-btn:hover {
          background: rgba(201, 168, 76, 0.2);
          border-color: #c9a84c;
          color: #fff;
          transform: translateY(-1px);
        }

        .hud-ctrl-btn.skip-btn {
          border-color: rgba(227, 27, 35, 0.6);
          color: #ff5252;
        }

        .hud-ctrl-btn.skip-btn:hover {
          background: rgba(227, 27, 35, 0.25);
          border-color: #e31b23;
          color: #fff;
        }

        /* HUD Corners */
        .hud-corner {
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 10;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.08em;
          pointer-events: none;
        }
        .hud-corner.top-left { top: 24px; left: 24px; align-items: flex-start; }
        .hud-corner.top-right { top: 68px; right: 24px; align-items: flex-end; }
        .hud-corner.bottom-left { bottom: 32px; left: 24px; align-items: flex-start; }
        .hud-corner.bottom-right { bottom: 32px; right: 24px; align-items: flex-end; }
        .hud-corner::before {
          content: '';
          display: block;
          width: 50px;
          height: 50px;
          border-color: rgba(201, 168, 76, 0.6);
          border-style: solid;
          border-width: 0;
          position: absolute;
        }
        .hud-corner.top-left::before { top: -6px; left: -6px; border-top-width: 2px; border-left-width: 2px; }
        .hud-corner.top-right::before { top: -6px; right: -6px; border-top-width: 2px; border-right-width: 2px; }
        .hud-corner.bottom-left::before { bottom: -6px; left: -6px; border-bottom-width: 2px; border-left-width: 2px; }
        .hud-corner.bottom-right::before { bottom: -6px; right: -6px; border-bottom-width: 2px; border-right-width: 2px; }
        .hud-label {
          font-size: 10px;
          color: #c9a84c;
          text-transform: uppercase;
          font-weight: 700;
        }
        .hud-sub {
          font-size: 9px;
          color: rgba(201, 168, 76, 0.55);
          text-transform: uppercase;
        }

        /* Center content */
        .loading-center {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          text-align: center;
          width: 540px;
          max-width: 92vw;
          transition: transform 0.1s;
        }
        .loading-center.glitch {
          transform: translate(2px, -1px) skewX(-0.5deg);
          filter: hue-rotate(5deg);
        }

        /* Marvel Studios Box */
        .marvel-logo-box {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 3px solid #fff;
          padding: 6px 18px;
          background: #e21820;
          box-shadow: 0 0 35px rgba(226, 24, 32, 0.8), 0 0 70px rgba(226, 24, 32, 0.4);
        }
        .marvel-word {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: clamp(38px, 8vw, 68px);
          line-height: 0.9;
          color: #fff;
          letter-spacing: 0.04em;
        }
        .studios-word {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: clamp(14px, 2.5vw, 22px);
          font-weight: 800;
          letter-spacing: 0.28em;
          color: #fff;
          border-left: 2px solid rgba(255, 255, 255, 0.6);
          padding-left: 10px;
        }

        .archives-text {
          font-family: 'Courier New', monospace;
          font-size: clamp(14px, 2.5vw, 20px);
          letter-spacing: 0.45em;
          color: #c9a84c;
          text-shadow: 0 0 20px rgba(201, 168, 76, 0.8);
          margin-top: -4px;
          text-transform: uppercase;
          font-weight: 700;
        }

        /* Status */
        .status-text {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: rgba(201, 168, 76, 0.85);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: 4px;
          min-height: 16px;
        }

        /* Equalizer Loading Style */
        :global(.matrix-equalizer-wrapper) {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          width: 100%;
          max-width: 480px;
          margin-top: 10px;
        }

        :global(.matrix-capsule-track) {
          width: 100%;
          height: 44px;
          padding: 4px 14px;
          border-radius: 9999px;
          background: rgba(3, 12, 7, 0.88);
          border: 1.5px solid rgba(0, 255, 136, 0.55);
          box-shadow: 0 0 28px rgba(0, 255, 136, 0.25),
                      0 0 60px rgba(0, 255, 136, 0.12),
                      inset 0 0 16px rgba(0, 255, 136, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(14px);
        }

        :global(.matrix-canvas) {
          width: 100%;
          height: 100%;
          display: block;
        }

        :global(.matrix-pct-row) {
          display: flex;
          align-items: baseline;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          text-shadow: 0 0 16px rgba(0, 255, 136, 0.6), 0 0 32px rgba(0, 255, 136, 0.3);
          letter-spacing: 0.02em;
          line-height: 1;
        }

        :global(.matrix-pct-number) {
          font-variant-numeric: tabular-nums;
        }

        :global(.matrix-pct-symbol) {
          font-size: 20px;
          margin-left: 2px;
          color: #a7f3d0;
          opacity: 0.95;
        }

        @media (max-width: 768px) {
          .hud-corner { display: none; }
          .loading-controls { top: 16px; right: 16px; }
          :global(.matrix-capsule-track) {
            height: 38px;
            padding: 3px 10px;
          }
          :global(.matrix-pct-row) {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}
