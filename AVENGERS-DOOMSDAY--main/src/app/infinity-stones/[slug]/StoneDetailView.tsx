// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Shield, Zap, Sparkles, Film, Compass, Info, CheckCircle2 } from 'lucide-react';
import type { InfinityStone } from '@/types';
import { infinityStones } from '@/data/infinity-stones';
import { getMovieBySlug } from '@/data/movies';

const Stone3DViewer = dynamic(() => import('@/components/Stone3DViewer'), { ssr: false });

const STONE_THEMES: Record<string, {
  color: string;
  glow: string;
  emissive: string;
  vessel: string;
  wavelength: string;
  frequency: string;
  multiverseStatus: string;
}> = {
  'space-stone': {
    color: '#38bdf8',
    glow: 'rgba(43, 188, 251, 0.4)',
    emissive: '#1d4ed8',
    vessel: 'The Tesseract (Cosmic Cube)',
    wavelength: '470 nm (Blue Singularity)',
    frequency: '6.38 × 10¹⁴ Hz',
    multiverseStatus: 'Dispersed // Variant Restored 2012',
  },
  'mind-stone': {
    color: '#ffe600',
    glow: 'rgba(250, 227, 17, 1)',
    emissive: '#fbbf24',
    vessel: "Loki's Scepter / Vision's Forehead",
    wavelength: '585 nm (Solar Singularity)',
    frequency: '5.13 × 10¹⁴ Hz',
    multiverseStatus: 'Crushed // Recreated in Westview Hex',
  },
  'reality-stone': {
    color: '#ed0028ff',
    glow: 'rgba(237, 22, 58, 1)',
    emissive: '#ef4444',
    vessel: 'The Aether (Fluidic Continuum)',
    wavelength: '660 nm (Crimson Singularity)',
    frequency: '4.55 × 10¹⁴ Hz',
    multiverseStatus: 'Extracted // Extinguished by Thanos',
  },
  'power-stone': {
    color: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.4)',
    emissive: '#a855f7',
    vessel: "The Orb / Ronan's Cosmi-Rod",
    wavelength: '415 nm (Amethyst Singularity)',
    frequency: '7.23 × 10¹⁴ Hz',
    multiverseStatus: 'Atomized // Recovered Morag 2014',
  },
  'time-stone': {
    color: '#00ff88',
    glow: 'rgba(0, 255, 136, 0.4)',
    emissive: '#10b981',
    vessel: 'The Eye of Agamotto (Mystic Relic)',
    wavelength: '530 nm (Emerald Singularity)',
    frequency: '5.66 × 10¹⁴ Hz',
    multiverseStatus: 'Surrendered on Titan // Returned to Ancient One',
  },
  'soul-stone': {
    color: '#fb923c',
    glow: 'rgba(227, 117, 27, 0.92)',
    emissive: '#ea580c',
    vessel: 'Vormir Shrine (Soulworld Portal)',
    wavelength: '605 nm (Amber Singularity)',
    frequency: '4.96 × 10¹⁴ Hz',
    multiverseStatus: 'Sacrificial Relic // Returned to Vormir',
  },
};

