// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { infinityStones } from '@/data/infinity-stones';
import { Sparkles, ArrowRight, LayoutGrid, Eye, Radio, ShieldAlert } from 'lucide-react';

const Stone3DViewer = dynamic(() => import('@/components/Stone3DViewer'), { ssr: false });

const STONE_TACTICAL: Record<string, {
  color: string;
  glow: string;
  vessel: string;
  appearancesStr: string;
  telemetryNote: string;
  subCode: string;
  phaseLabel: string;
}> = {
  'space-stone': {
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.4)',
    vessel: 'THE TESSERACT [COSMIC CUBE]',
    appearancesStr: "CAPTAIN AMERICA: TFA, THE AVENGERS, THOR: TDW, INFINITY WAR, ENDGAME",
    telemetryNote: 'SPATIAL DISTORTION NORMAL // QUANTUM TUNNELING READY',
    subCode: 'AVENGERS COMPOUND VAULT // SPEC VARIANT I // S01 // V1.02',
    phaseLabel: 'PHASE 1–6',
  },
  'mind-stone': {
    color: '#ffe600',
    glow: 'rgba(255, 230, 0, 0.4)',
    vessel: "LOKI'S SCEPTER // VISION'S FOREHEAD",
    appearancesStr: "MARVEL'S THE AVENGERS, AGE OF ULTRON, CIVIL WAR, INFINITY WAR, ENDGAME",
    telemetryNote: 'NEURAL CONSCIOUSNESS MATRIX SYNCHRONIZED // BIO-SYNTHETIC',
    subCode: 'AVENGERS COMPOUND VAULT // SPEC VARIANT II // S02 // V2.14',
    phaseLabel: 'PHASE 1–4',
  },
  'reality-stone': {
    color: '#ff1e42',
    glow: 'rgba(255, 30, 66, 0.4)',
    vessel: 'THE AETHER [DARK CONVERGENCE FLUID]',
    appearancesStr: "THOR: THE DARK WORLD, GUARDIANS OF THE GALAXY, INFINITY WAR, ENDGAME",
    telemetryNote: 'PHYSICAL CONSTANT FLUX DETECTED // FLUIDIC TRANSDUCTION',
    subCode: 'AVENGERS COMPOUND VAULT // SPEC VARIANT III // S03 // V3.09',
    phaseLabel: 'PHASE 2–3',
  },
  'power-stone': {
    color: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.4)',
    vessel: "THE ORB // RONAN'S UNIVERSAL WEAPON",
    appearancesStr: "GUARDIANS OF THE GALAXY, AVENGERS: INFINITY WAR, AVENGERS: ENDGAME",
    telemetryNote: 'SURFACE KINETIC DISRUPTION PEAKING // CELESTIAL ENERGY DETECTED',
    subCode: 'AVENGERS COMPOUND VAULT // SPEC VARIANT IV // S04 // V4.22',
    phaseLabel: 'PHASE 2–3',
  },
  'time-stone': {
    color: '#00ff88',
    glow: 'rgba(0, 255, 136, 0.4)',
    vessel: 'THE EYE OF AGAMOTTO [MYSTIC RELIC]',
    appearancesStr: "DOCTOR STRANGE, AVENGERS: INFINITY WAR, AVENGERS: ENDGAME",
    telemetryNote: 'CHRONOMETRIC EMISSION STABLE // MULTIVERSE SAFE',
    subCode: 'AVENGERS COMPOUND VAULT // SPEC VARIANT V // S05 // V5.18',
    phaseLabel: 'PHASE 3',
  },
  'soul-stone': {
    color: '#fb923c',
    glow: 'rgba(251, 146, 60, 0.4)',
    vessel: 'VORMIR SACRIFICIAL ALTAR [RED SKULL CUSTODY]',
    appearancesStr: "AVENGERS: INFINITY WAR, AVENGERS: ENDGAME",
    telemetryNote: 'SOULWORLD TRANSIT ACTIVE // EQUIVALENT EXCHANGE REQUIRED',
    subCode: 'AVENGERS COMPOUND VAULT // SPEC VARIANT VI // S06 // V6.01',
    phaseLabel: 'PHASE 3',
  },
};

