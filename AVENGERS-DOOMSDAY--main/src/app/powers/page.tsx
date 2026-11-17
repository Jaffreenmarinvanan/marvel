// @ts-nocheck
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { characterProfilePath } from '@/data/characters';
import { Zap, Shield, Sparkles, Flame, Eye, Compass, Search, ArrowRight, LayoutGrid, Cpu } from 'lucide-react';

interface PowerCategory {
  id: string;
  name: string;
  source: 'Biological / Mutation' | 'Cosmic Singularity' | 'Mystical / Arcane' | 'Technological' | 'Extraterrestrial';
  description: string;
  manifestation: string;
  wielders: { name: string; slug: string; type: 'hero' | 'villain' | 'character' }[];
  demonstrations: string[];
  imageUrl?: string;
}

const powersDatabase: PowerCategory[] = [
  {
    id: 'p1',
    name: 'Superhuman Strength & Durability',
    source: 'Biological / Mutation',
    description: 'The capacity to exert physical force orders of magnitude beyond mortal human limits, coupled with dense muscular and skeletal physiology capable of withstanding ballistic impacts, atmospheric re-entry, and planetary explosions.',
    manifestation: 'Gamma radiation cellular alteration (Hulk), Super-Soldier Serum gene transcription (Captain America), or natural God-tier Asgardian/Eternal biology.',
    wielders: [
      { name: 'Hulk (Bruce Banner)', slug: 'hulk', type: 'hero' },
      { name: 'Thor Odinson', slug: 'thor', type: 'hero' },
      { name: 'Thanos', slug: 'thanos', type: 'villain' },
      { name: 'Captain America (Steve Rogers)', slug: 'captain-america', type: 'hero' },
    ],
    demonstrations: [
      'Hulk stopping a Leviathan armored warship in New York with a single punch',
      'Thanos easily overpowering the Hulk in hand-to-hand combat aboard the Statesman',
      'Thor withstanding the full unshielded thermal neutron blast of a dying star on Nidavellir',
    ],
  },
  {
    id: 'p2',
    name: 'Chaos Magic & Reality Warping',
    source: 'Mystical / Arcane',
    description: 'The rarest and most dangerous form of arcane manipulation in the cosmos. Allows the caster to spontaneously rewrite the physical laws of matter, alter probabilities, manifest sentient life, and bend dimensional realities without incantations or relics.',
    manifestation: 'Inherent probability manipulation amplified by exposure to the Mind Stone and codified in the Darkhold under the Scarlet Witch prophecy.',
    wielders: [
      { name: 'Scarlet Witch (Wanda Maximoff)', slug: 'scarlet-witch', type: 'hero' },
      { name: 'Reality Stone / Aether', slug: 'reality-stone', type: 'character' },
    ],
    demonstrations: [
      'The creation of the Westview Hex — transforming an entire town, its residents, and eras of sitcom television spontaneously',
      'Thanos altering Knowhere into bubbles and ribbons to deceive the Guardians of the Galaxy',
      'Wanda decapitating and obliterating the Illuminati of Earth-838 using Dreamwalking',
    ],
  },
  {
    id: 'p3',
    name: 'Eldritch Magic & Dimensional Manipulation',
    source: 'Mystical / Arcane',
    description: 'Drawing energy from other dimensions of the multiverse to cast shields, create geometric energy constructs, open interdimensional Sling Ring portals, and bend local mirror dimensions without causing physical collapse in base reality.',
    manifestation: 'Decades of rigorous mental and spiritual discipline through Kamar-Taj and the Masters of the Mystic Arts.',
    wielders: [
      { name: 'Doctor Stephen Strange', slug: 'doctor-strange', type: 'hero' },
      { name: 'Wong (Sorcerer Supreme)', slug: 'doctor-strange', type: 'hero' },
      { name: 'Ancient One', slug: 'doctor-strange', type: 'character' },
    ],
    demonstrations: [
      'Trapping Dormammu in an infinite time loop using the Eye of Agamotto',
      'Conjuring thousands of Sling Ring portals simultaneously across the universe in the Battle of Earth',
      'Mirror Dimension fractal geometry foldings over New York and London',
    ],
  },
  {
    id: 'p4',
    name: 'Cosmic Energy Absorption & Photon Blasts',
    source: 'Cosmic Singularity',
    description: 'The channeling of pure universal light and gravitational energy into flight, interstellar light-speed propulsion, impenetrable energetic shielding, and concentrated photon artillery.',
    manifestation: 'Direct cellular fusion with the Space Stone\'s light-speed engine core explosion combined with Kree blood transfusions.',
    wielders: [
      { name: 'Captain Marvel (Carol Danvers)', slug: 'captain-marvel', type: 'hero' },
      { name: 'Monica Rambeau', slug: 'scarlet-witch', type: 'hero' },
    ],
    demonstrations: [
      'Decimating Thanos\'s flagship Sanctuary II by flying directly through its armored hull at relativistic speed',
      'Igniting the dormant sun of the Kree capital planet Hala',
      'Physical duel with Thanos forcing him to dislodge the Power Stone to repel her',
    ],
  },
  {
    id: 'p5',
    name: 'Temporal Manipulation & Chrono-Kinesis',
    source: 'Cosmic Singularity',
    description: 'The absolute authority over time itself — rewinding localized matter, freezing the flow of entropy, creating closed causal loops, or viewing millions of branching multiversal futures.',
    manifestation: 'Wielded directly through the Time Stone or managed technologically through TVA TempPads and Quantum GPS devices.',
    wielders: [
      { name: 'Doctor Stephen Strange', slug: 'doctor-strange', type: 'hero' },
      { name: 'Thanos', slug: 'thanos', type: 'villain' },
      { name: 'Kang the Conqueror / He Who Remains', slug: 'kang', type: 'villain' },
    ],
    demonstrations: [
      'Doctor Strange meditating on Titan to survey all 14,000,605 future timelines for the single victory path',
      'Thanos rewinding time on Earth to restore the destroyed Mind Stone from Vision\'s shattered forehead',
      'He Who Remains maintaining the Sacred Timeline for eons from the Citadel at the End of Time',
    ],
  },
  {
    id: 'p6',
    name: 'Nanotech Matter Manifestation',
    source: 'Technological',
    description: 'Sub-atomic particulate clusters that deploy instantaneously across surfaces to synthesize solid constructs, weapons, localized energy shields, medical coagulants, and aerodynamic surfaces from compact storage housings.',
    manifestation: 'Stark Industries Arc Reactor-driven nanoparticles and Wakandan Shuri-engineered Vibranium micro-weave nanite suits.',
    wielders: [
      { name: 'Iron Man (Mark 50 & 85)', slug: 'iron-man', type: 'hero' },
      { name: 'Black Panther (Shuri & T\'Challa)', slug: 'black-panther', type: 'hero' },
      { name: 'Spider-Man (Iron Spider)', slug: 'spider-man', type: 'hero' },
    ],
    demonstrations: [
      'Tony Stark reforming his suit while dueling Thanos on Titan to absorb a meteor strike',
      'Black Panther storing kinetic impact across the nanotech weave and releasing it in concussive radial shockwaves',
      'The Nano Gauntlet reforming around all six Infinity Stones to fit Tony Stark\'s right hand',
    ],
  },
  {
    id: 'p7',
    name: 'God of Thunder Electromagnetism & Weather',
    source: 'Extraterrestrial',
    description: 'Direct dominion over atmospheric electrical discharge, planetary weather systems, lightning strikes, and cosmic Bifrost teleportation through divine Asgardian royal heritage.',
    manifestation: 'Channelled initially through the enchanted hammer Mjolnir or battleaxe Stormbreaker, and unlocked as inherent biological energy after the destruction of Asgard.',
    wielders: [
      { name: 'Thor Odinson', slug: 'thor', type: 'hero' },
      { name: 'Hela Odinsdottir', slug: 'hela', type: 'villain' },
      { name: 'Mighty Thor (Jane Foster)', slug: 'thor', type: 'hero' },
    ],
    demonstrations: [
      'Calling down massive lightning bolts upon the palace on Sakaar and the Rainbow Bridge',
      'Thor arriving in Wakanda via the Bifrost using Stormbreaker, single-handedly turning the tide of battle',
      'Empowering the children of New Asgard with temporary lightning godhood to defeat Shadow Monsters',
    ],
  },
  {
    id: 'p8',
    name: 'Quantum Sub-Atomic Shrinking & Enlargement',
    source: 'Technological',
    description: 'The manipulation of subatomic distances between elementary particles without reducing absolute mass, allowing the user to compress into molecular or sub-quantum sizes or expand to monumental skyscraper scales.',
    manifestation: 'Pym Particles — an extraordinary synthetic chemical formulation invented by Dr. Hank Pym requiring a sealed regulator suit.',
    wielders: [
      { name: 'Ant-Man (Scott Lang)', slug: 'ant-man', type: 'hero' },
      { name: 'Wasp (Hope van Dyne)', slug: 'ant-man', type: 'hero' },
      { name: 'Hank Pym', slug: 'ant-man', type: 'hero' },
    ],
    demonstrations: [
      'Scott Lang shrinking sub-atomic to enter the Quantum Realm in 1989 and returning safely',
      'Giant-Man emerging from the ruins of Avengers Compound to swat Leviathans from the sky',
      'Traversing the Quantum Realm through time vortexes to execute the Time Heist in 2023',
    ],
  },
];

