// @ts-nocheck
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ─────────────────────────── DATA ── */
const STONES = [
  { id: 'space-stone',   name: 'SPACE',   img: '/images/stones/space.png',   color: '#3b82f6', glow: '#1d4ed8', textColor: '#60a5fa' },
  { id: 'mind-stone',    name: 'MIND',    img: '/images/stones/mind.png',    color: '#eab308', glow: '#78350f', textColor: '#fbbf24' },
  { id: 'reality-stone', name: 'REALITY', img: '/images/stones/reality.png', color: '#e31b23', glow: '#7a0a0e', textColor: '#f87171' },
  { id: 'power-stone',   name: 'POWER',   img: '/images/stones/power.png',   color: '#a855f7', glow: '#581c87', textColor: '#c084fc' },
  { id: 'time-stone',    name: 'TIME',    img: '/images/stones/time.png',    color: '#22c55e', glow: '#14532d', textColor: '#4ade80' },
  { id: 'soul-stone',    name: 'SOUL',    img: '/images/stones/soul.png',    color: '#f97316', glow: '#7c2d12', textColor: '#fb923c' },
];

const EXPLORE_TILES = [
  { href: '/heroes',         label: 'Heroes',          sub: 'The Mightiest Protectors',     color: '#3b82f6', icon: '⚡' },
  { href: '/villains',       label: 'Villains',         sub: 'Threats to the Universe',       color: '#e31b23', icon: '☠' },
  { href: '/movies',         label: 'Films & Series',   sub: '128 MCU Entries',               color: '#c9a84c', icon: '◈' },
  { href: '/weapons',        label: 'Weapons',          sub: 'Legendary Artifacts',           color: '#a855f7', icon: '⚔' },
  { href: '/infinity-stones',label: 'Infinity Stones',  sub: 'Six Singularities',             color: '#22c55e', icon: '✦' },
  { href: '/timeline',       label: 'Timeline',         sub: 'Events Across Time',            color: '#f97316', icon: '◉' },
];

const STATS = [
  { label: 'HEROES',   value: 60,  suffix: '+' },
  { label: 'VILLAINS', value: 45,  suffix: '+' },
  { label: 'FILMS',    value: 128, suffix: '' },
  { label: 'ARTIFACTS',value: 150, suffix: '+' },
];

