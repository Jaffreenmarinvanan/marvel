// @ts-nocheck
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ───────────────────────────────────────────── DATA ── */
const NAV_SECTIONS = [
  { id: 'heroes',           label: 'HEROES ENCYCLOPEDIA',    href: '/heroes',           color: '#3b82f6', icon: '⚡' },
  { id: 'villains',         label: 'ANTAGONISTS & VILLAINS', href: '/villains',          color: '#e31b23', icon: '☠' },
  { id: 'infinity-stones',  label: 'INFINITY STONES',        href: '/infinity-stones',  color: '#c9a84c', icon: '◈' },
  { id: 'weapons',          label: 'WEAPONS & ARTIFACTS',    href: '/weapons',           color: '#a855f7', icon: '⚔' },
  { id: 'superpowers',      label: 'SUPERPOWERS & ABILITIES',href: '/powers',            color: '#22c55e', icon: '✦' },
  { id: 'teams',            label: 'TEAMS & ORGANIZATIONS',  href: '/teams',             color: '#f97316', icon: '◉' },
  { id: 'technology',       label: 'TECHNOLOGY & GADGETS',   href: '/technology',        color: '#06b6d4', icon: '◈' },
];

const STONES = [
  { id: 'space-stone',    name: 'SPACE',    img: '/images/stones/space.png',    color: '#3b82f6', glow: '#1d4ed8' },
  { id: 'mind-stone',     name: 'MIND',     img: '/images/stones/mind.png',     color: '#eab308', glow: '#78350f' },
  { id: 'reality-stone',  name: 'REALITY',  img: '/images/stones/reality.png',  color: '#e31b23', glow: '#7a0a0e' },
  { id: 'power-stone',    name: 'POWER',    img: '/images/stones/power.png',    color: '#a855f7', glow: '#581c87' },
  { id: 'time-stone',     name: 'TIME',     img: '/images/stones/time.png',     color: '#22c55e', glow: '#14532d' },
  { id: 'soul-stone',     name: 'SOUL',     img: '/images/stones/soul.png',     color: '#f97316', glow: '#7c2d12' },
];

const STATS = [
  { label: 'HEROES',       value: 60,  suffix: '+' },
  { label: 'VILLAINS',     value: 40,  suffix: '+' },
  { label: 'FILMS',        value: 33,  suffix: '' },
  { label: 'ARTIFACTS',    value: 150, suffix: '+' },
];