const SOURCE_COLORS: Record<string, string> = {
  'Biological / Mutation': '#10b981',
  'Cosmic Singularity': '#38bdf8',
  'Mystical / Arcane': '#f59e0b',
  'Technological': '#06b6d4',
  'Extraterrestrial': '#c084fc',
};

export default function SuperpowersArchivePage() {
  const [selectedPower, setSelectedPower] = useState<PowerCategory>(powersDatabase[0]);
  const [viewMode, setViewMode] = useState<'hud' | 'panoramic'>('hud');
  const [search, setSearch] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sources = useMemo(() => {
    return ['all', ...Array.from(new Set(powersDatabase.map((p) => p.source)))];
  }, []);

  const filteredPowers = useMemo(() => {
    return powersDatabase.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.wielders.some((w) => w.name.toLowerCase().includes(q));

      const matchesSource =
        selectedSource === 'all' || p.source === selectedSource;

      return matchesSearch && matchesSource;
    });
  }, [search, selectedSource]);

  const handleSelect = (p: PowerCategory) => {
    if (p.id === selectedPower.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedPower(p);
      setIsTransitioning(false);
    }, 120);
  };

  const accent = SOURCE_COLORS[selectedPower.source] || '#38bdf8';
  const imgUrl = selectedPower.imageUrl || `/images/powers/${selectedPower.id}.png`;

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
            <span className="count" style={{ color: accent }}>{powersDatabase.length} ABILITIES</span>
            <span className="sep">•</span>
            <span className="sub">SUPERPOWERS & ANOMALIES REGISTRY</span>
          </div>
          <div className="vault-subcode">S.H.I.E.L.D. METAHUMAN CLASSIFICATION // OMEGA MUTATION & ARCANE REGISTRY</div>
        </div>

        <div className="vault-header-right">
          <button
            onClick={() => setViewMode(viewMode === 'hud' ? 'panoramic' : 'hud')}
            className="hud-mode-toggle-btn"
          >
            <LayoutGrid size={14} style={{ color: accent }} />
            <span>{viewMode === 'hud' ? 'SWITCH TO PANORAMIC MATRIX' : 'SWITCH TO TACTICAL HUD'}</span>
          </button>
        </div>
      </header>

      {/* ==================== VIEW MODE 1: TACTICAL HUD ==================== */}
      {viewMode === 'hud' && (
        <main className={`tactical-hud-body ${isTransitioning ? 'switching' : ''}`}>
          {/* LEFT INTEL */}
          <section className="tactical-left-intel">
            <div className="classification-tag" style={{ borderColor: accent, color: accent }}>
              {selectedPower.source.toUpperCase()} // REGISTRY #{selectedPower.id.toUpperCase()}
            </div>

            <h1 className="tactical-title" style={{ color: accent }}>
              {selectedPower.name.toUpperCase()}
            </h1>

            {/* STATUS & ANGLE POINTER LINE */}
            <div className="tactical-status-cluster">
              <div className="status-label-group">
                <span className="status-kicker">THREAT CLASSIFICATION:</span>
                <span className="status-badge" style={{ color: accent }}>
                  OMEGA CLASS
                </span>
                <span className="status-sub-tag">CANONICAL ANOMALY</span>
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

            {/* MANIFESTATION & ESSENCE */}
            <div className="tactical-data-block">
              <span className="data-kicker">SCIENTIFIC & ARCANE MANIFESTATION:</span>
              <div className="data-primary-val">{selectedPower.manifestation}</div>
            </div>

            {/* DESCRIPTION */}
            <div className="hero-quote-box" style={{ borderColor: accent }}>
              <span className="quote-text">{selectedPower.description}</span>
            </div>

            {/* DEMONSTRATIONS */}
            <div className="tactical-powers-summary">
              <span className="data-kicker">CANONICAL COMBAT DEMONSTRATIONS:</span>
              <ul className="capabilities-bullets">
                {selectedPower.demonstrations.slice(0, 3).map((demo, idx) => (
                  <li key={idx} className="capability-item">
                    <span className="bullet-dot" style={{ background: accent }} />
                    <span>{demo}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* NOTABLE WIELDERS */}
            <div className="custody-preview-row">
              <span className="data-kicker">PRIMARY DOCUMENTED WIELDERS:</span>
              <div className="wielders-pills">
                {selectedPower.wielders.map((w, idx) => (
                  <Link
                    key={idx}
                    href={
                      w.slug.endsWith('-stone')
                        ? `/infinity-stones/${w.slug}`
                        : characterProfilePath(w.slug)
                    }
                    className="wielder-pill wielder-link"
                  >
                    <span>{w.name}</span>
                    <ArrowRight size={10} style={{ color: accent }} />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT VISUAL VIEWPORT */}
          <section className="tactical-right-viewport">
            {/* Top-Right Source Box */}
            <div className="viewport-appearances-box">
              <span className="appearances-kicker">ENERGY GENESIS:</span>
              <div className="appearances-list-text" style={{ color: accent }}>
                {selectedPower.source.toUpperCase()} // QUANTUM SPECTROMETRY LOGGED
              </div>
            </div>

            {/* Tactical Viewport Container */}
            <div className="tactical-canvas-frame">
              {/* Corner Reticle Brackets */}
              <div className="reticle-corner reticle-tl" style={{ borderColor: accent }} />
              <div className="reticle-corner reticle-tr" style={{ borderColor: accent }} />
              <div className="reticle-corner reticle-bl" style={{ borderColor: accent }} />
              <div className="reticle-corner reticle-br" style={{ borderColor: accent }} />

              {/* Visual Object: PNG Cutout Display with Fallback */}
              <div className="visual-object-wrapper">
                <img
                  key={imgUrl}
                  src={imgUrl}
                  alt={selectedPower.name}
                  className="floating-png-object"
                  onError={(e) => {
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
                  <Zap size={64} style={{ color: accent }} className="holo-icon" />
                  <div className="holo-tag" style={{ color: accent }}>{selectedPower.name.toUpperCase()}</div>
                  <div className="holo-sub">{selectedPower.source.toUpperCase()} PHENOMENON</div>
                </div>
              </div>

              {/* Viewport Floating Telemetry */}
              <div className="viewport-telemetry-badge" style={{ color: accent }}>
                <span className="reticle-symbol">▲</span>
                <span>METAHUMAN SENSORS: ANOMALOUS ENERGY MATRIX ACTIVE // LEVEL 10 CLEARANCE</span>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ==================== VIEW MODE 2: PANORAMIC MATRIX ==================== */}
      {viewMode === 'panoramic' && (
        <main className="panoramic-shelf-body">
          <div className="panoramic-shelf-header">
            <span className="shelf-kicker">MULTIVERSAL POWER PHENOMENA // CLASSIFIED 005-POWERS</span>
            <h1 className="panoramic-title">SUPERPOWERS & ABILITIES MATRIX</h1>
            <p className="panoramic-subtitle">
              Taxonomy of super-soldier mutations, divine lightning, chaos reality warping, nanotech synthesis, and temporal manipulation.
            </p>

            {/* Filter controls */}
            <div className="panoramic-controls-row">
              <div className="search-pill-box">
                <Search size={14} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search superpowers by name or wielder..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-pill-input"
                />
              </div>

              <div className="category-chips">
                {sources.map((src) => (
                  <button
                    key={src}
                    onClick={() => setSelectedSource(src)}
                    className={`cat-chip ${selectedSource === src ? 'active' : ''}`}
                  >
                    {src === 'all' ? 'ALL SOURCES' : src.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="panoramic-grid">
            {filteredPowers.map((power) => {
              const pAccent = SOURCE_COLORS[power.source] || '#38bdf8';
              const pImg = power.imageUrl || `/images/powers/${power.id}.png`;
              return (
                <div
                  key={power.id}
                  className="panoramic-card"
                  onClick={() => {
                    setSelectedPower(power);
                    setViewMode('hud');
                  }}
                  style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
                >
                  <div className="panoramic-card-thumb">
                    <img
                      src={pImg}
                      alt={power.name}
                      className="panoramic-thumb-img"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                        const fallback = (e.target as HTMLElement).nextElementSibling;
                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                      }}
                    />
                    <div className="panoramic-thumb-fallback" style={{ display: 'none', background: `radial-gradient(circle, ${pAccent}22 0%, #06090e 100%)` }}>
                      <Zap size={32} style={{ color: pAccent }} />
                    </div>
                  </div>

                  <div className="panoramic-card-info">
                    <div className="panoramic-cat-tag" style={{ color: pAccent }}>{power.source.toUpperCase()}</div>
                    <div className="panoramic-card-name">{power.name}</div>
                    <div className="panoramic-card-origin">{power.description.slice(0, 52)}...</div>
                    <div className="panoramic-card-action" style={{ color: pAccent }}>EXAMINE HUD →</div>
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
          {powersDatabase.map((p) => {
            const pAccent = SOURCE_COLORS[p.source] || '#38bdf8';
            const isActive = p.id === selectedPower.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelect(p)}
                className={`stone-tab-pill ${isActive ? 'active' : ''}`}
                style={{
                  borderColor: isActive ? pAccent : 'rgba(255, 255, 255, 0.08)',
                  background: isActive ? 'rgba(255, 255, 255, 0.06)' : 'rgba(10, 14, 20, 0.6)',
                }}
              >
                <span
                  className="stone-tab-indicator"
                  style={{
                    background: pAccent,
                    boxShadow: isActive ? `0 0 10px ${pAccent}` : 'none',
                  }}
                />
                <div className="stone-tab-labels">
                  <span className="stone-tab-name" style={{ color: isActive ? pAccent : '#e2e8f0' }}>
                    {p.name}
                  </span>
                  <span className="stone-tab-vessel">{p.source.split('/')[0].trim().toUpperCase()}</span>
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
          font-size: clamp(2rem, 3.8vw, 3.4rem);
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
          font-size: 1.3rem;
          font-weight: 900;
          letter-spacing: 0.08em;
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
          width: 320px;
          height: 45px;
          margin-top: -6px;
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

        .hero-quote-box {
          border-left: 2px solid;
          padding-left: 12px;
          font-style: italic;
          color: #cbd5e1;
          font-size: 13px;
          line-height: 1.5;
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
        .wielder-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .wielder-link:hover {
          background: rgba(255, 255, 255, 0.1);
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
          50% { transform: translateY(-10px) rotate(0.8deg); }
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
          right: 12px;
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

        /* PANORAMIC MATRIX */
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