export default function StoneDetailView({ stone }: { stone: InfinityStone }) {
  const [mounted, setMounted] = useState(false);
  const theme = STONE_THEMES[stone.slug] || STONE_THEMES['space-stone'];

  useEffect(() => {
    setMounted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stone.slug]);

  // Find index for prev/next navigation
  const currentIndex = infinityStones.findIndex((s) => s.slug === stone.slug);
  const prevStone = infinityStones[(currentIndex - 1 + infinityStones.length) % infinityStones.length];
  const nextStone = infinityStones[(currentIndex + 1) % infinityStones.length];

  // Resolve movie appearances
  const appearanceMovies = stone.appearances
    .map((slug) => getMovieBySlug(slug))
    .filter(Boolean);

  return (
    <div className="stone-dossier-root">
      {/* Clean Dark Tactical Overlay */}
      <div className="dossier-grid-overlay" />

      <div className="dossier-container">
        {/* Top Navigation Bar */}
        <div className="dossier-top-nav">
          <Link href="/infinity-stones" className="dossier-back-link">
            <ArrowLeft size={16} />
            <span>RETURN TO VAULT</span>
          </Link>

          <div className="dossier-breadcrumb">
            <span>MA ARCHIVES</span>
            <span className="sep">/</span>
            <span>INFINITY STONES</span>
            <span className="sep">/</span>
            <span style={{ color: theme.color }}>{stone.name.toUpperCase()}</span>
          </div>

          <div className="dossier-badge-status">
            <span className="status-indicator-dot" />
            <span>ARCHIVE RECORD #{stone.id.toUpperCase()}</span>
          </div>
        </div>

        {/* Hero Title Section */}
        <header className="dossier-header">
          <div className="dossier-header-meta">
            <span className="dossier-classification-tag" style={{ borderColor: theme.color, color: theme.color }}>
              COSMIC SINGULARITY // FACET OF REALITY
            </span>
            <span className="dossier-vessel-meta">VESSEL: {theme.vessel}</span>
          </div>

          <h1 className="dossier-title">
            {stone.name.toUpperCase()}
          </h1>

          <div className="dossier-dual-rule">
            <div className="dual-rule-primary" style={{ background: theme.color }} />
            <div className="dual-rule-secondary" style={{ background: `linear-gradient(90deg, ${theme.color}, transparent)` }} />
          </div>

          <p className="dossier-intro-desc">
            {stone.description}
          </p>
        </header>

        {/* Main 2-Column Grid */}
        <div className="dossier-content-grid">
          {/* LEFT COLUMN: 3D VIEWER & SENSOR TELEMETRY */}
          <div className="dossier-left-col">
            <div className="stone-viewer-card" style={{ borderColor: `rgba(255, 255, 255, 0.1)` }}>
              {/* Corner brackets */}
              <div className="hud-corner hud-tl" style={{ borderColor: theme.color }} />
              <div className="hud-corner hud-tr" style={{ borderColor: theme.color }} />
              <div className="hud-corner hud-bl" style={{ borderColor: theme.color }} />
              <div className="hud-corner hud-br" style={{ borderColor: theme.color }} />

              <div className="viewer-viewport-header">
                <span className="viewport-status-text" style={{ color: theme.color }}>
                  ● QUANTUM SPECTRAL SCAN
                </span>
                <span className="viewport-rot-hint">DRAG TO ORBIT 360°</span>
              </div>

              {/* 3D Canvas */}
              <div className="stone-viewer-canvas-box">
                {mounted ? (
                  <Stone3DViewer
                    stoneSlug={stone.slug}
                    interactive={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <div className="stone-loading-placeholder">INITIALIZING 3D ENGINE...</div>
                )}
              </div>

              <div className="viewer-viewport-footer">
                <span className="telemetry-pill">
                  λ: {theme.wavelength}
                </span>
                <span className="telemetry-pill">
                  f: {theme.frequency}
                </span>
              </div>
            </div>

            {/* Telemetry Block */}
            <div className="dossier-telemetry-panel">
              <h3 className="telemetry-title">
                <Info size={14} style={{ color: theme.color }} />
                <span>SPECTRAL ANALYSIS & STATUS</span>
              </h3>

              <div className="telemetry-rows">
                <div className="telemetry-row">
                  <span className="tele-lbl">STATUS:</span>
                  <span className="tele-val text-red">DESTROYED (ATOMICALLY DISPERSED)</span>
                </div>
                <div className="telemetry-row">
                  <span className="tele-lbl">CONTAINMENT VESSEL:</span>
                  <span className="tele-val">{theme.vessel}</span>
                </div>
                <div className="telemetry-row">
                  <span className="tele-lbl">ORIGIN SINGULARITY:</span>
                  <span className="tele-val">Pre-Big Bang Concentrated Ingot</span>
                </div>
                <div className="telemetry-row">
                  <span className="tele-lbl">MULTIVERSE VARIANT:</span>
                  <span className="tele-val">{theme.multiverseStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: POWERS, CUSTODY, POSTERS, EVENTS */}
          <div className="dossier-right-col">
            {/* POWERS & ABILITIES */}
            <section className="dossier-section-card">
              <div className="section-card-header">
                <Zap size={18} style={{ color: theme.color }} />
                <h2>POWERS & COSMIC CAPABILITIES</h2>
              </div>
              <ul className="dossier-powers-list">
                {stone.powers.map((power, idx) => (
                  <li key={idx} className="power-item">
                    <span className="power-bullet" style={{ background: theme.color, boxShadow: `0 0 8px ${theme.color}` }} />
                    <span className="power-text">{power}</span>
                  </li>
                ))}
              </ul>

              <div className="abilities-pills-row">
                <span className="abilities-label">TACTICAL ABILITIES:</span>
                <div className="abilities-pills">
                  {stone.abilities.map((ability, idx) => (
                    <span key={idx} className="ability-pill" style={{ borderColor: `rgba(255,255,255,0.15)` }}>
                      {ability}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* CHAIN OF CUSTODY */}
            <section className="dossier-section-card">
              <div className="section-card-header">
                <Shield size={18} style={{ color: theme.color }} />
                <h2>CHAIN OF CUSTODY & KNOWN LOCATIONS</h2>
              </div>

              <div className="custody-grid">
                <div className="custody-col">
                  <h4 className="custody-subhead">HISTORICAL CUSTODIANS</h4>
                  <div className="custodians-list">
                    {stone.previousOwners.map((owner, idx) => (
                      <div key={idx} className="custodian-badge">
                        <span className="custodian-number" style={{ color: theme.color }}>{String(idx + 1).padStart(2, '0')}</span>
                        <span className="custodian-name">{owner}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="custody-col">
                  <h4 className="custody-subhead">KNOWN LOCATIONS</h4>
                  <div className="locations-list">
                    {stone.locations.map((loc, idx) => (
                      <div key={idx} className="location-item">
                        <Compass size={12} style={{ color: theme.color, flexShrink: 0 }} />
                        <span>{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* MAJOR MCU EVENTS */}
            <section className="dossier-section-card">
              <div className="section-card-header">
                <Sparkles size={18} style={{ color: theme.color }} />
                <h2>MAJOR MCU TIMELINE EVENTS</h2>
              </div>
              <div className="events-timeline">
                {stone.majorEvents.map((event, idx) => (
                  <div key={idx} className="event-row">
                    <div className="event-marker">
                      <span className="event-dot" style={{ background: theme.color }} />
                      {idx < stone.majorEvents.length - 1 && <span className="event-line" />}
                    </div>
                    <div className="event-content">
                      <p>{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* MCU APPEARANCES & POSTERS */}
            <section className="dossier-section-card">
              <div className="section-card-header">
                <Film size={18} style={{ color: theme.color }} />
                <h2>MCU APPEARANCES & FEATURE FILMS</h2>
              </div>

              <div className="appearances-posters-grid">
                {appearanceMovies.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movies/${movie.slug}`}
                    className="movie-poster-card"
                  >
                    <div
                      className="poster-artwork-box"
                      style={{
                        background: `linear-gradient(135deg, ${movie.posterColor || '#1e293b'} 0%, #0f172a 100%)`,
                        borderColor: `rgba(255,255,255,0.12)`,
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={movie.posterUrl || `/images/movies/${movie.slug}.jpg`}
                        alt={movie.title}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: 0.85,
                          zIndex: 1,
                        }}
                      />
                      <div
                        style={{
                          position: 'relative',
                          zIndex: 2,
                          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(6,9,14,0.92) 100%)',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          padding: '0.85rem',
                        }}
                      >
                        <div className="poster-year-badge">Phase {movie.phase} • {movie.year}</div>
                        <div className="poster-inner-title">{movie.title}</div>
                        <div className="poster-arrow-link" style={{ color: theme.color }}>
                          VIEW FILM ARCHIVE →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* BOTTOM STONE SWITCHER PAGER */}
        <div className="dossier-bottom-pager">
          <Link href={`/infinity-stones/${prevStone.slug}`} className="pager-nav-btn prev-btn">
            <ChevronLeft size={20} />
            <div className="pager-btn-text">
              <span className="pager-btn-sub">PREVIOUS STONE</span>
              <span className="pager-btn-title">{prevStone.name}</span>
            </div>
          </Link>

          <Link href="/infinity-stones" className="pager-center-btn">
            <span>VIEW ALL 6 STONES</span>
          </Link>

          <Link href={`/infinity-stones/${nextStone.slug}`} className="pager-nav-btn next-btn">
            <div className="pager-btn-text text-right">
              <span className="pager-btn-sub">NEXT STONE</span>
              <span className="pager-btn-title">{nextStone.name}</span>
            </div>
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .stone-dossier-root {
          min-height: 100vh;
          background: #06080d;
          color: #e2e8f0;
          font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          padding-bottom: 80px;
          overflow-x: hidden;
        }

        .dossier-ambient-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
          transition: background 0.8s ease;
        }

        .dossier-grid-overlay {
          position: fixed;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 1;
        }

        .dossier-container {
          position: relative;
          z-index: 2;
          max-width: 1320px;
          margin: 0 auto;
          padding: 24px 8px 32px;
        }

        /* Top Nav */
        .dossier-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .dossier-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          letter-spacing: 0.15em;
          font-weight: 700;
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s, transform 0.2s;
        }
        .dossier-back-link:hover {
          color: #fff;
          transform: translateX(-4px);
        }

        .dossier-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: #64748b;
          font-weight: 600;
        }
        .dossier-breadcrumb .sep {
          color: #334155;
        }

        .dossier-badge-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.04);
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .status-indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 6px #ef4444;
        }

        /* Header */
        .dossier-header {
          margin-bottom: 40px;
        }

        .dossier-header-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .dossier-classification-tag {
          font-size: 10px;
          letter-spacing: 0.2em;
          font-weight: 700;
          border: 1px solid;
          padding: 2px 8px;
          border-radius: 2px;
        }

        .dossier-vessel-meta {
          font-size: 12px;
          letter-spacing: 0.1em;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .dossier-title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 900;
          letter-spacing: 0.06em;
          line-height: 1;
          margin: 12px 0 16px;
          color: #fff;
          font-family: 'Orbitron', 'Rajdhani', sans-serif;
          overflow-wrap: anywhere;
        }

        .dossier-dual-rule {
          display: flex;
          flex-direction: column;
          gap: 3px;
          margin-bottom: 20px;
        }
        .dual-rule-primary {
          height: 3px;
          width: 140px;
        }
        .dual-rule-secondary {
          height: 1px;
          width: 320px;
        }

        .dossier-intro-desc {
          font-size: 1.15rem;
          line-height: 1.6;
          color: #cbd5e1;
          max-width: 880px;
        }

        /* 2-Column Content Grid */
        .dossier-content-grid {
          display: grid;
          grid-template-columns: 460px 1fr;
          gap: 36px;
          align-items: start;
        }

        /* LEFT COLUMN */
        .dossier-left-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: sticky;
          top: 32px;
        }

        .stone-viewer-card {
          position: relative;
          background: rgba(10, 14, 22, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
        }

        .hud-corner {
          position: absolute;
          width: 16px;
          height: 16px;
          border-style: solid;
          pointer-events: none;
          z-index: 5;
        }
        .hud-tl { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
        .hud-tr { top: 10px; right: 10px; border-width: 2px 2px 0 0; }
        .hud-bl { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; }
        .hud-br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

        .viewer-viewport-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 18px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 10px;
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        .viewport-rot-hint {
          color: #64748b;
        }

        .stone-viewer-canvas-box {
          height: 380px;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stone-loading-placeholder {
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #64748b;
        }

        .viewer-viewport-footer {
          display: flex;
          justify-content: space-between;
          padding: 10px 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(0, 0, 0, 0.3);
        }

        .telemetry-pill {
          font-size: 10px;
          letter-spacing: 0.12em;
          color: #94a3b8;
          font-family: monospace;
        }

        .dossier-telemetry-panel {
          background: rgba(10, 14, 22, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 20px;
        }

        .telemetry-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          letter-spacing: 0.18em;
          font-weight: 700;
          color: #cbd5e1;
          margin-bottom: 16px;
        }

        .telemetry-rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .telemetry-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-size: 12px;
          gap: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding-bottom: 8px;
          flex-wrap: wrap;
        }
        .telemetry-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .tele-lbl {
          color: #64748b;
          font-weight: 600;
          letter-spacing: 0.08em;
          font-size: 11px;
        }

        .tele-val {
          color: #e2e8f0;
          font-weight: 600;
          text-align: right;
          font-size: 12px;
          overflow-wrap: anywhere;
        }
        .tele-val.text-red {
          color: #ef4444;
        }

        /* RIGHT COLUMN */
        .dossier-right-col {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .dossier-section-card {
          background: rgba(10, 14, 22, 0.55);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 24px;
        }

        .section-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 12px;
        }

        .section-card-header h2 {
          font-size: 14px;
          letter-spacing: 0.15em;
          font-weight: 800;
          margin: 0;
          color: #f1f5f9;
        }

        .dossier-powers-list {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .power-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .power-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .power-text {
          font-size: 14px;
          line-height: 1.5;
          color: #cbd5e1;
        }

        .abilities-pills-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 16px;
        }

        .abilities-label {
          font-size: 10px;
          letter-spacing: 0.18em;
          color: #64748b;
          font-weight: 700;
        }

        .abilities-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ability-pill {
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #cbd5e1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid;
          padding: 4px 12px;
          border-radius: 4px;
        }

        /* Custody */
        .custody-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .custody-subhead {
          font-size: 11px;
          letter-spacing: 0.15em;
          color: #94a3b8;
          margin: 0 0 12px 0;
          font-weight: 700;
        }

        .custodians-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .custodian-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
        }

        .custodian-number {
          font-size: 10px;
          font-weight: 800;
          font-family: monospace;
        }

        .locations-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .location-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #cbd5e1;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 6px 12px;
          border-radius: 4px;
        }

        /* Timeline Events */
        .events-timeline {
          display: flex;
          flex-direction: column;
        }

        .event-row {
          display: flex;
          gap: 16px;
        }

        .event-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 14px;
        }

        .event-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .event-line {
          width: 2px;
          flex: 1;
          background: rgba(255, 255, 255, 0.1);
          margin: 4px 0;
          min-height: 24px;
        }

        .event-content {
          padding-bottom: 16px;
        }
        .event-content p {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: #cbd5e1;
        }

        /* Posters Grid */
        .appearances-posters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 14px;
        }

        .movie-poster-card {
          text-decoration: none;
          color: inherit;
        }

        .poster-artwork-box {
          border: 1px solid;
          border-radius: 6px;
          padding: 16px;
          height: 140px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.25s, box-shadow 0.25s;
          cursor: pointer;
        }
        .poster-artwork-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.5);
          border-color: rgba(255, 255, 255, 0.3) !important;
        }

        .poster-year-badge {
          font-size: 10px;
          letter-spacing: 0.1em;
          color: #94a3b8;
          font-weight: 600;
        }

        .poster-inner-title {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
        }

        .poster-arrow-link {
          font-size: 9px;
          letter-spacing: 0.12em;
          font-weight: 700;
        }

        /* Bottom Pager */
        .dossier-bottom-pager {
          margin-top: 60px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .pager-nav-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 12px 20px;
          border-radius: 6px;
          text-decoration: none;
          color: #fff;
          transition: all 0.25s;
        }
        .pager-nav-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .pager-btn-text {
          display: flex;
          flex-direction: column;
        }
        .pager-btn-text.text-right {
          text-align: right;
        }

        .pager-btn-sub {
          font-size: 9px;
          letter-spacing: 0.15em;
          color: #64748b;
          font-weight: 700;
        }

        .pager-btn-title {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        .pager-center-btn {
          font-size: 11px;
          letter-spacing: 0.18em;
          font-weight: 700;
          color: #94a3b8;
          text-decoration: none;
          padding: 8px 18px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          transition: all 0.2s;
        }
        .pager-center-btn:hover {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.04);
        }

        @media (max-width: 960px) {
          .dossier-content-grid {
            grid-template-columns: 1fr;
          }
          .dossier-left-col {
            position: static;
          }
          .custody-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

