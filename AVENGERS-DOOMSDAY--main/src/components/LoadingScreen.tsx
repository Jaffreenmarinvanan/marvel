'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, FastForward, Sparkles } from 'lucide-react';

/**
 * Cinematic Marvel Studios Intro Loading Screen
 *
 * Precisely synchronized with the authentic 15-second Marvel Studios intro video (public/marvel-intro.mp4).
 * Tracks video currentTime/duration with 60fps sub-millisecond precision so the 0% -> 100%
 * loading progress perfectly matches every frame of the intro fanfare.
 */
export default function LoadingScreen() {
  const [phase, setPhase] = useState<'playing' | 'fading' | 'hidden'>('playing');
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING MARVEL ARCHIVES');
  const [hasInteracted, setHasInteracted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const rafId = useRef<number | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const EXPECTED_DURATION = 14.9; // 14.908s authentic Marvel Studios intro duration

  const getStatusMessage = (pct: number) => {
    if (pct < 22) return 'INITIALIZING MARVEL ARCHIVES // ACCESSING S.H.I.E.L.D. SERVERS';
    if (pct < 45) return 'SYNCHRONIZING MULTIVERSE & TIMELINE VECTORS';
    if (pct < 70) return 'DECRYPTING HERO & VILLAIN BIOMETRIC DOSSIERS';
    if (pct < 95) return 'CALIBRATING QUANTUM FREQUENCIES & INFINITY VECTORS';
    return 'CLEARANCE GRANTED // SYSTEM ONLINE';
  };

  const finishIntro = useCallback(() => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    if (fallbackTimer.current) clearInterval(fallbackTimer.current);
    if (rafId.current) cancelAnimationFrame(rafId.current);

    setProgress(100);
    setStatusText('CLEARANCE GRANTED // SYSTEM ONLINE');
    setPhase('fading');

    fadeTimer.current = setTimeout(() => {
      setPhase('hidden');
    }, 700);
  }, []);

  const startIntro = useCallback(() => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    if (fallbackTimer.current) clearInterval(fallbackTimer.current);
    if (rafId.current) cancelAnimationFrame(rafId.current);

    setProgress(0);
    setStatusText('INITIALIZING MARVEL ARCHIVES // ACCESSING S.H.I.E.L.D. SERVERS');
    setPhase('playing');
    startTimeRef.current = Date.now();

    const video = videoRef.current;
    if (!video) return;
    try {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if autoplay policy blocks
        });
      }
    } catch {
      // Ignore
    }
  }, []);

  const toggleSound = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    setHasInteracted(true);
    if (!nextMuted) {
      video.play().catch(() => {});
    }
  }, []);

  const handleGlobalClick = useCallback(() => {
    // If muted on initial user tap/click anywhere, unmute to play the epic fanfare
    if (isMuted && videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setHasInteracted(true);
      videoRef.current.play().catch(() => {});
    }
  }, [isMuted]);

  // Support ESC key to skip intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && phase === 'playing') {
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, finishIntro]);

  // Replay event listener for homepage button
  useEffect(() => {
    const onReplay = () => startIntro();
    window.addEventListener('replay-marvel-intro', onReplay);
    return () => {
      window.removeEventListener('replay-marvel-intro', onReplay);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      if (fallbackTimer.current) clearInterval(fallbackTimer.current);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [startIntro]);

  // Main high-precision 60fps sync loop
  useEffect(() => {
    if (phase !== 'playing') return;

    const video = videoRef.current;
    startTimeRef.current = Date.now();

    // High frequency RAF loop for silky smooth progress bar & exact counter sync
    const syncFrame = () => {
      if (!video) return;

      const dur = (video.duration && Number.isFinite(video.duration) && video.duration > 0)
        ? video.duration
        : EXPECTED_DURATION;

      let pct = 0;

      if (!video.paused && video.currentTime > 0) {
        pct = (video.currentTime / dur) * 100;
      } else {
        // Fallback: elapsed wall time if video hasn't fired currentTime yet
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        pct = (elapsed / dur) * 100;
      }

      pct = Math.min(100, Math.max(0, pct));
      setProgress(pct);
      setStatusText(getStatusMessage(pct));

      if (pct >= 99.6 || (video.ended && video.currentTime > 0)) {
        finishIntro();
        return;
      }

      rafId.current = requestAnimationFrame(syncFrame);
    };

    rafId.current = requestAnimationFrame(syncFrame);

    const onLoadedData = () => {
      if (video) {
        video.play().catch(() => {});
      }
    };

    const onEnded = () => finishIntro();
    const onError = () => {
      // If video file cannot be decoded, let the smooth fallback timer run to 100%
    };

    if (video) {
      video.addEventListener('loadeddata', onLoadedData);
      video.addEventListener('ended', onEnded);
      video.addEventListener('error', onError);
      video.play().catch(() => {});
    }

    // Safety fallback: if video is blocked entirely, guarantee site opens within 15 seconds
    fallbackTimer.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      if (elapsed >= EXPECTED_DURATION + 0.5) {
        finishIntro();
      }
    }, 500);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (fallbackTimer.current) clearInterval(fallbackTimer.current);
      if (video) {
        video.removeEventListener('loadeddata', onLoadedData);
        video.removeEventListener('ended', onEnded);
        video.removeEventListener('error', onError);
      }
    };
  }, [phase, finishIntro]);

  if (phase === 'hidden') return null;

  const displayPercent = Math.min(100, Math.floor(progress));

  return (
    <div
      className={`intro-screen ${phase === 'fading' ? 'intro-fading' : ''}`}
      onClick={handleGlobalClick}
      aria-hidden={phase === 'fading'}
    >
      {/* Cinematic Marvel Studios Video Background */}
      <video
        ref={videoRef}
        src="/marvel-intro.mp4"
        className="intro-video"
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
      />

      {/* Top Floating Controls */}
      <div className="intro-top-bar" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={toggleSound}
          className={`intro-ctrl ${isMuted ? 'intro-sound-muted' : 'intro-sound-active'}`}
          aria-label={isMuted ? 'Enable intro audio' : 'Mute intro audio'}
          title="Toggle Marvel Studios Fanfare Sound"
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          <span>{isMuted ? 'SOUND: OFF' : 'SOUND: ON'}</span>
        </button>

        <button
          type="button"
          onClick={finishIntro}
          className="intro-ctrl intro-skip"
          aria-label="Skip intro to main archives"
          title="Skip Intro (Esc)"
        >
          <span>SKIP INTRO</span>
          <FastForward size={14} />
        </button>
      </div>

      {/* Sound Hint Pill (Shown only when muted and user hasn't clicked yet) */}
      {isMuted && !hasInteracted && (
        <div className="intro-audio-hint" onClick={handleGlobalClick}>
          <Sparkles size={14} className="hint-icon" />
          <span>CLICK ANYWHERE FOR MARVEL FANFARE AUDIO</span>
        </div>
      )}

      {/* Bottom HUD: Live Sync Loading Bar & Status */}
      <div className="intro-bottom-hud" onClick={(e) => e.stopPropagation()}>
        <div className="intro-hud-content">
          <div className="intro-meta-row">
            <span className="intro-status-text">{statusText}</span>
            <div className="intro-pct-counter">
              <span className="intro-pct-number">{displayPercent}</span>
              <span className="intro-pct-unit">%</span>
            </div>
          </div>

          <div className="intro-progress-track">
            <div
              className="intro-progress-bar"
              style={{ width: `${progress}%` }}
            />
            <div
              className="intro-progress-glow"
              style={{ left: `${Math.max(0, progress - 4)}%` }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .intro-screen {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s ease;
          overflow: hidden;
          cursor: pointer;
        }

        .intro-fading {
          opacity: 0;
          filter: brightness(1.4) contrast(1.1);
          pointer-events: none;
        }

        .intro-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #000000;
          z-index: 0;
        }

        /* Top Bar */
        .intro-top-bar {
          position: absolute;
          top: 24px;
          right: 28px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .intro-ctrl {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #ffffff;
          font-family: var(--font-body), system-ui, -apple-system, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          border-radius: 9999px;
          cursor: pointer;
          backdrop-filter: blur(12px);
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
        }

        .intro-ctrl:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-1px);
        }

        .intro-sound-muted {
          border-color: rgba(201, 168, 76, 0.4);
          color: #f5e6c0;
        }

        .intro-sound-muted:hover {
          border-color: #c9a84c;
          background: rgba(201, 168, 76, 0.2);
        }

        .intro-sound-active {
          border-color: #10b981;
          color: #34d399;
          background: rgba(16, 185, 129, 0.15);
        }

        .intro-skip {
          border-color: rgba(196, 30, 58, 0.6);
          color: #ff6b7a;
          background: rgba(196, 30, 58, 0.12);
        }

        .intro-skip:hover {
          background: #c41e3a;
          border-color: #ff4444;
          color: #ffffff;
        }

        /* Audio Hint Center Pill */
        .intro-audio-hint {
          position: absolute;
          top: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(201, 168, 76, 0.5);
          border-radius: 9999px;
          color: #f5e6c0;
          font-family: var(--font-body), system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          box-shadow: 0 0 20px rgba(201, 168, 76, 0.3);
          animation: pulse-audio 2.2s ease-in-out infinite;
          cursor: pointer;
          backdrop-filter: blur(12px);
          user-select: none;
        }

        :global(.hint-icon) {
          color: #c9a84c;
        }

        @keyframes pulse-audio {
          0%, 100% {
            border-color: rgba(201, 168, 76, 0.4);
            box-shadow: 0 0 16px rgba(201, 168, 76, 0.2);
            transform: translateX(-50%) scale(1);
          }
          50% {
            border-color: rgba(201, 168, 76, 0.85);
            box-shadow: 0 0 28px rgba(201, 168, 76, 0.45);
            transform: translateX(-50%) scale(1.02);
          }
        }

        /* Bottom HUD */
        .intro-bottom-hud {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          padding: 24px 36px 28px;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.85) 45%, #000000 100%);
          pointer-events: auto;
        }

        .intro-hud-content {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .intro-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .intro-status-text {
          font-family: 'Courier New', Courier, monospace;
          font-size: clamp(10px, 1.2vw, 12px);
          font-weight: 700;
          color: rgba(201, 168, 76, 0.85);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-shadow: 0 0 12px rgba(201, 168, 76, 0.4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .intro-pct-counter {
          display: inline-flex;
          align-items: baseline;
          font-family: var(--font-body), system-ui, -apple-system, sans-serif;
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
        }

        .intro-pct-number {
          font-size: clamp(20px, 2.5vw, 26px);
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
          text-shadow: 0 0 14px rgba(255, 255, 255, 0.4);
        }

        .intro-pct-unit {
          font-size: clamp(12px, 1.4vw, 15px);
          margin-left: 2px;
          color: #c9a84c;
        }

        .intro-progress-track {
          position: relative;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          overflow: visible;
        }

        .intro-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #9b1c1c 0%, #c41e3a 50%, #e21820 100%);
          border-radius: 9999px;
          box-shadow: 0 0 16px rgba(226, 24, 32, 0.8);
          transition: width 0.05s linear;
        }

        .intro-progress-glow {
          position: absolute;
          top: -3px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 12px #ff4444, 0 0 20px #e21820;
          pointer-events: none;
          transition: left 0.05s linear;
        }

        @media (max-width: 640px) {
          .intro-top-bar {
            top: 16px;
            right: 16px;
            gap: 8px;
          }

          .intro-ctrl {
            padding: 7px 12px;
            font-size: 10px;
          }

          .intro-audio-hint {
            top: 68px;
            padding: 6px 12px;
            font-size: 9px;
          }

          .intro-bottom-hud {
            padding: 16px 18px 20px;
          }

          .intro-status-text {
            font-size: 9px;
          }

          .intro-pct-number {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}