/* ─────────────────────────── STARFIELD ── */
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0;
    let stars: { x: number; y: number; r: number; speed: number; opacity: number; pulse: number }[] = [];
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const init = () => {
      w = window.innerWidth; h = window.innerHeight;
      const pr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * pr); canvas.height = Math.round(h * pr);
      ctx.setTransform(pr, 0, 0, pr, 0, 0);
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.1 + 0.2,
        speed: Math.random() * 0.18 + 0.04,
        opacity: Math.random() * 0.55 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.pulse += 0.012;
        const a = s.opacity * (0.6 + 0.4 * Math.sin(s.pulse));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${a})`; ctx.fill();
        if (motionOk) { s.y -= s.speed; if (s.y < 0) { s.y = h; s.x = Math.random() * w; } }
      }
      raf = requestAnimationFrame(draw);
    };

    init(); draw();
    const onResize = () => { cancelAnimationFrame(raf); init(); draw(); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0, opacity: 0.6,
    }} />
  );
}

/* ─────────────────────────── STAT COUNTER ── */
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(value); return; }
      const t0 = performance.now(), dur = 900;
      const run = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        setCount(Math.floor(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(run);
      };
      frame = requestAnimationFrame(run);
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => { obs.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);

  return (
    <div ref={ref} className="stat-item">
      <span className="stat-num">{count}{suffix}</span>
      <span className="stat-lbl">{label}</span>
    </div>
  );
}

/* ─────────────────────────── EXPLORE TILE ── */
function ExploreTile({ href, label, sub, color, icon, i }: typeof EXPLORE_TILES[0] & { i: number }) {
  return (
    <Link href={href} className="explore-tile" style={{ '--c': color, '--delay': `${i * 0.07}s` } as React.CSSProperties}>
      <div className="explore-tile-top" style={{ background: color }} />
      <div className="explore-tile-icon" style={{ color }}>{icon}</div>
      <div className="explore-tile-label">{label}</div>
      <div className="explore-tile-sub">{sub}</div>
      <div className="explore-tile-arrow" style={{ color }}>→</div>
    </Link>
  );
}

/* ─────────────────────────── PAGE ── */
export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const canParallax = window.matchMedia('(min-width:769px) and (hover:hover) and (prefers-reduced-motion:no-preference)');
    if (!canParallax.matches) return;
    let raf = 0;
    const onMouse = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / innerWidth - 0.5) * 24;
        const y = (e.clientY / innerHeight - 0.5) * 16;
        if (glowRef.current) glowRef.current.style.transform = `translate3d(${x * 0.4}px, ${y * 0.4}px, 0)`;
        if (heroRef.current) heroRef.current.style.transform =
          `perspective(1200px) rotateX(${y * -0.12}deg) rotateY(${x * 0.12}deg) translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
      });
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => { window.removeEventListener('mousemove', onMouse); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="hp-root">
      {mounted && <StarField />}

      {/* ══════════ HERO ══════════ */}
      <section className="hp-hero">
        {/* Ambient glow blobs */}
        <div ref={glowRef} className="hp-glow-layer">
          <div className="glow-blob gb1" />
          <div className="glow-blob gb2" />
          <div className="glow-blob gb3" />
        </div>

        {/* Top HUD bar */}
        <div className="hp-hud-bar">
          <span className="hp-hud-left">◈ MARVEL CINEMATIC UNIVERSE — CLASSIFIED ARCHIVE</span>
          <span className="hp-hud-right">STATUS: <span className="hud-online">ONLINE</span></span>
        </div>

        {/* Central title */}
        <div ref={heroRef} className="hp-hero-center">
          <div className="hp-eyebrow">S.H.I.E.L.D. DATABASE · CLEARANCE LEVEL OMEGA</div>

          <h1 className="hp-title">
            <span className="hp-title-marvel">MARVEL</span>
            <span className="hp-title-archives">ARCHIVES</span>
          </h1>

          <p className="hp-tagline">
            Every Story. Every Hero. Every Detail.<br />
            <span className="hp-tagline-sub">— Classified Access Granted —</span>
          </p>

          <div className="hp-hero-cta">
            <Link href="/movies" className="hp-btn-primary">
              <span>ENTER ARCHIVES</span>
              <span className="hp-btn-arrow">→</span>
            </Link>
            <Link href="/heroes" className="hp-btn-outline">HEROES</Link>
            <Link href="/infinity-stones" className="hp-btn-outline">STONES</Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hp-scroll-cue">
          <div className="hp-scroll-line" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ══════════ STATS BAR ══════════ */}
      <section className="hp-stats">
        <div className="hp-divider" />
        <div className="hp-stats-row">
          {STATS.map(s => <StatCounter key={s.label} {...s} />)}
        </div>
        <div className="hp-divider" />
      </section>

      {/* ══════════ INFINITY STONES ══════════ */}
      <section className="hp-stones">
        <div className="stones-bg-radial" />
        <div className="stones-header">
          <div className="stones-line" />
          <h2 className="stones-title">THE INFINITY STONES</h2>
          <div className="stones-line" />
        </div>
        <p className="stones-subtext">
          Six singularities — each containing the primordial essence of the cosmos
        </p>
        <div className="stones-row">
          {STONES.map((s, i) => (
            <Link
              key={s.id}
              href={`/infinity-stones/${s.id}`}
              className="stone-item"
              style={{ '--sc': s.color, '--sg': s.glow, '--st': s.textColor, '--sd': `${i * 0.08}s` } as React.CSSProperties}
            >
              <div className="stone-gem-wrap">
                <div className="stone-glow-ring" />
                <img
                  src={s.img}
                  alt={`${s.name} Stone`}
                  className="stone-gem-img"
                />
              </div>
              <div className="stone-name" style={{ color: s.textColor }}>{s.name}</div>
              <div className="stone-label">STONE</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ EXPLORE GRID ══════════ */}
      <section className="hp-explore">
        <div className="explore-header">
          <div className="explore-line" />
          <h2 className="explore-heading">EXPLORE THE UNIVERSE</h2>
          <div className="explore-line" />
        </div>
        <div className="explore-grid">
          {EXPLORE_TILES.map((t, i) => <ExploreTile key={t.href} {...t} i={i} />)}
        </div>
      </section>

      {/* ══════════ FEATURED BANNER ══════════ */}
      <section className="hp-banner">
        <div className="banner-inner">
          <div className="banner-corner bl" /><div className="banner-corner br" />
          <div className="banner-corner tl" /><div className="banner-corner tr" />
          <div className="banner-eyebrow">AVENGERS PROTOCOL · PHASE 6</div>
          <h2 className="banner-title">AVENGERS: DOOMSDAY</h2>
          <p className="banner-sub">
            The convergence is coming. Every Avenger. Every variant.<br/>Every sacrifice — documented in full.
          </p>
          <Link href="/movies/avengers-doomsday" className="banner-cta">
            ACCESS DOSSIER →
          </Link>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="hp-cta">
        <div className="cta-rings">
          <div className="cta-ring r1" /><div className="cta-ring r2" /><div className="cta-ring r3" />
        </div>
        <h2 className="cta-title">BEGIN YOUR MISSION</h2>
        <p className="cta-sub">Access classified intelligence on every operative, threat, and artifact in the MCU</p>
        <div className="cta-buttons">
          <Link href="/heroes" className="hp-btn-primary">HEROES DATABASE</Link>
          <Link href="/villains" className="hp-btn-outline">VILLAIN REGISTRY</Link>
          <Link href="/movies" className="hp-btn-outline">FULL ARCHIVE</Link>
        </div>
      </section>

      <style jsx>{`
        /* ── ROOT ── */
        .hp-root {
          min-height: 100vh;
          background: #000;
          color: #e8e0d0;
          overflow-x: clip;
          position: relative;
        }

        /* ── HERO ── */
        .hp-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hp-glow-layer {
          position: absolute;
          inset: -50%;
          pointer-events: none;
          z-index: 1;
          transition: transform 0.2s ease-out;
        }
        .glow-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
        }
        .gb1 {
          width: 70vw; height: 70vw;
          top: 10%; left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(ellipse, rgba(227,27,35,0.18) 0%, transparent 70%);
        }
        .gb2 {
          width: 50vw; height: 50vw;
          top: 30%; left: 15%;
          background: radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%);
        }
        .gb3 {
          width: 50vw; height: 50vw;
          top: 20%; right: 10%;
          background: radial-gradient(ellipse, rgba(59,130,246,0.09) 0%, transparent 70%);
        }

        /* HUD bar */
        .hp-hud-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          background: rgba(0,0,0,0.75);
          border-bottom: 1px solid rgba(201,168,76,0.3);
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          color: rgba(201,168,76,0.65);
          z-index: 10;
          backdrop-filter: blur(10px);
        }
        .hp-hud-right { font-weight: 700; }
        .hud-online { color: #22c55e; }

        /* Hero center */
        .hp-hero-center {
          position: relative;
          z-index: 5;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          margin-top: 40px;
          transform-style: preserve-3d;
          transition: transform 0.18s ease-out;
        }

        .hp-eyebrow {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.45em;
          color: rgba(201,168,76,0.8);
          text-transform: uppercase;
        }

        .hp-title {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0;
          line-height: 0.88;
        }
        .hp-title-marvel {
          font-family: Impact, 'Arial Black', sans-serif;
          font-size: clamp(90px, 16vw, 180px);
          color: #e31b23;
          letter-spacing: -0.01em;
          text-shadow:
            0 0 60px rgba(227,27,35,0.9),
            0 0 120px rgba(227,27,35,0.5),
            6px 6px 0 #7a0a0e,
            -2px -2px 0 #ff6068;
        }
        .hp-title-archives {
          font-family: Impact, 'Arial Black', sans-serif;
          font-size: clamp(28px, 5.5vw, 70px);
          color: #c9a84c;
          letter-spacing: clamp(0.15em, 4vw, 0.6em);
          text-shadow:
            0 0 35px rgba(201,168,76,0.85),
            0 0 70px rgba(201,168,76,0.4);
          margin-top: 8px;
        }

        .hp-tagline {
          font-family: 'Courier New', monospace;
          font-size: clamp(12px, 1.6vw, 16px);
          color: rgba(232,224,208,0.75);
          letter-spacing: 0.12em;
          line-height: 1.8;
          margin: 0;
        }
        .hp-tagline-sub {
          color: rgba(201,168,76,0.65);
          font-size: 0.85em;
          letter-spacing: 0.18em;
        }

        .hp-hero-cta {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }

        /* Scroll cue */
        .hp-scroll-cue {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-family: 'Courier New', monospace;
          font-size: 9px;
          letter-spacing: 0.35em;
          color: rgba(201,168,76,0.5);
          z-index: 5;
          animation: fade-in-up 1.5s 1.5s ease-out backwards;
        }
        .hp-scroll-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, rgba(201,168,76,0.8), transparent);
          animation: scroll-pulse 2s ease-in-out infinite;
        }
        @keyframes scroll-pulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.6); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* ── BUTTONS ── */
        .hp-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 32px;
          background: #e31b23;
          color: #fff;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          box-shadow: 0 0 25px rgba(227,27,35,0.5);
        }
        .hp-btn-primary:hover {
          background: #ff2d35;
          box-shadow: 0 0 40px rgba(227,27,35,0.75);
          transform: translateY(-2px);
        }
        .hp-btn-arrow { font-size: 16px; }

        .hp-btn-outline {
          display: inline-flex;
          align-items: center;
          padding: 14px 26px;
          background: transparent;
          color: rgba(232,224,208,0.7);
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(232,224,208,0.2);
          transition: all 0.2s ease;
        }
        .hp-btn-outline:hover {
          border-color: rgba(201,168,76,0.7);
          color: #c9a84c;
          box-shadow: 0 0 20px rgba(201,168,76,0.25);
          transform: translateY(-2px);
        }

        /* ── STATS ── */
        .hp-stats {
          position: relative;
          z-index: 2;
          padding: 36px 24px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(12px);
        }
        .hp-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.5), rgba(227,27,35,0.4), transparent);
          margin: 10px 0;
        }
        .hp-stats-row {
          display: flex;
          justify-content: center;
          gap: clamp(32px, 6vw, 80px);
          flex-wrap: wrap;
          padding: 24px 0;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .stat-num {
          font-family: Impact, 'Arial Black', sans-serif;
          font-size: clamp(44px, 7vw, 80px);
          color: #e31b23;
          text-shadow: 0 0 40px rgba(227,27,35,0.65);
          line-height: 1;
        }
        .stat-lbl {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.28em;
          color: rgba(201,168,76,0.75);
          text-transform: uppercase;
        }

        /* ══════════════════════════════════════
           INFINITY STONES — premium, no box
           ══════════════════════════════════════ */
        .hp-stones {
          position: relative;
          z-index: 2;
          padding: 90px 24px 100px;
          text-align: center;
          overflow: hidden;
        }

        /* deep dark background with stone-colour ambience */
        .stones-bg-radial {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(10,5,30,0.95) 0%, #000 100%);
          pointer-events: none;
        }

        .stones-header {
          position: relative;
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 20px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        .stones-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.5));
        }
        .stones-line:last-child {
          background: linear-gradient(to left, transparent, rgba(201,168,76,0.5));
        }
        .stones-title {
          font-family: 'Courier New', monospace;
          font-size: clamp(12px, 1.5vw, 16px);
          letter-spacing: clamp(0.3em, 2vw, 0.65em);
          color: rgba(201,168,76,0.9);
          text-transform: uppercase;
          margin: 0;
          white-space: nowrap;
        }

        .stones-subtext {
          position: relative;
          font-family: 'Courier New', monospace;
          font-size: clamp(11px, 1.3vw, 14px);
          letter-spacing: 0.08em;
          color: rgba(201,168,76,0.65);
          margin: 0 0 60px;
        }

        /* Row of stones — no box */
        .stones-row {
          position: relative;
          display: flex;
          justify-content: center;
          gap: clamp(24px, 4vw, 56px);
          flex-wrap: wrap;
        }

        /* Each stone — just floating, NO box/border/card */
        .stone-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          cursor: pointer;
          animation: stone-in 0.6s ease-out backwards;
          animation-delay: var(--sd);
          transition: transform 0.3s ease;
        }
        .stone-item:hover {
          transform: translateY(-10px);
        }
        @keyframes stone-in {
          from { opacity: 0; transform: translateY(30px) scale(0.85); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .stone-gem-wrap {
          position: relative;
          width: 160px;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Soft ambient glow ring behind stone — NO hard border */
        .stone-glow-ring {
          position: absolute;
          inset: -22px;
          border-radius: 50%;
          background: radial-gradient(ellipse at 50% 60%, var(--sc) 0%, transparent 70%);
          opacity: 0.4;
          filter: blur(18px);
          transition: opacity 0.3s ease, filter 0.3s ease;
        }
        .stone-item:hover .stone-glow-ring {
          opacity: 0.75;
          filter: blur(14px);
        }

        .stone-gem-img {
          position: relative;
          z-index: 2;
          width: 138px;
          height: 138px;
          object-fit: contain;
          filter:
            drop-shadow(0 0 24px var(--sc))
            drop-shadow(0 0 50px var(--sg))
            drop-shadow(0 0 10px rgba(255,255,255,0.2));
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .stone-item:hover .stone-gem-img {
          filter:
            drop-shadow(0 0 30px var(--sc))
            drop-shadow(0 0 55px var(--sg))
            drop-shadow(0 0 15px rgba(255,255,255,0.25));
          transform: scale(1.08);
        }

        .stone-name {
          font-family: 'Courier New', monospace;
          font-size: clamp(10px, 1.2vw, 13px);
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .stone-label {
          font-family: 'Courier New', monospace;
          font-size: 9px;
          letter-spacing: 0.28em;
          color: rgba(232,224,208,0.4);
          text-transform: uppercase;
          margin-top: -8px;
        }

        /* ── EXPLORE GRID ── */
        .hp-explore {
          position: relative;
          z-index: 2;
          padding: 80px 24px;
          max-width: 1300px;
          margin: 0 auto;
        }
        .explore-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 44px;
        }
        .explore-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.4));
        }
        .explore-line:last-child {
          background: linear-gradient(to left, transparent, rgba(201,168,76,0.4));
        }
        .explore-heading {
          font-family: 'Courier New', monospace;
          font-size: 13px;
          letter-spacing: 0.4em;
          color: rgba(201,168,76,0.85);
          text-transform: uppercase;
          white-space: nowrap;
          margin: 0;
        }
        .explore-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: 16px;
        }
        .explore-tile {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 28px 26px;
          background: rgba(5,5,5,0.9);
          border: 1px solid rgba(255,255,255,0.07);
          text-decoration: none;
          color: #e8e0d0;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          animation: tile-in 0.5s ease-out backwards;
          animation-delay: var(--delay);
          backdrop-filter: blur(10px);
        }
        .explore-tile:hover {
          transform: translateY(-5px);
          border-color: var(--c);
          box-shadow: 0 15px 40px rgba(0,0,0,0.7), 0 0 25px var(--c);
        }
        @keyframes tile-in {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .explore-tile-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }
        .explore-tile-icon {
          font-size: 26px;
          margin-bottom: 4px;
          filter: drop-shadow(0 0 8px var(--c));
        }
        .explore-tile-label {
          font-family: Impact, 'Arial Black', sans-serif;
          font-size: 20px;
          letter-spacing: 0.04em;
          color: #fff;
        }
        .explore-tile-sub {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: rgba(232,224,208,0.5);
          text-transform: uppercase;
        }
        .explore-tile-arrow {
          position: absolute;
          bottom: 22px; right: 22px;
          font-size: 20px;
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .explore-tile:hover .explore-tile-arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        /* ── FEATURED BANNER ── */
        .hp-banner {
          position: relative;
          z-index: 2;
          margin: 0 24px 80px;
          max-width: 1300px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 24px 80px;
        }
        .banner-inner {
          position: relative;
          padding: 60px 48px;
          background:
            linear-gradient(135deg, rgba(227,27,35,0.08) 0%, rgba(0,0,0,0.98) 60%),
            rgba(5,5,5,0.95);
          border: 1px solid rgba(227,27,35,0.3);
          text-align: center;
          overflow: hidden;
        }
        .banner-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(227,27,35,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        /* Corner brackets */
        .banner-corner {
          position: absolute;
          width: 20px; height: 20px;
          border-color: rgba(227,27,35,0.6);
          border-style: solid;
          border-width: 0;
        }
        .banner-corner.tl { top: 10px; left: 10px; border-top-width: 2px; border-left-width: 2px; }
        .banner-corner.tr { top: 10px; right: 10px; border-top-width: 2px; border-right-width: 2px; }
        .banner-corner.bl { bottom: 10px; left: 10px; border-bottom-width: 2px; border-left-width: 2px; }
        .banner-corner.br { bottom: 10px; right: 10px; border-bottom-width: 2px; border-right-width: 2px; }
        .banner-eyebrow {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.4em;
          color: rgba(227,27,35,0.75);
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .banner-title {
          font-family: Impact, 'Arial Black', sans-serif;
          font-size: clamp(36px, 6vw, 72px);
          color: #fff;
          text-shadow: 0 0 50px rgba(227,27,35,0.75);
          margin: 0 0 16px;
          letter-spacing: 0.03em;
        }
        .banner-sub {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: rgba(232,224,208,0.6);
          line-height: 1.8;
          margin: 0 0 32px;
        }
        .banner-cta {
          display: inline-flex;
          padding: 14px 30px;
          background: rgba(227,27,35,0.15);
          border: 1px solid rgba(227,27,35,0.5);
          color: #ff6068;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .banner-cta:hover {
          background: rgba(227,27,35,0.3);
          border-color: #e31b23;
          color: #fff;
          box-shadow: 0 0 25px rgba(227,27,35,0.4);
        }

        /* ── CTA SECTION ── */
        .hp-cta {
          position: relative;
          z-index: 2;
          padding: 90px 24px 110px;
          text-align: center;
          overflow: hidden;
        }
        .cta-rings {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .cta-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.08);
          animation: ring-pulse 3s ease-in-out infinite;
        }
        .r1 { width: 400px; height: 400px; animation-delay: 0s; }
        .r2 { width: 650px; height: 650px; animation-delay: 0.6s; }
        .r3 { width: 900px; height: 900px; animation-delay: 1.2s; }
        @keyframes ring-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.1; }
        }
        .cta-title {
          font-family: Impact, 'Arial Black', sans-serif;
          font-size: clamp(40px, 7vw, 88px);
          color: #fff;
          text-shadow: 0 0 50px rgba(227,27,35,0.55);
          margin: 0 0 18px;
          position: relative;
        }
        .cta-sub {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: rgba(232,224,208,0.6);
          margin: 0 0 36px;
          max-width: 540px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.8;
          position: relative;
        }
        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          position: relative;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 600px) {
          .stone-gem-wrap { width: 100px; height: 100px; }
          .stone-gem-img { width: 86px; height: 86px; }
          .stones-row { gap: 16px; }
          .banner-inner { padding: 40px 24px; }
        }
      `}</style>
    </div>
  );
}