/* ───────────────────────────────────────── PARTICLES ── */
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let shouldAnimate = false;
    const stars: { x: number; y: number; r: number; speed: number; opacity: number; pulse: number }[] = [];
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        if (shouldAnimate) s.pulse += 0.02;
        const alpha = s.opacity * (0.6 + 0.4 * Math.sin(s.pulse));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${alpha})`;
        ctx.fill();
        if (shouldAnimate) {
          s.y -= s.speed;
          if (s.y < 0) {
            s.y = height;
            s.x = Math.random() * width;
          }
        }
      }
      if (shouldAnimate) raf = requestAnimationFrame(draw);
    }

    const resize = () => {
      cancelAnimationFrame(raf);
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      // Keep the mobile backdrop static and lighter; animate only on desktop.
      shouldAnimate = width > 768 && !motionPreference.matches;
      stars.length = 0;
      const starCount = width <= 768 ? 70 : 180;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.5 + 0.3,
          speed: Math.random() * 0.3 + 0.05,
          opacity: Math.random() * 0.7 + 0.3,
          pulse: Math.random() * Math.PI * 2,
        });
      }
      draw();
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    motionPreference.addEventListener('change', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      motionPreference.removeEventListener('change', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.5,
      }}
    />
  );
}

/* ──────────────────────────────────────── STAT COUNTER ── */
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setCount(value);
          return;
        }

        const startedAt = performance.now();
        const duration = 680;
        const update = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          setCount(Math.floor(value * progress));
          if (progress < 1) frame = requestAnimationFrame(update);
        };
        frame = requestAnimationFrame(update);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div ref={ref} className="stat-box-3d">
      <span className="stat-num">{count}{suffix}</span>
      <span className="stat-lbl">{label}</span>
    </div>
  );
}

/* ──────────────────────────────────── 3D SECTION CARD ── */
function SectionCard({ label, href, color, icon, index }: typeof NAV_SECTIONS[0] & { index: number }) {

  return (
    <Link
      href={href}
      className="section-card-3d"
      style={
        {
          '--card-color': color,
          '--delay': `${index * 0.08}s`,
        } as React.CSSProperties
      }
    >
      <div className="card-top-line" style={{ background: color }} />
      <div className="card-3d-content">
        <div className="card-icon-3d">{icon}</div>
        <div className="card-label-3d">{label}</div>
        <div className="card-arrow-3d">→</div>
      </div>

      <div className="card-specular-glow" aria-hidden="true" />
    </Link>
  );
}

/* ────────────────────────────────────────────── PAGE ── */
export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const radialRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const canParallax = window.matchMedia(
      '(min-width: 769px) and (hover: hover) and (prefers-reduced-motion: no-preference)'
    );
    if (!canParallax.matches) return;

    let frame = 0;
    const onMouse = (event: MouseEvent) => {
      if (!canParallax.matches) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 28;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (radialRef.current) {
          radialRef.current.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
        }
        if (titleBlockRef.current) {
          titleBlockRef.current.style.transform =
            `perspective(1000px) rotateX(${y * -0.15}deg) rotateY(${x * 0.15}deg) translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
        }
      });
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToModules = () => {
    const el = document.getElementById('modules-section');
    if (el) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="home-root">
      {/* 3D Stars background */}
      {mounted && <StarField />}

      {/* ══════════ HERO SECTION WITH 3D WEBGL CORE ══════════ */}
      <section className="hero-section">
        {/* Radial background ambience */}
        <div ref={radialRef} className="hero-radial-bg" />

        {/* Top HUD Line */}
        <div className="hud-top-bar">
          <span className="hud-tag">◈ MARVEL CINEMATIC UNIVERSE</span>
          <span className="hud-status">
            STATUS: <span style={{ color: '#22c55e' }}>ONLINE // ARCHIVES ACTIVE</span>
          </span>
          <span className="hud-tag">AVENGERS PROTOCOL ACTIVE ◈</span>
        </div>

        {/* Hero Title Block in 3D perspective */}
        <div ref={titleBlockRef} className="hero-title-block">
          <div className="hero-eyebrow">THE ULTIMATE MCU DATABASE</div>
          <h1 className="hero-title">
            <span className="hero-title-marvel">MARVEL</span>
            <br />
            <span className="hero-title-archives">ARCHIVES</span>
          </h1>
          <p className="hero-tagline">
            Every Story. Every Hero. Every Detail.<br />
            <span style={{ color: 'rgba(201,168,76,0.7)', fontSize: '0.85em', letterSpacing: '0.15em' }}>
              — Classified Access Granted —
            </span>
          </p>

          <div className="hero-buttons">
            <Link href="/heroes" className="btn-primary-3d">
              <span>ENTER ARCHIVES</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link href="/infinity-stones" className="btn-secondary-3d">
              <span>◈ INFINITY STONES</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('replay-marvel-intro'));
                }
              }}
              className="btn-replay-3d"
            >
              <span>▶ REPLAY INTRO</span>
            </button>
          </div>
        </div>

        {/* Smooth Scroll Cue */}
        <button
          type="button"
          onClick={scrollToModules}
          className="scroll-indicator-btn"
          title="Scroll down to database modules"
        >
          <div className="scroll-line-3d" />
          <span>SCROLL TO EXPLORE</span>
        </button>
      </section>

      {/* ══════════ STATS BAR ══════════ */}
      <section className="stats-section">
        <div className="stats-divider-line" />
        <div className="stats-row">
          {STATS.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
        <div className="stats-divider-line" />
      </section>

      {/* ══════════ DATABASE MODULES GRID ══════════ */}
      <section id="modules-section" className="sections-grid-wrapper">
        <div className="section-header">
          <div className="section-line" />
          <h2 className="section-heading">DATABASE MODULES</h2>
          <div className="section-line" />
        </div>
        <div className="sections-grid-3d">
          {NAV_SECTIONS.map((s, i) => (
            <SectionCard key={s.id} {...s} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════ INFINITY STONES SHOWCASE ══════════ */}
      <section className="stones-showcase">
        <div className="section-header">
          <div className="section-line" />
          <h2 className="section-heading">THE INFINITY STONES</h2>
          <div className="section-line" />
        </div>
        <p className="stones-subtext">
          Six singularities — each containing the primordial essence of the cosmos
        </p>
        <div className="stones-cards-row">
          {STONES.map((stone, i) => (
            <Link
              key={stone.id}
              href={`/infinity-stones/${stone.id}`}
              className="stone-card-3d"
              style={
                {
                  '--stone-color': stone.color,
                  '--delay': `${i * 0.1}s`,
                } as React.CSSProperties
              }
            >
              <div className="stone-card-gem-3d">
                <img
                  src={stone.img}
                  alt={`${stone.name} Stone`}
                  className="stone-img-realistic"
                  style={{
                    filter: `drop-shadow(0 0 16px ${stone.color}) drop-shadow(0 0 28px ${stone.glow})`,
                  }}
                />
              </div>
              <div className="stone-card-name-3d">{stone.name}</div>
              <div className="stone-card-label-3d">STONE</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ FOOTER CALL TO ACTION ══════════ */}
      <section className="cta-section">
        <div className="cta-bg-line" />
        <h2 className="cta-title">BEGIN YOUR MISSION</h2>
        <p className="cta-sub">
          Access classified intelligence on every operative, threat, and artifact in the MCU
        </p>
        <div className="cta-buttons">
          <Link href="/heroes" className="btn-primary-3d">HEROES DATABASE</Link>
          <Link href="/villains" className="btn-outline-3d">VILLAIN REGISTRY</Link>
          <Link href="/infinity-stones" className="btn-outline-3d">STONE ARCHIVE</Link>
        </div>
        <div className="cta-shield">
          <div className="shield-rings">
            <div className="shield-ring r1" />
            <div className="shield-ring r2" />
            <div className="shield-ring r3" />
          </div>
          <span className="shield-text">S.H.I.E.L.D.</span>
        </div>
      </section>

      <style jsx>{`
        /* ───── ROOT ───── */
        .home-root {
          min-height: 100vh;
          background: #000;
          color: #e8e0d0;
          overflow-x: clip;
          position: relative;
        }

        /* ───── HERO SECTION ───── */
        .hero-section {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-radial-bg {
          position: absolute;
          inset: -40%;
          background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(227, 27, 35, 0.15) 0%, transparent 65%),
                      radial-gradient(ellipse 40% 30% at 20% 60%, rgba(201, 168, 76, 0.09) 0%, transparent 60%),
                      radial-gradient(ellipse 50% 40% at 80% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
          transition: transform 0.2s ease-out;
        }

        /* Top HUD Bar */
        .hud-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          background: rgba(0, 0, 0, 0.75);
          border-bottom: 1px solid rgba(201, 168, 76, 0.3);
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          color: rgba(201, 168, 76, 0.75);
          z-index: 10;
          backdrop-filter: blur(8px);
        }

        .hud-status {
          font-weight: 700;
          color: rgba(201, 168, 76, 0.9);
        }

        /* Hero Title Block in 3D */
        .hero-title-block {
          position: relative;
          z-index: 5;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-top: 36px;
          max-width: 100%;
          transform-style: preserve-3d;
          transition: transform 0.18s ease-out;
        }

        .hero-eyebrow {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.4em;
          color: rgba(201, 168, 76, 0.85);
          text-transform: uppercase;
        }

        .hero-title {
          font-family: 'Impact', 'Arial Black', sans-serif;
          line-height: 0.9;
          margin: 0;
          transform: translateZ(30px);
        }

        .hero-title-marvel {
          font-size: clamp(80px, 15vw, 160px);
          color: #e31b23;
          text-shadow: 0 0 50px rgba(227, 27, 35, 0.85),
                       0 0 100px rgba(227, 27, 35, 0.45),
                       6px 6px 0 #7a0a0e,
                       -2px -2px 0 #ff4a52;
          display: block;
        }

        .hero-title-archives {
          font-size: clamp(28px, 5vw, 60px);
          color: #c9a84c;
          letter-spacing: clamp(0.12em, 3.5vw, 0.5em);
          text-shadow: 0 0 30px rgba(201, 168, 76, 0.75),
                       0 0 60px rgba(201, 168, 76, 0.35);
          display: block;
          margin-top: 8px;
        }

        .hero-tagline {
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: rgba(232, 224, 208, 0.75);
          letter-spacing: 0.08em;
          text-align: center;
          line-height: 1.8;
          margin: 0;
          transform: translateZ(20px);
        }

        /* 3D Action Buttons */
        .hero-buttons {
          display: flex;
          gap: 16px;
          margin-top: 8px;
          flex-wrap: wrap;
          justify-content: center;
          transform: translateZ(25px);
        }

        .btn-primary-3d {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 34px;
          background: linear-gradient(135deg, #c41e3a, #e31b23);
          color: #fff;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: transform 0.24s var(--ease-out), box-shadow 0.24s ease, background 0.24s ease;
          box-shadow: 0 6px 20px rgba(227, 27, 35, 0.5), inset 0 0 12px rgba(255, 255, 255, 0.25);
        }
        .btn-primary-3d:hover {
          background: linear-gradient(135deg, #e31b23, #ff4444);
          box-shadow: 0 10px 35px rgba(227, 27, 35, 0.8), inset 0 0 18px rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        .btn-arrow {
          transition: transform 0.2s ease;
        }
        .btn-primary-3d:hover .btn-arrow {
          transform: translateX(4px);
        }

        .btn-secondary-3d {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 30px;
          background: rgba(201, 168, 76, 0.08);
          color: #c9a84c;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(201, 168, 76, 0.6);
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: transform 0.24s var(--ease-out), box-shadow 0.24s ease, background 0.24s ease, color 0.24s ease;
        }
        .btn-secondary-3d:hover {
          background: rgba(201, 168, 76, 0.2);
          border-color: #c9a84c;
          box-shadow: 0 0 25px rgba(201, 168, 76, 0.45);
          color: #fff;
          transform: translateY(-2px);
        }

        .btn-replay-3d {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: rgba(196, 30, 58, 0.12);
          color: #ff4a52;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(196, 30, 58, 0.5);
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          transition: transform 0.24s var(--ease-out), box-shadow 0.24s ease, background 0.24s ease, color 0.24s ease;
          cursor: pointer;
        }
        .btn-replay-3d:hover {
          background: rgba(196, 30, 58, 0.3);
          border-color: #ff4a52;
          box-shadow: 0 0 25px rgba(227, 27, 35, 0.5);
          color: #fff;
          transform: translateY(-2px);
        }

        .btn-outline-3d {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          background: transparent;
          color: rgba(232, 224, 208, 0.7);
          font-family: 'Courier New', monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(232, 224, 208, 0.25);
          transition: transform 0.24s var(--ease-out), box-shadow 0.24s ease, background 0.24s ease, color 0.24s ease;
        }
        .btn-outline-3d:hover {
          border-color: rgba(232, 224, 208, 0.7);
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        /* Smooth Scroll Cue Button */
        .scroll-indicator-btn {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: 'Courier New', monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(201, 168, 76, 0.65);
          z-index: 5;
          transition: opacity 0.3s, color 0.2s;
        }
        .scroll-indicator-btn:hover {
          color: #c9a84c;
        }

        .scroll-line-3d {
          width: 2px;
          height: 38px;
          background: linear-gradient(to bottom, #c9a84c, transparent);
          animation: scroll-line-anim 1.6s ease-in-out infinite;
        }
        @keyframes scroll-line-anim {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50% { transform: scaleY(0.6); opacity: 1; }
        }

        /* ───── STATS SECTION ───── */
        .stats-section {
          position: relative;
          z-index: 2;
          padding: 32px 24px;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
        }
        .stats-divider-line {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201, 168, 76, 0.45), rgba(227, 27, 35, 0.45), transparent);
          margin: 8px 0;
        }
        .stats-row {
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
          padding: 20px 0;
        }

        .stat-box-3d {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          transition: transform 0.24s ease;
        }
        .stat-box-3d:hover {
          transform: translateY(-3px);
        }

        .stat-num {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: clamp(40px, 6vw, 72px);
          color: #e31b23;
          text-shadow: 0 0 35px rgba(227, 27, 35, 0.6);
          line-height: 1;
        }
        .stat-lbl {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          color: rgba(201, 168, 76, 0.75);
          text-transform: uppercase;
        }

        /* ───── 3D SECTION CARDS GRID ───── */
        .sections-grid-wrapper {
          position: relative;
          z-index: 2;
          padding: 70px 24px;
          width: 100%;
          max-width: 1248px;
          margin: 0 auto;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }
        .section-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201, 168, 76, 0.45));
        }
        .section-line:last-child {
          background: linear-gradient(to left, transparent, rgba(201, 168, 76, 0.45));
        }
        .section-heading {
          font-family: 'Courier New', monospace;
          font-size: 13px;
          letter-spacing: 0.4em;
          color: rgba(201, 168, 76, 0.85);
          text-transform: uppercase;
          white-space: nowrap;
          margin: 0;
        }

        .sections-grid-3d {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 18px;
          perspective: 1000px;
        }

        .section-card-3d {
          position: relative;
          display: flex;
          align-items: center;
          padding: 22px 24px;
          background: rgba(10, 12, 20, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-decoration: none;
          color: #e8e0d0;
          overflow: hidden;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.24s var(--ease-out), border-color 0.24s ease, box-shadow 0.24s ease;
          animation: card-in 0.5s ease-out backwards;
          animation-delay: var(--delay);
          backdrop-filter: blur(8px);
        }

        @keyframes card-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .section-card-3d:hover {
          transform: translateY(-4px);
          border-color: var(--card-color, rgba(255, 255, 255, 0.3));
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.65), 0 0 18px var(--card-color);
        }

        .section-card-3d:focus-visible {
          border-color: var(--card-color, rgba(255, 255, 255, 0.3));
        }

        .card-top-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
        }

        .card-3d-content {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          transform: translateZ(20px);
          transform-style: preserve-3d;
        }

        .card-icon-3d {
          font-size: 24px;
          color: var(--card-color, #fff);
          flex-shrink: 0;
          filter: drop-shadow(0 0 8px var(--card-color, #fff));
          transform: translateZ(10px);
        }

        .card-label-3d {
          flex: 1;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232, 224, 208, 0.95);
        }

        .card-arrow-3d {
          font-size: 18px;
          color: var(--card-color, rgba(255, 255, 255, 0.4));
          transition: transform 0.2s ease;
        }
        .section-card-3d:hover .card-arrow-3d {
          transform: translateX(5px) translateZ(10px);
        }

        .card-specular-glow {
          position: absolute;
          inset: 0;
          opacity: 0;
          background: linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.08), transparent 80%);
          pointer-events: none;
          transition: opacity 0.22s ease;
        }

        .section-card-3d:hover .card-specular-glow,
        .section-card-3d:focus-visible .card-specular-glow {
          opacity: 1;
        }

        /* ───── INFINITY STONES SHOWCASE IN 3D ───── */
        .stones-showcase {
          position: relative;
          z-index: 2;
          padding: 70px 24px;
          background: rgba(0, 0, 0, 0.55);
          text-align: center;
          backdrop-filter: blur(8px);
        }

        .stones-subtext {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          color: rgba(201, 168, 76, 0.7);
          margin: 0 0 40px;
        }

        .stones-cards-row {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          perspective: 900px;
        }

        .stone-card-3d {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 26px 20px;
          background: rgba(10, 12, 20, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.24s var(--ease-out), border-color 0.24s ease, box-shadow 0.24s ease;
          animation: card-in 0.5s ease-out backwards;
          animation-delay: var(--delay);
          flex: 1 1 125px;
          min-width: 0;
          max-width: 180px;
          transform-style: preserve-3d;
        }
        .stone-card-3d:hover {
          border-color: var(--stone-color);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 30px var(--stone-color);
          transform: translateY(-4px);
        }

        .stone-card-gem-3d {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.24s var(--ease-out);
          transform: translateZ(15px);
        }
        .stone-card-3d:hover .stone-card-gem-3d {
          transform: translateY(-2px);
        }

        .stone-img-realistic {
          width: 72px;
          height: 72px;
          object-fit: contain;
          transition: transform 0.24s var(--ease-out);
        }

        .stone-card-3d:hover .stone-img-realistic {
          transform: translateY(-3px);
        }

        .stone-card-name-3d {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--stone-color);
          text-transform: uppercase;
          transform: translateZ(10px);
        }

        .stone-card-label-3d {
          font-family: 'Courier New', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          color: rgba(232, 224, 208, 0.5);
        }

        /* ───── CTA SECTION ───── */
        .cta-section {
          position: relative;
          z-index: 2;
          padding: 80px 24px 100px;
          text-align: center;
          background: linear-gradient(to bottom, transparent, rgba(227, 27, 35, 0.06), transparent);
          overflow: hidden;
        }

        .cta-bg-line {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          border-radius: 50%;
          border: 1px solid rgba(201, 168, 76, 0.1);
          pointer-events: none;
        }

        .cta-title {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: clamp(40px, 7vw, 80px);
          color: #fff;
          text-shadow: 0 0 45px rgba(227, 27, 35, 0.6);
          margin: 0 0 16px;
        }

        .cta-sub {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: rgba(232, 224, 208, 0.6);
          margin: 0 0 36px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        .cta-shield {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
        }

        .shield-rings {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .shield-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(201, 168, 76, 0.35);
          animation: shield-pulse 2s ease-in-out infinite;
        }
        .r1 { width: 50px; height: 50px; animation-delay: 0s; }
        .r2 { width: 75px; height: 75px; animation-delay: 0.3s; }
        .r3 { width: 100px; height: 100px; animation-delay: 0.6s; }

        @keyframes shield-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.05); }
        }

        .shield-text {
          font-family: 'Courier New', monospace;
          font-size: 8px;
          letter-spacing: 0.3em;
          color: rgba(201, 168, 76, 0.6);
          position: relative;
          z-index: 1;
        }

        /* ───── RESPONSIVE ───── */
        @media (max-width: 900px) {
          .hero-section { justify-content: center; }
          .hero-title-block { margin: 50px 0 0; }
        }
        @media (max-width: 768px) {
          /* No pointer parallax or looping decorative motion on touch screens. */
          .hero-radial-bg,
          .hero-title-block {
            transform: none !important;
            transition: none;
          }
          .hero-buttons { transform: none; }
          .scroll-line-3d { animation: none; }
          .section-card-3d,
          .stone-card-3d { animation: none; opacity: 1; }
          .stone-img-realistic,
          .shield-ring { animation: none; }
        }
        @media (max-width: 600px) {
          .stats-row { gap: 24px 32px; }
          .sections-grid-3d { grid-template-columns: 1fr; }
          .section-header { gap: 8px; margin-bottom: 28px; }
          .section-heading {
            max-width: 100%;
            white-space: normal;
            text-align: center;
            font-size: 10px;
            letter-spacing: 0.12em;
          }
        }
      `}</style>
    </div>
  );
}