export default function InfinityStonesPage() {
  const router = useRouter();
  const [selectedStone, setSelectedStone] = useState(infinityStones[4]); // default to Time Stone as shown in laptop screenshot
  const [viewMode, setViewMode] = useState<'hud' | 'panoramic'>('hud');
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectStone = (stone: typeof infinityStones[0]) => {
    if (stone.slug === selectedStone.slug) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedStone(stone);
      setIsTransitioning(false);
    }, 120);
  };

  const tac = STONE_TACTICAL[selectedStone.slug] || STONE_TACTICAL['time-stone'];

  return (
    <div className="vault-screen">
      {/* Background Ambience */}
      <div className="vault-bg-glow" />
      <div className="vault-scanlines" />

      {/* TOP HEADER HUD */}
      <header className="vault-header">
        <div className="vault-header-left">
          <div className="vault-breadcrumbs">
            <span className="dot" style={{ background: tac.color }} />
            <span className="brand">MARVEL STUDIOS</span>
            <span className="sep">•</span>
            <span className="count" style={{ color: tac.color }}>6 STONES</span>
            <span className="sep">•</span>
            <span className="sub">SINGULARITY ARCHIVES</span>
          </div>
          <div className="vault-subcode">{tac.subCode}</div>
        </div>

        <div className="vault-header-right">
          <button
            onClick={() => setViewMode(viewMode === 'hud' ? 'panoramic' : 'hud')}
            className="hud-mode-toggle-btn"
            title="Toggle View Mode"
          >
            <LayoutGrid size={14} style={{ color: tac.color }} />
            <span>{viewMode === 'hud' ? 'SWITCH TO PANORAMIC SHELF' : 'SWITCH TO TACTICAL HUD'}</span>
          </button>
        </div>
      </header>

      {/* ==================== VIEW MODE 1: TACTICAL HUD ==================== */}
      {viewMode === 'hud' && (
        <main className={`tactical-hud-body ${isTransitioning ? 'switching' : ''}`}>
          {/* LEFT TELEMETRY & INTEL */}
          <section className="tactical-left-intel">
            <h1 className="tactical-stone-title" style={{ color: tac.color }}>
              {selectedStone.name.toUpperCase()}
            </h1>

            {/* STATUS & ANGLE LINE */}
            <div className="tactical-status-cluster">
              <div className="status-label-group">
                <span className="status-kicker">STATUS:</span>
                <span className="status-main-badge">DESTROYED</span>
                <div className="status-sub-tags">
                  <span className="status-sub-tag">ANNIHILATED</span>
                  <span className="status-sub-tag">TEMPORAL DIVERGENCE</span>
                </div>
              </div>

              {/* Angled SVG HUD Pointer Line targeting the 3D model */}
              <div className="hud-angled-pointer-wrapper">
                <svg className="hud-pointer-svg" viewBox="0 0 320 80" fill="none">
                  <path
                    d="M 0 20 L 140 20 L 220 60 L 300 60"
                    stroke={tac.color}
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    opacity="0.85"
                  />
                  <circle cx="300" cy="60" r="3" fill={tac.color} />
                  <line x1="290" y1="50" x2="310" y2="70" stroke={tac.color} strokeWidth="1" opacity="0.6" />
                </svg>
              </div>
            </div>

            {/* LOCATION BLOCK */}
            <div className="tactical-data-block">
              <span className="data-kicker">LOCATION:</span>
              <div className="data-primary-val">UNKNOWN (ATOMICALLY DISPERSED)</div>
              <div className="data-secondary-val">VESSEL: {tac.vessel}</div>
            </div>

            {/* CORE ESSENCE */}
            <div className="tactical-powers-summary">
              <span className="data-kicker">PRIMORDIAL FACET:</span>
              <p className="facet-text">{selectedStone.description.slice(0, 160)}...</p>
            </div>

            {/* DOSSIER ACTION BUTTON */}
            <div className="tactical-action-row">
              <Link
                href={`/infinity-stones/${selectedStone.slug}`}
                className="tactical-open-dossier-btn"
                style={{ borderColor: tac.color, color: tac.color }}
              >
                <span>OPEN FULL DOSSIER</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          {/* RIGHT 3D VIEWER VIEWPORT */}
          <section className="tactical-right-viewport">
            {/* Top-Right Appearances box */}
            <div className="viewport-appearances-box">
              <span className="appearances-kicker">APPEARANCES:</span>
              <div className="appearances-list-text">{tac.appearancesStr}</div>
            </div>

            {/* Tactical Viewport Container */}
            <div className="tactical-canvas-frame">
              {/* Corner Reticle Brackets */}
              <div className="reticle-corner reticle-tl" style={{ borderColor: tac.color }} />
              <div className="reticle-corner reticle-tr" style={{ borderColor: tac.color }} />
              <div className="reticle-corner reticle-bl" style={{ borderColor: tac.color }} />
              <div className="reticle-corner reticle-br" style={{ borderColor: tac.color }} />

              {/* 3D Canvas */}
              {mounted && (
                <div
                  className="canvas-interactive-wrapper"
                  onClick={() => router.push(`/infinity-stones/${selectedStone.slug}`)}
                  title="Click to view full dossier"
                >
                  <Stone3DViewer
                    key={selectedStone.slug}
                    stoneSlug={selectedStone.slug}
                    interactive={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              )}

              {/* Viewport Floating Telemetry */}
              <div className="viewport-telemetry-badge" style={{ color: tac.color }}>
                <span className="reticle-symbol">▲</span>
                <span>{tac.telemetryNote}</span>
              </div>

              {/* Viewport Direct Dossier Link Pill */}
              <Link
                href={`/infinity-stones/${selectedStone.slug}`}
                className="viewport-direct-dossier-link"
                style={{ borderColor: tac.color, color: tac.color }}
                title="View Full Dossier"
              >
                <span>OPEN FULL DOSSIER</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        </main>
      )}

      {/* ==================== VIEW MODE 2: PANORAMIC ROW ==================== */}
      {viewMode === 'panoramic' && (
        <main className="panoramic-shelf-body">
          <div className="panoramic-shelf-header">
            <span className="shelf-kicker">COSMIC SINGULARITIES // ARCHIVE CLASSIFIED 002-MCU</span>
            <h1 className="panoramic-title">THE SIX INFINITY STONES</h1>
            <p className="panoramic-subtitle">
              Before creation itself there were six singularities. When the universe exploded into existence,
              their remnants were forged into concentrated ingots — each commanding an essential facet of reality.
            </p>
          </div>

          <div className="panoramic-stones-grid">
            {infinityStones.map((stone) => {
              const itemTac = STONE_TACTICAL[stone.slug];
              return (
                <div
                  key={stone.slug}
                  className="panoramic-stone-card"
                  onClick={() => {
                    setSelectedStone(stone);
                    setViewMode('hud');
                  }}
                  style={{
                    borderColor: `rgba(255, 255, 255, 0.08)`,
                  }}
                >
                  <div className="panoramic-stone-viewer">
                    {mounted && (
                      <Stone3DViewer
                        stoneSlug={stone.slug}
                        interactive={false}
                        style={{ width: '100%', height: '100%' }}
                      />
                    )}
                  </div>

                  <div className="panoramic-stone-meta">
                    <div className="panoramic-stone-vessel">{itemTac.vessel}</div>
                    <div className="panoramic-stone-name" style={{ color: itemTac.color }}>
                      {stone.name.toUpperCase()}
                    </div>
                    <div className="panoramic-stone-action" style={{ color: itemTac.color }}>
                      EXAMINE HUD →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* ==================== BOTTOM HORIZONTAL STONE SWITCHER ==================== */}
      <nav className="vault-bottom-switcher-bar">
        <div className="switcher-tabs-scroll">
          {infinityStones.map((stone) => {
            const itemTac = STONE_TACTICAL[stone.slug];
            const isActive = stone.slug === selectedStone.slug;
            return (
              <button
                key={stone.slug}
                onClick={() => handleSelectStone(stone)}
                className={`stone-tab-pill ${isActive ? 'active' : ''}`}
                style={{
                  borderColor: isActive ? itemTac.color : 'rgba(255, 255, 255, 0.08)',
                  background: isActive ? itemTac.glow : 'rgba(10, 14, 20, 0.6)',
                }}
              >
                <span
                  className="stone-tab-indicator"
                  style={{
                    background: itemTac.color,
                    boxShadow: isActive ? `0 0 10px ${itemTac.color}` : 'none',
                  }}
                />
                <div className="stone-tab-labels">
                  <span className="stone-tab-name" style={{ color: isActive ? itemTac.color : '#e2e8f0' }}>
                    {stone.name}
                  </span>
                  <span className="stone-tab-vessel">{itemTac.phaseLabel}</span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      <style jsx>{`
        .vault-screen {
          position: fixed;
          top: var(--nav-height);
          right: var(--dock-gutter);
          bottom: 0;
          left: var(--dock-gutter);
          background: #000000;
          display: flex;
          flex-direction: column;
          color: #f1f5f9;
          font-family: 'Rajdhani', -apple-system, sans-serif;
          overflow: hidden;
          z-index: 10;
        }

        .vault-bg-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          transition: background 0.8s ease;
        }

        .vault-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 3px
          );
          pointer-events: none;
          z-index: 1;
          opacity: 0.7;
        }

        /* HEADER */
        .vault-header {
          position: relative;
          z-index: 5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 36px 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(6, 9, 14, 0.6);
          backdrop-filter: blur(10px);
        }

        .vault-header-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .vault-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 0.16em;
          font-weight: 700;
        }
        .vault-breadcrumbs .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .vault-breadcrumbs .brand {
          color: #fff;
        }
        .vault-breadcrumbs .sep {
          color: #475569;
        }
        .vault-breadcrumbs .sub {
          color: #64748b;
        }

        .vault-subcode {
          font-size: 9px;
          letter-spacing: 0.22em;
          color: #475569;
          font-family: monospace;
        }

        .hud-mode-toggle-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #cbd5e1;
          padding: 6px 14px;
          border-radius: 4px;
          font-size: 10px;
          letter-spacing: 0.15em;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .hud-mode-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        /* ==================== TACTICAL HUD ==================== */
        .tactical-hud-body {
          position: relative;
          z-index: 5;
          flex: 1;
          display: grid;
          grid-template-columns: 440px 1fr;
          padding: 24px 40px;
          gap: 20px;
          align-items: center;
          overflow: hidden;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .tactical-hud-body.switching {
          opacity: 0.1;
          transform: scale(0.99);
        }

        /* Left Intel */
        .tactical-left-intel {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 440px;
        }

        .tactical-stone-title {
          font-size: clamp(2.4rem, 4.5vw, 4.2rem);
          font-weight: 900;
          letter-spacing: 0.06em;
          line-height: 1;
          margin: 0;
          font-family: 'Orbitron', 'Rajdhani', monospace;
          transition: color 0.4s;
        }

        .tactical-status-cluster {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .status-label-group {
          display: flex;
          align-items: baseline;
          gap: 12px;
          flex-wrap: wrap;
        }

        .status-kicker {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #94a3b8;
          font-weight: 700;
        }

        .status-main-badge {
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #ef4444;
          text-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
          line-height: 1.1;
          display: block;
        }

        .status-sub-tags {
          display: flex;
          gap: 6px;
        }

        .status-sub-tag {
          font-size: 8px;
          letter-spacing: 0.14em;
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #ef4444;
          padding: 1px 6px;
          border-radius: 2px;
        }

        .hud-angled-pointer-wrapper {
          width: min(320px, 100%);
          height: 60px;
          margin-top: 0;
          pointer-events: none;
        }
        .hud-pointer-svg {
          width: 100%;
          height: 100%;
        }

        .tactical-data-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .data-kicker {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #64748b;
          font-weight: 700;
        }

        .data-primary-val {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #f8fafc;
        }

        .data-secondary-val {
          font-size: 11px;
          color: #94a3b8;
          letter-spacing: 0.08em;
          font-family: monospace;
        }

        .tactical-powers-summary {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .facet-text {
          font-size: 12px;
          line-height: 1.6;
          color: #94a3b8;
          margin: 0;
        }

        .tactical-action-row {
          margin-top: 8px;
        }

        .tactical-open-dossier-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid;
          padding: 12px 24px;
          border-radius: 4px;
          text-decoration: none;
          font-size: 11px;
          letter-spacing: 0.2em;
          font-weight: 800;
          transition: all 0.25s;
        }
        .tactical-open-dossier-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
        }

        /* Right Viewport */
        .tactical-right-viewport {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .viewport-appearances-box {
          position: absolute;
          top: 0;
          right: 0;
          max-width: 380px;
          text-align: right;
          z-index: 5;
        }

        .appearances-kicker {
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #64748b;
          font-weight: 700;
        }

        .appearances-list-text {
          font-size: 11px;
          line-height: 1.4;
          letter-spacing: 0.06em;
          color: #94a3b8;
          font-weight: 600;
          margin-top: 2px;
        }

        .tactical-canvas-frame {
          position: relative;
          width: min(540px, 90%);
          height: min(500px, 62vh);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reticle-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border-style: solid;
          pointer-events: none;
          z-index: 4;
        }
        .reticle-tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
        .reticle-tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
        .reticle-bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        .reticle-br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

        .canvas-interactive-wrapper {
          width: 100%;
          height: 100%;
          cursor: grab;
        }
        .canvas-interactive-wrapper:active {
          cursor: grabbing;
        }

        .viewport-telemetry-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 9px;
          letter-spacing: 0.16em;
          font-family: monospace;
          background: rgba(0, 0, 0, 0.6);
          padding: 4px 10px;
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          pointer-events: none;
        }

        .viewport-direct-dossier-link {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          font-family: 'Orbitron', monospace;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          padding: 6px 14px;
          border-radius: 3px;
          border: 1px solid;
          text-decoration: none;
          cursor: pointer;
          z-index: 6;
          transition: all 0.2s ease;
        }

        .viewport-direct-dossier-link:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }
        .reticle-symbol {
          font-size: 8px;
        }

        /* ==================== PANORAMIC SHELF ==================== */
        .panoramic-shelf-body {
          position: relative;
          z-index: 5;
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 24px 36px;
          overflow-y: auto;
        }

        .panoramic-shelf-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .shelf-kicker {
          font-size: 10px;
          letter-spacing: 0.22em;
          color: #64748b;
          font-weight: 700;
        }

        .panoramic-title {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          margin: 6px 0 8px;
          font-family: 'Cinzel', 'Orbitron', 'Times New Roman', serif;
          color: #f8fafc;
        }

        .panoramic-subtitle {
          max-width: 780px;
          margin: 0 auto;
          font-size: 13px;
          line-height: 1.6;
          color: #94a3b8;
        }

        .panoramic-stones-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
          align-items: stretch;
          flex: 1;
        }

        .panoramic-stone-card {
          background: rgba(10, 14, 22, 0.6);
          border: 1px solid;
          border-radius: 6px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        .panoramic-stone-card:hover {
          transform: translateY(-6px);
          background: rgba(20, 26, 38, 0.8);
          border-color: rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
        }

        .panoramic-stone-viewer {
          width: 100%;
          height: 180px;
          position: relative;
        }

        .panoramic-stone-meta {
          text-align: center;
          margin-top: 8px;
          width: 100%;
        }

        .panoramic-stone-vessel {
          font-size: 8px;
          letter-spacing: 0.12em;
          color: #64748b;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .panoramic-stone-name {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          margin: 4px 0 6px;
        }

        .panoramic-stone-action {
          font-size: 9px;
          letter-spacing: 0.14em;
          font-weight: 700;
        }

        /* ==================== BOTTOM SWITCHER BAR ==================== */
        .vault-bottom-switcher-bar {
          position: relative;
          z-index: 10;
          height: 70px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(6, 9, 14, 0.85);
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          padding: 0 32px;
        }

        .switcher-tabs-scroll {
          display: flex;
          gap: 10px;
          width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .switcher-tabs-scroll::-webkit-scrollbar {
          display: none;
        }

        .stone-tab-pill {
          flex: 1;
          min-width: 130px;
          max-width: 200px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          border: 1px solid;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.25s;
          text-align: left;
        }
        .stone-tab-pill:hover {
          transform: translateY(-2px);
        }
        .stone-tab-pill.active {
          transform: translateY(-3px);
        }

        .stone-tab-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .stone-tab-labels {
          display: flex;
          flex-direction: column;
        }

        .stone-tab-name {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
        }

        .stone-tab-vessel {
          font-size: 9px;
          color: #64748b;
          letter-spacing: 0.1em;
          margin-top: 1px;
        }

        @media (max-width: 1024px) {
          .tactical-hud-body {
            grid-template-columns: 1fr;
            overflow-y: auto;
            padding: 20px;
          }
          .tactical-right-viewport {
            height: 380px;
          }
          .viewport-appearances-box {
            position: static;
            text-align: left;
            margin-bottom: 12px;
          }
          .panoramic-stones-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 640px) {
          .panoramic-stones-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stone-tab-pill {
            min-width: 110px;
          }
        }
      `}</style>
    </div>
  );
}
