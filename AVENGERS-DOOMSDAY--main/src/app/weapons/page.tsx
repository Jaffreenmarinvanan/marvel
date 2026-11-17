// @ts-nocheck
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { weapons } from '@/data/weapons';
import type { Weapon } from '@/types';
import { Shield, Zap, Sparkles, ArrowRight, LayoutGrid, Search, Compass, Swords } from 'lucide-react';

const Weapon3DViewer = dynamic(() => import('@/components/Weapon3DViewer'), {
  ssr: false,
  loading: () => <div className="hologram-loading-placeholder">LOADING 3D WEAPON MODEL...</div>,
});

const HAS_3D_WEAPON = ['mjolnir', 'stormbreaker', 'captain-america-shield'];

export default function WeaponsArchivePage() {
  const router = useRouter();
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon>(weapons[0]); // defaults to Mjolnir
  const [viewMode, setViewMode] = useState<'hud' | 'panoramic'>('hud');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(weapons.map((w) => w.category)))];
  }, []);

  const filteredWeapons = useMemo(() => {
    return weapons.filter((w) => {
      const q = search.toLowerCase();
      const matchesSearch =
        w.name.toLowerCase().includes(q) ||
        w.origin.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.powers.some((p) => p.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === 'all' || w.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);

  const handleSelect = (w: Weapon) => {
    if (w.slug === selectedWeapon.slug) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedWeapon(w);
      setIsTransitioning(false);
    }, 120);
  };

  const accent = selectedWeapon.accentColor || '#f59e0b';
  const imgUrl = selectedWeapon.imageUrl || `/images/weapons/${selectedWeapon.slug}.png`;

  return (
    <div className="vault-screen">
      <div className="vault-scanlines" />

      {/* TOP HEADER HUD */}
      <header className="vault-header">
        <div className="vault-header-left">
          <div className="vault-breadcrumbs">
            <span className="dot" style={{ background: accent }} />
            <span className="brand">MARVEL STUDIOS</span>
            <span className="sep">•</span>
            <span className="count" style={{ color: accent }}>{weapons.length} ARTIFACTS</span>
            <span className="sep">•</span>
            <span className="sub">ARMORY & RELICS ARCHIVE</span>
          </div>
          <div className="vault-subcode">S.H.I.E.L.D. ARMORY CLASSIFICATION // LEVEL 8 CLEARANCE</div>
        </div>

        <div className="vault-header-right">
          <button
            onClick={() => setViewMode(viewMode === 'hud' ? 'panoramic' : 'hud')}
            className="hud-mode-toggle-btn"
          >
            <LayoutGrid size={14} style={{ color: accent }} />
            <span>{viewMode === 'hud' ? 'SWITCH TO PANORAMIC SHELF' : 'SWITCH TO TACTICAL HUD'}</span>
          </button>
        </div>
      </header>

      {/* ==================== VIEW MODE 1: TACTICAL HUD ==================== */}
      {viewMode === 'hud' && (
        <main className={`tactical-hud-body ${isTransitioning ? 'switching' : ''}`}>
          {/* LEFT TELEMETRY & INTEL */}
          <section className="tactical-left-intel">
            <div className="classification-tag" style={{ borderColor: accent, color: accent }}>
              {selectedWeapon.category.toUpperCase()} // {selectedWeapon.material ? selectedWeapon.material.toUpperCase() : 'COSMIC RELIC'}
            </div>

            <h1 className="tactical-title" style={{ color: accent }}>
              {selectedWeapon.name.toUpperCase()}
            </h1>

            {/* STATUS & ANGLE POINTER LINE */}
            <div className="tactical-status-cluster">
              <div className="status-label-group">
                <span className="status-kicker">STATUS:</span>
                <span className={`status-badge ${selectedWeapon.currentStatus.toLowerCase().includes('destroyed') ? 'status-destroyed' : 'status-active'}`}>
                  {selectedWeapon.currentStatus.toLowerCase().includes('destroyed') ? 'DESTROYED' : 'OPERATIONAL'}
                </span>
                <span className="status-sub-tag">{selectedWeapon.currentStatus.slice(0, 32)}</span>
              </div>

              {/* Angled SVG HUD Pointer Line targeting the visual viewport */}
              <div className="hud-angled-pointer-wrapper">
                <svg className="hud-pointer-svg" viewBox="0 0 320 60" fill="none">
                  <path
                    d="M 0 15 L 140 15 L 210 45 L 300 45"
                    stroke={accent}
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    opacity="0.85"
                  />
                  <circle cx="300" cy="45" r="3" fill={accent} />
                  <line x1="290" y1="35" x2="310" y2="55" stroke={accent} strokeWidth="1" opacity="0.6" />
                </svg>
              </div>
            </div>

            {/* PROVENANCE / ORIGIN BLOCK */}
            <div className="tactical-data-block">
              <span className="data-kicker">ORIGIN & FORGERY:</span>
              <div className="data-primary-val">{selectedWeapon.origin}</div>
              {selectedWeapon.creator && (
                <div className="data-secondary-val">CREATOR: {selectedWeapon.creator.toUpperCase()}</div>
              )}
            </div>

            {/* PRIMARY CAPABILITIES */}
            <div className="tactical-powers-summary">
              <span className="data-kicker">PRIMARY POWERS & ENCHANTMENTS:</span>
              <ul className="capabilities-bullets">
                {selectedWeapon.powers.slice(0, 3).map((p, idx) => (
                  <li key={idx} className="capability-item">
                    <span className="bullet-dot" style={{ background: accent }} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* LINE OF CUSTODY */}
            <div className="custody-preview-row">
              <span className="data-kicker">NOTABLE WIELDERS:</span>
              <div className="wielders-pills">
                {selectedWeapon.previousOwners.slice(0, 4).map((owner, idx) => (
                  <span key={idx} className="wielder-pill">{owner}</span>
                ))}
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="tactical-action-row">
              <Link
                href={`/weapons/${selectedWeapon.slug}`}
                className="tactical-open-dossier-btn"
                style={{ borderColor: accent, color: accent }}
              >
                <span>OPEN FULL ARMORY DOSSIER</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          {/* RIGHT VISUAL VIEWPORT */}
          <section className="tactical-right-viewport">
            {/* Top-Right Appearances box */}
            <div className="viewport-appearances-box">
              <span className="appearances-kicker">MCU APPEARANCES:</span>
              <div className="appearances-list-text">
                {selectedWeapon.appearances.map((a) => a.replace(/-/g, ' ').toUpperCase()).join(' • ')}
              </div>
            </div>

            {/* Tactical Viewport Container */}
            <div className="tactical-canvas-frame">
              {/* Corner Reticle Brackets */}
              <div className="reticle-corner reticle-tl" style={{ borderColor: accent }} />
              <div className="reticle-corner reticle-tr" style={{ borderColor: accent }} />
              <div className="reticle-corner reticle-bl" style={{ borderColor: accent }} />
              <div className="reticle-corner reticle-br" style={{ borderColor: accent }} />

              {/* 3D Weapon Model or PNG Image Display */}
              {HAS_3D_WEAPON.includes(selectedWeapon.slug) ? (
                <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 2 }}>
                  <Weapon3DViewer slug={selectedWeapon.slug} key={selectedWeapon.slug} />
                </div>
              ) : (
                <div
                  className="visual-object-wrapper"
                  onClick={() => router.push(`/weapons/${selectedWeapon.slug}`)}
                  title="Inspect in full dossier"
                >
                  <img
                    key={imgUrl}
                    src={imgUrl}
                    alt={selectedWeapon.name}
                    className="floating-png-object"
                    onError={(e) => {
                      // Fallback to stylized SVG hologram if image file not yet present
                      (e.target as HTMLElement).style.display = 'none';
                      const fallback = (e.target as HTMLElement).nextElementSibling;
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }}
                  />

                  {/* Holographic Glyph Fallback */}
                  <div className="holographic-fallback" style={{ display: 'none', borderColor: accent }}>
                    <div className="hologram-rings">
                      <div className="holo-ring holo-ring-1" style={{ borderColor: accent }} />
                      <div className="holo-ring holo-ring-2" style={{ borderColor: accent }} />
                    </div>
                    <Swords size={64} style={{ color: accent }} className="holo-icon" />
                    <div className="holo-tag" style={{ color: accent }}>{selectedWeapon.name.toUpperCase()}</div>
                    <div className="holo-sub">{selectedWeapon.category.toUpperCase()} SPECIFICATION</div>
                  </div>
                </div>
              )}

              {/* Viewport Floating Telemetry */}
              <div className="viewport-telemetry-badge" style={{ color: accent }}>
                <span className="reticle-symbol">▲</span>
                <span>ARMORY SENSORS: {selectedWeapon.material || 'ENCHANTED'} // READY FOR DISPATCH</span>
              </div>

              {/* Direct Dossier Link Pill */}
              <Link
                href={`/weapons/${selectedWeapon.slug}`}
                className="viewport-direct-dossier-link"
                style={{ borderColor: accent, color: accent }}
                title="View Full Weapon Dossier"
              >
                <span>OPEN FULL DOSSIER</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        </main>
      )}

      {/* ==================== VIEW MODE 2: PANORAMIC ARMORY SHELF ==================== */}
      {viewMode === 'panoramic' && (
        <main className="panoramic-shelf-body">
          <div className="panoramic-shelf-header">
            <span className="shelf-kicker">DIVINE & COSMIC ARTIFACTS // CLASSIFIED 003-ARMORY</span>
            <h1 className="panoramic-title">THE MARVEL ARMORY & RELICS VAULT</h1>
            <p className="panoramic-subtitle">
              Archival records of divine forgeries, cosmic relics, Vibranium armaments, and mystical books spanning Asgard, Earth, Wakanda, and the stars.
            </p>

            {/* Filter controls */}
            <div className="panoramic-controls-row">
              <div className="search-pill-box">
                <Search size={14} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search weapons by name, origin, or power..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-pill-input"
                />
              </div>

              <div className="category-chips">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`cat-chip ${selectedCategory === cat ? 'active' : ''}`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="panoramic-grid">
            {filteredWeapons.map((item) => {
              const itemAccent = item.accentColor || '#f59e0b';
              const itemImg = item.imageUrl || `/images/weapons/${item.slug}.png`;
              return (
                <div
                  key={item.id}
                  className="panoramic-card"
                  onClick={() => {
                    setSelectedWeapon(item);
                    setViewMode('hud');
                  }}
                  style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
                >
                  <div className="panoramic-card-thumb">
                    <img
                      src={itemImg}
                      alt={item.name}
                      className="panoramic-thumb-img"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                        const fallback = (e.target as HTMLElement).nextElementSibling;
                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                      }}
                    />
                    <div className="panoramic-thumb-fallback" style={{ display: 'none', background: `radial-gradient(circle, ${itemAccent}22 0%, #06090e 100%)` }}>
                      <Swords size={32} style={{ color: itemAccent }} />
                    </div>
                  </div>

                  <div className="panoramic-card-info">
                    <div className="panoramic-cat-tag" style={{ color: itemAccent }}>{item.category.toUpperCase()}</div>
                    <div className="panoramic-card-name">{item.name}</div>
                    <div className="panoramic-card-origin">{item.origin.slice(0, 48)}...</div>
                    <div className="panoramic-card-action" style={{ color: itemAccent }}>EXAMINE HUD →</div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* ==================== BOTTOM HORIZONTAL SWITCHER BAR ==================== */}
      <nav className="vault-bottom-switcher-bar">
        <div className="switcher-tabs-scroll">
          {weapons.map((w) => {
            const wAccent = w.accentColor || '#f59e0b';
            const isActive = w.slug === selectedWeapon.slug;
            return (
              <button
                key={w.id}
                onClick={() => handleSelect(w)}
                className={`stone-tab-pill ${isActive ? 'active' : ''}`}
                style={{
                  borderColor: isActive ? wAccent : 'rgba(255, 255, 255, 0.08)',
                  background: isActive ? 'rgba(255, 255, 255, 0.06)' : 'rgba(10, 14, 20, 0.6)',
                }}
              >
                <span
                  className="stone-tab-indicator"
                  style={{
                    background: wAccent,
                    boxShadow: isActive ? `0 0 10px ${wAccent}` : 'none',
                  }}
                />
                <div className="stone-tab-labels">
                  <span className="stone-tab-name" style={{ color: isActive ? wAccent : '#e2e8f0' }}>
                    {w.name}
                  </span>
                  <span className="stone-tab-vessel">{w.category.toUpperCase()}</span>
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
          background: #06090e;
          display: flex;
          flex-direction: column;
          color: #f1f5f9;
          font-family: 'Rajdhani', -apple-system, sans-serif;
          overflow: hidden;
          z-index: 10;
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

        /* TACTICAL HUD BODY */
        .tactical-hud-body {
          position: relative;
          z-index: 5;
          flex: 1;
          display: grid;
          grid-template-columns: 460px 1fr;
          padding: 24px 40px;
          gap: 24px;
          align-items: center;
          overflow: hidden;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .tactical-hud-body.switching {
          opacity: 0.1;
          transform: scale(0.99);
        }

        .tactical-left-intel {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 460px;
        }

        .classification-tag {
          font-size: 9px;
          letter-spacing: 0.22em;
          font-weight: 700;
          border: 1px solid;
          padding: 2px 8px;
          border-radius: 2px;
          width: fit-content;
        }

        .tactical-title {
          font-size: clamp(2rem, 3.8vw, 3.6rem);
          font-weight: 900;
          letter-spacing: 0.06em;
          line-height: 1.05;
          margin: 0;
          font-family: 'Orbitron', 'Rajdhani', monospace;
          transition: color 0.4s;
        }

        .tactical-status-cluster {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .status-label-group {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
        }

        .status-kicker {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #94a3b8;
          font-weight: 700;
        }

        .status-badge {
          font-size: 1.4rem;
          font-weight: 900;
          letter-spacing: 0.08em;
        }
        .status-destroyed {
          color: #ef4444;
        }
        .status-active {
          color: #10b981;
        }

        .status-sub-tag {
          font-size: 8px;
          letter-spacing: 0.14em;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          padding: 1px 6px;
          border-radius: 2px;
        }

        .hud-angled-pointer-wrapper {
          width: min(320px, 100%);
          height: 45px;
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
          gap: 3px;
        }

        .data-kicker {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #64748b;
          font-weight: 700;
        }

        .data-primary-val {
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #f8fafc;
          line-height: 1.4;
        }

        .data-secondary-val {
          font-size: 10px;
          color: #94a3b8;
          letter-spacing: 0.08em;
          font-family: monospace;
        }

        .tactical-powers-summary {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .capabilities-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .capability-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12px;
          line-height: 1.4;
          color: #cbd5e1;
        }

        .bullet-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .custody-preview-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .wielders-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .wielder-pill {
          font-size: 10px;
          letter-spacing: 0.08em;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2px 8px;
          border-radius: 3px;
          color: #cbd5e1;
        }

        .tactical-action-row {
          margin-top: 6px;
        }

        .tactical-open-dossier-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid;
          padding: 10px 22px;
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

        /* RIGHT VIEWPORT */
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
          max-width: 420px;
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
          font-size: 10px;
          line-height: 1.4;
          letter-spacing: 0.06em;
          color: #94a3b8;
          font-weight: 600;
          margin-top: 2px;
        }

        .tactical-canvas-frame {
          position: relative;
          width: min(540px, 92%);
          height: min(480px, 60vh);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(8, 12, 18, 0.75);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
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

        .visual-object-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 24px;
        }

        .floating-png-object {
          max-width: 85%;
          max-height: 85%;
          object-fit: contain;
          filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.8));
          animation: floatLevitate 5s ease-in-out infinite;
          transition: transform 0.3s ease;
        }
        .floating-png-object:hover {
          transform: scale(1.05);
        }

        @keyframes floatLevitate {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .holographic-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          padding: 40px;
        }

        .hologram-rings {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .holo-ring {
          position: absolute;
          border: 1px dashed;
          border-radius: 50%;
          opacity: 0.25;
        }
        .holo-ring-1 {
          width: 220px;
          height: 220px;
          animation: spinHolo 20s linear infinite;
        }
        .holo-ring-2 {
          width: 280px;
          height: 280px;
          animation: spinHoloRev 30s linear infinite;
        }

        @keyframes spinHolo { 100% { transform: rotate(360deg); } }
        @keyframes spinHoloRev { 100% { transform: rotate(-360deg); } }

        .holo-tag {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.14em;
          margin-top: 14px;
          font-family: 'Orbitron', monospace;
        }

        .holo-sub {
          font-size: 9px;
          letter-spacing: 0.18em;
          color: #64748b;
          margin-top: 4px;
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
          background: rgba(0, 0, 0, 0.7);
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

        /* PANORAMIC SHELF */
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
          margin-bottom: 20px;
        }

        .shelf-kicker {
          font-size: 10px;
          letter-spacing: 0.22em;
          color: #64748b;
          font-weight: 700;
        }

        .panoramic-title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          margin: 6px 0 8px;
          font-family: 'Orbitron', 'Rajdhani', monospace;
          color: #f8fafc;
        }

        .panoramic-subtitle {
          max-width: 760px;
          margin: 0 auto 16px;
          font-size: 13px;
          line-height: 1.6;
          color: #94a3b8;
        }

        .panoramic-controls-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .search-pill-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px 14px;
          border-radius: 20px;
          min-width: 280px;
        }

        .search-pill-input {
          background: none;
          border: none;
          outline: none;
          color: #fff;
          font-size: 11px;
          letter-spacing: 0.06em;
          width: 100%;
        }

        .category-chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .cat-chip {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          font-size: 9px;
          letter-spacing: 0.12em;
          padding: 4px 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cat-chip.active, .cat-chip:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .panoramic-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          align-items: stretch;
          margin-top: 16px;
        }

        .panoramic-card {
          background: rgba(10, 14, 22, 0.6);
          border: 1px solid;
          border-radius: 6px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all 0.25s;
        }
        .panoramic-card:hover {
          transform: translateY(-4px);
          background: rgba(18, 24, 36, 0.85);
          border-color: rgba(255, 255, 255, 0.25) !important;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6);
        }

        .panoramic-card-thumb {
          width: 100%;
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
        }

        .panoramic-thumb-img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.6));
        }

        .panoramic-thumb-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .panoramic-card-info {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
        }

        .panoramic-cat-tag {
          font-size: 8px;
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        .panoramic-card-name {
          font-size: 13px;
          font-weight: 800;
          color: #fff;
          margin: 3px 0;
        }

        .panoramic-card-origin {
          font-size: 10px;
          color: #64748b;
          line-height: 1.4;
        }

        .panoramic-card-action {
          font-size: 9px;
          letter-spacing: 0.14em;
          font-weight: 700;
          margin-top: 8px;
        }

        /* BOTTOM SWITCHER BAR */
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
          min-width: 140px;
          max-width: 220px;
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
          font-size: 8px;
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
        }
      `}</style>
    </div>
  );
}
