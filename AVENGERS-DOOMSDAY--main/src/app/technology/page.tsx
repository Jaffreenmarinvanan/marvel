// @ts-nocheck
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Cpu, Shield, Zap, Sparkles, LayoutGrid, Search, ArrowRight, X, Compass, ExternalLink } from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  creator: string;
  category: 'iron-man' | 'wakanda' | 'pym' | 'cosmic' | 'ai';
  era: string;
  description: string;
  capabilities: string[];
  limitations: string;
  appearances: string[];
  accentColor?: string;
  imageUrl?: string;
  status?: string;
}

const techArchive: TechItem[] = [
  {
    id: 't1',
    name: 'Iron Man Armor Mark LXXXV (Mark 85)',
    creator: 'Tony Stark',
    category: 'iron-man',
    era: '2023 (Avengers: Endgame)',
    accentColor: '#ef4444',
    status: 'DECOMMISSIONED (SACRIFICE PROTOCOL)',
    description: 'The pinnacle of Tony Stark\'s armor engineering. Built entirely from advanced nanotechnology, combining fluid agility with enhanced structural density reminiscent of classic comic book designs. It integrates lightning re-channeling fins and was capable of housing and channeling the power of all six Infinity Stones.',
    capabilities: [
      'Instantaneous nanotech weapon manifestation (shields, energy blades, repulsor cannons)',
      'Direct lightning absorption & amplification with Thor',
      'Quantum Realm temporal navigation integration',
      'Nano-gauntlet Infinity Stone transference mechanism',
    ],
    limitations: 'Channeling all six Infinity Stones caused lethal thermal and gamma discharge to the biological pilot.',
    appearances: ['Avengers: Endgame'],
  },
  {
    id: 't11',
    name: 'The Nano-Gauntlet',
    creator: 'Tony Stark, Bruce Banner & Rocket Raccoon',
    category: 'iron-man',
    era: '2023 (Avengers: Endgame)',
    accentColor: '#f59e0b',
    status: 'DISCHARGED (HEROIC SACRIFICE)',
    description: 'Constructed at the Avengers Compound from advanced Stark nanotechnology to house all six Infinity Stones recovered during the Time Heist. Unlike Thanos\'s Uru Gauntlet, this glove adjusted size automatically to fit the Hulk and later Tony Stark.',
    capabilities: [
      'Dynamic biometric size scaling from Hulk to human physiology',
      'Quantum thermal heat dissipation veins',
      'Direct neural trigger for universal reality restructuring',
    ],
    limitations: 'Immense gamma radiation leakage damages any biological wielder upon contact.',
    appearances: ['Avengers: Endgame'],
  },
  {
    id: 't2',
    name: 'Miniaturized Arc Reactor (Badassium Core)',
    creator: 'Tony Stark (Howard Stark Blueprints)',
    category: 'iron-man',
    era: '2010 (Iron Man 2)',
    accentColor: '#38bdf8',
    status: 'ACTIVE & REFINED',
    description: 'A clean, self-sustaining particle accelerator energy source that replaced the toxic palladium core in Tony\'s chest. Tony synthesized this non-toxic element using a prism accelerator based on geometric blueprints hidden inside the 1974 Stark Expo diorama.',
    capabilities: [
      'Produces gigajoules of clean energy per second',
      'Zero cellular toxicity or blood poisoning',
      'Powers multiple repulsor weapons and uni-beam simultaneously',
    ],
    limitations: 'High energy surges can temporarily drain capacitor reserves.',
    appearances: ['Iron Man 2', 'The Avengers', 'Iron Man 3', 'Avengers: Infinity War'],
  },
  {
    id: 't3',
    name: 'J.A.R.V.I.S. (Just A Rather Very Intelligent System)',
    creator: 'Tony Stark',
    category: 'ai',
    era: '2008 – 2015',
    accentColor: '#06b6d4',
    status: 'EVOLVED INTO VISION',
    description: 'A highly sophisticated conversational artificial intelligence that managed Tony Stark\'s Malibu estate, Stark Industries research complexes, and automated Iron Man suit diagnostics. After Ultron\'s attack, its remaining neural protocols were fused with the Mind Stone to birth Vision.',
    capabilities: [
      'Complex tactical battle combat prediction',
      'Full automated manufacturing & assembly orchestration',
      'Natural conversational interface and witty situational banter',
      'Cyberwarfare firewalls capable of halting nuclear launches',
    ],
    limitations: 'Vulnerable to complete physical server destruction before distributed cloud failover.',
    appearances: ['Iron Man', 'Iron Man 2', 'The Avengers', 'Iron Man 3', 'Avengers: Age of Ultron'],
  },
  {
    id: 't4',
    name: 'E.D.I.T.H. Tactical Defense Glasses',
    creator: 'Tony Stark (Bequeathed to Peter Parker)',
    category: 'ai',
    era: '2024 (Spider-Man: Far From Home)',
    accentColor: '#60a5fa',
    status: 'SECURED BY DEPARTMENT OF DAMAGE CONTROL',
    description: '"Even Dead, I\'m The Hero." A pair of unassuming aviator sunglasses with integrated neural tactical AI giving the wearer command over a global network of Stark Industries armed combat drones and worldwide cellular interception systems.',
    capabilities: [
      'Full satellite surveillance & real-time facial recognition',
      'Global orbital Stark drone strike deployment',
      'Total telecommunications and cellular intercept capability',
    ],
    limitations: 'Voice command authorization can be transferred to unauthorized individuals through verbal consent.',
    appearances: ['Spider-Man: Far From Home'],
  },
  {
    id: 't5',
    name: 'Wakandan Vibranium Nanoweave Habit',
    creator: 'Princess Shuri',
    category: 'wakanda',
    era: '2018 (Black Panther)',
    accentColor: '#a855f7',
    status: 'ACTIVE // BLACK PANTHER OPERATIONAL',
    description: 'A flexible, skin-tight vibranium suit housed inside a tooth necklace. Built from nanoscopic vibranium threads that absorb incoming kinetic impacts and store the energy for redistributive concussive radial blasts.',
    capabilities: [
      'Kinetic energy storage and purple concussive release',
      'Completely bulletproof and blast-resistant',
      'Retractable claws made of anti-metal vibranium alloy',
      'Silent sound-dampening footwear',
    ],
    limitations: 'Sonic frequencies from high-speed maglev tracks can disrupt vibranium stabilization.',
    appearances: ['Black Panther', 'Avengers: Infinity War', 'Avengers: Endgame', 'Wakanda Forever'],
  },
  {
    id: 't6',
    name: 'Kimoyo Beads & Remote Driving Tech',
    creator: 'Wakandan Design Group / Shuri',
    category: 'wakanda',
    era: '2018 (Black Panther)',
    accentColor: '#c084fc',
    status: 'ACTIVE & DISTRIBUTED',
    description: 'Personal multi-purpose handheld or wrist-worn communication and diagnostic beads forged from prime vibranium ore. Includes holographic projectors, medical stabilization fields, and real-time kinetic piloting interfaces.',
    capabilities: [
      'Photorealistic 3D volumetric communications holograms',
      'Emergency medical stabilization for spinal injuries',
      'Full simulated piloting of aircraft and cars thousands of miles away',
    ],
    limitations: 'Dependent on satellite or local encrypted Wakandan communications relays.',
    appearances: ['Captain America: Civil War', 'Black Panther', 'Avengers: Infinity War', 'Wakanda Forever'],
  },
  {
    id: 't7',
    name: 'Pym Particles',
    creator: 'Dr. Hank Pym',
    category: 'pym',
    era: '1960s – Present',
    accentColor: '#eab308',
    status: 'CLASSIFIED RESTRICTED COMPOUND',
    description: 'Subatomic particles capable of altering the distance between atoms while increasing density and mass. Enabled the Ant-Man suit to shrink to insect scale or expand into Giant-Man, and served as the foundational fuel for the Avengers\' Time Heist through the Quantum Realm.',
    capabilities: [
      'Compression to microscopic or subatomic Quantum Realm scales',
      'Expansion into 65-foot Giant-Man with proportional kinetic mass',
      'Enables navigation through non-linear time in the Quantum Realm',
    ],
    limitations: 'Extremely scarce and volatile; exposure without protective helmet leads to cognitive instability.',
    appearances: ['Ant-Man', 'Captain America: Civil War', 'Ant-Man and the Wasp', 'Avengers: Endgame', 'Quantumania'],
  },
  {
    id: 't8',
    name: 'Quantum Time-GPS & Quantum Tunnel',
    creator: 'Tony Stark, Bruce Banner, Rocket & Hank Pym',
    category: 'pym',
    era: '2023 (Avengers: Endgame)',
    accentColor: '#10b981',
    status: 'ACTIVE // SECURED ARCHIVE',
    description: 'A wrist-mounted Möbius strip temporal positioning device designed by Tony Stark in 2023. Combined with a miniaturized quantum tunnel van or complex hangar platform, it prevented chronal displacement and safely returned time travelers to their exact anchor coordinates.',
    capabilities: [
      'Precision coordinate navigation across multiple historical timelines',
      'Prevents biological aging or reversal during chronal travel',
      'Automated synchronized recall to base reality',
    ],
    limitations: 'Requires Pym Particles for round-trip jumps; navigation fails if temporal anchor is severed.',
    appearances: ['Avengers: Endgame'],
  },
  {
    id: 't9',
    name: 'The Benatar (M-Ship Class Craft)',
    creator: 'Guardians of the Galaxy / Xandar Engineering',
    category: 'cosmic',
    era: '2018 – 2023',
    accentColor: '#f97316',
    status: 'OPERATIONAL // GUARDIANS FLEET',
    description: 'The successor to the Milano. An agile starship equipped with hyperdrive jump capabilities, inertial dampeners, tractor beams, and heavy energy cannons capable of deep-space long-range exploration.',
    capabilities: [
      'Universal Jump Point network navigation',
      'Atmospheric re-entry and deep space life support',
      'Heavy dual repulsor and plasma beam turrets',
    ],
    limitations: 'Fuel lines can freeze during deep space drift if jump drive coils take damage.',
    appearances: ['Avengers: Infinity War', 'Avengers: Endgame', 'Thor: Love and Thunder', 'Guardians of the Galaxy Vol. 3'],
  },
];

export default function TechnologyArchivePage() {
  const router = useRouter();
  const [selectedTech, setSelectedTech] = useState<TechItem>(techArchive[0]);
  const [viewMode, setViewMode] = useState<'hud' | 'panoramic'>('hud');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const categories = useMemo(() => {
    return [
      { id: 'all', label: 'ALL INVENTIONS' },
      { id: 'iron-man', label: 'STARK R&D' },
      { id: 'wakanda', label: 'WAKANDA DESIGN' },
      { id: 'pym', label: 'PYM & QUANTUM' },
      { id: 'ai', label: 'A.I. SYSTEMS' },
      { id: 'cosmic', label: 'COSMIC CRAFT' },
    ];
  }, []);

  const filteredTech = useMemo(() => {
    return techArchive.filter((t) => {
      const q = search.toLowerCase();
      const matchesSearch =
        t.name.toLowerCase().includes(q) ||
        t.creator.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.capabilities.some((c) => c.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === 'all' || t.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);

  const handleSelect = (t: TechItem) => {
    if (t.id === selectedTech.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedTech(t);
      setIsTransitioning(false);
    }, 120);
  };

  const accent = selectedTech.accentColor || '#38bdf8';
  const imgUrl = selectedTech.imageUrl || `/images/technology/${selectedTech.id}.png`;

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
            <span className="count" style={{ color: accent }}>{techArchive.length} BLUEPRINTS</span>
            <span className="sep">•</span>
            <span className="sub">STARK & WAKANDA R&D VAULT</span>
          </div>
          <div className="vault-subcode">S.H.I.E.L.D. R&D ENGINEERING // LEVEL 9 BLUEPRINT CLEARANCE</div>
        </div>

        <div className="vault-header-right">
          <button
            onClick={() => setViewMode(viewMode === 'hud' ? 'panoramic' : 'hud')}
            className="hud-mode-toggle-btn"
          >
            <LayoutGrid size={14} style={{ color: accent }} />
            <span>{viewMode === 'hud' ? 'SWITCH TO PANORAMIC BLUEPRINTS' : 'SWITCH TO TACTICAL HUD'}</span>
          </button>
        </div>
      </header>

      {/* ==================== VIEW MODE 1: TACTICAL HUD ==================== */}
      {viewMode === 'hud' && (
        <main className={`tactical-hud-body ${isTransitioning ? 'switching' : ''}`}>
          {/* LEFT TELEMETRY & INTEL */}
          <section className="tactical-left-intel">
            <div className="classification-tag" style={{ borderColor: accent, color: accent }}>
              {selectedTech.category.toUpperCase()} // {selectedTech.era.toUpperCase()}
            </div>

            <h1 className="tactical-title" style={{ color: accent }}>
              {selectedTech.name.toUpperCase()}
            </h1>

            {/* STATUS & ANGLE POINTER LINE */}
            <div className="tactical-status-cluster">
              <div className="status-label-group">
                <span className="status-kicker">STATUS:</span>
                <span className={`status-badge ${selectedTech.status?.toLowerCase().includes('decommissioned') || selectedTech.status?.toLowerCase().includes('discharged') ? 'status-destroyed' : 'status-active'}`}>
                  {selectedTech.status ? selectedTech.status.split(' ')[0] : 'OPERATIONAL'}
                </span>
                <span className="status-sub-tag">{selectedTech.status || 'ACTIVE SYSTEM'}</span>
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

            {/* CREATOR & ERA BLOCK */}
            <div className="tactical-data-block">
              <span className="data-kicker">INVENTOR & ARCHITECT:</span>
              <div className="data-primary-val">{selectedTech.creator}</div>
              <div className="data-secondary-val">DEVELOPMENT ERA: {selectedTech.era}</div>
            </div>

            {/* PRIMARY CAPABILITIES */}
            <div className="tactical-powers-summary">
              <span className="data-kicker">ENGINEERING CAPABILITIES:</span>
              <ul className="capabilities-bullets">
                {selectedTech.capabilities.slice(0, 3).map((cap, idx) => (
                  <li key={idx} className="capability-item">
                    <span className="bullet-dot" style={{ background: accent }} />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* LIMITATIONS */}
            <div className="tactical-limitations-preview">
              <span className="data-kicker text-red">KNOWN VULNERABILITY / LIMITATION:</span>
              <p className="limitations-text">{selectedTech.limitations}</p>
            </div>

            {/* ACTION BUTTON -> OPENS STAGE 3 DOSSIER */}
            <div className="tactical-action-row">
              <button
                onClick={() => setShowDetailModal(true)}
                className="tactical-open-dossier-btn"
                style={{ borderColor: accent, color: accent }}
              >
                <span>OPEN FULL BLUEPRINT DOSSIER</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </section>

          {/* RIGHT VISUAL VIEWPORT */}
          <section className="tactical-right-viewport">
            {/* Top-Right Appearances box */}
            <div className="viewport-appearances-box">
              <span className="appearances-kicker">DEPLOYED IN MCU OPERATIONS:</span>
              <div className="appearances-list-text">
                {selectedTech.appearances.join(' • ').toUpperCase()}
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
              <div
                className="visual-object-wrapper"
                onClick={() => setShowDetailModal(true)}
                title="Inspect in full blueprint dossier"
              >
                <img
                  src={imgUrl}
                  alt={selectedTech.name}
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
                  <Cpu size={64} style={{ color: accent }} className="holo-icon" />
                  <div className="holo-tag" style={{ color: accent }}>{selectedTech.name.toUpperCase()}</div>
                  <div className="holo-sub">{selectedTech.category.toUpperCase()} SCHEMATIC</div>
                </div>
              </div>

              {/* Viewport Floating Telemetry */}
              <div className="viewport-telemetry-badge" style={{ color: accent }}>
                <span className="reticle-symbol">▲</span>
                <span>BLUEPRINT SENSORS: NANOTECH FREQUENCY SYNCHRONIZED // SCHEMATIC ACTIVE</span>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ==================== VIEW MODE 2: PANORAMIC BLUEPRINTS ==================== */}
      {viewMode === 'panoramic' && (
        <main className="panoramic-shelf-body">
          <div className="panoramic-shelf-header">
            <span className="shelf-kicker">ADVANCED ENGINEERING SCHEMATICS // CLASSIFIED 007-TECH</span>
            <h1 className="panoramic-title">THE ADVANCED TECHNOLOGY & BLUEPRINTS VAULT</h1>
            <p className="panoramic-subtitle">
              Classified engineering schematics, Stark Industries armors, Wakandan vibranium breakthroughs, Pym Particle temporal systems, and cosmic spacecraft.
            </p>

            {/* Filter controls */}
            <div className="panoramic-controls-row">
              <div className="search-pill-box">
                <Search size={14} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search blueprints by name, creator, or capabilities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-pill-input"
                />
              </div>

              <div className="category-chips">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`cat-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="panoramic-grid">
            {filteredTech.map((item) => {
              const itemAccent = item.accentColor || '#38bdf8';
              const itemImg = item.imageUrl || `/images/technology/${item.id}.png`;
              return (
                <div
                  key={item.id}
                  className="panoramic-card"
                  onClick={() => {
                    setSelectedTech(item);
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
                      <Cpu size={32} style={{ color: itemAccent }} />
                    </div>
                  </div>

                  <div className="panoramic-card-info">
                    <div className="panoramic-cat-tag" style={{ color: itemAccent }}>{item.category.toUpperCase()}</div>
                    <div className="panoramic-card-name">{item.name}</div>
                    <div className="panoramic-card-origin">BY {item.creator} ({item.era})</div>
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
          {techArchive.map((t) => {
            const tAccent = t.accentColor || '#38bdf8';
            const isActive = t.id === selectedTech.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t)}
                className={`stone-tab-pill ${isActive ? 'active' : ''}`}
                style={{
                  borderColor: isActive ? tAccent : 'rgba(255, 255, 255, 0.08)',
                  background: isActive ? 'rgba(255, 255, 255, 0.06)' : 'rgba(10, 14, 20, 0.6)',
                }}
              >
                <span
                  className="stone-tab-indicator"
                  style={{
                    background: tAccent,
                    boxShadow: isActive ? `0 0 10px ${tAccent}` : 'none',
                  }}
                />
                <span className="stone-tab-label" style={{ color: isActive ? '#ffffff' : '#94a3b8' }}>
                  {t.name.split(' (')[0].split(' - ')[0]}
                </span>
                <span className="stone-tab-vessel" style={{ color: isActive ? tAccent : '#64748b' }}>
                  {t.creator.split(' (')[0].split(' & ')[0].toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ==================== STAGE 3: FULL BLUEPRINT DOSSIER MODAL ==================== */}
      {showDetailModal && (
        <div className="blueprint-modal-backdrop" onClick={() => setShowDetailModal(false)}>
          <div className="blueprint-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Top Navigation */}
            <div className="modal-top-bar">
              <div className="modal-breadcrumbs">
                <span>S.H.I.E.L.D. R&D</span>
                <span className="sep">/</span>
                <span>BLUEPRINTS</span>
                <span className="sep">/</span>
                <span style={{ color: accent }}>{selectedTech.name.toUpperCase()}</span>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="modal-close-btn"
                aria-label="Close dossier"
              >
                <X size={18} />
              </button>
            </div>

            {/* Header */}
            <header className="modal-header">
              <span className="modal-classification-badge" style={{ borderColor: accent, color: accent }}>
                {selectedTech.category.toUpperCase()} // LEVEL 9 BLUEPRINT
              </span>
              <h2 className="modal-title">{selectedTech.name.toUpperCase()}</h2>
              <div className="modal-creator-meta">
                <span>INVENTED BY <strong>{selectedTech.creator.toUpperCase()}</strong></span>
                <span className="dot">•</span>
                <span>DEPLOYED: <strong>{selectedTech.era}</strong></span>
              </div>
            </header>

            {/* 2-Column Body Layout matching Stage 3 Diagram */}
            <div className="modal-grid-body">
              {/* Left Column: Visual Object & Spec Box */}
              <div className="modal-left-col">
                <div className="modal-image-card">
                  <div className="reticle-corner reticle-tl" style={{ borderColor: accent }} />
                  <div className="reticle-corner reticle-tr" style={{ borderColor: accent }} />
                  <div className="reticle-corner reticle-bl" style={{ borderColor: accent }} />
                  <div className="reticle-corner reticle-br" style={{ borderColor: accent }} />

                  <img
                    src={imgUrl}
                    alt={selectedTech.name}
                    className="modal-object-img"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      const fallback = (e.target as HTMLElement).nextElementSibling;
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }}
                  />
                  <div className="modal-object-fallback" style={{ display: 'none' }}>
                    <Cpu size={72} style={{ color: accent }} />
                    <span style={{ color: accent, fontSize: '0.8rem', marginTop: '1rem', letterSpacing: '0.1em' }}>
                      {selectedTech.name.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="modal-telemetry-box">
                  <div className="tele-row">
                    <span className="tele-kicker">STATUS:</span>
                    <span className="tele-val" style={{ color: accent }}>{selectedTech.status || 'OPERATIONAL'}</span>
                  </div>
                  <div className="tele-row">
                    <span className="tele-kicker">CLASSIFICATION:</span>
                    <span className="tele-val">{selectedTech.category.toUpperCase()} ENGINEERING</span>
                  </div>
                  <div className="tele-row">
                    <span className="tele-kicker">ERA:</span>
                    <span className="tele-val">{selectedTech.era}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Capabilities, Description, Limitations, Appearances */}
              <div className="modal-right-col">
                <div className="modal-section-card">
                  <h3 className="section-title">
                    <Zap size={16} style={{ color: accent }} />
                    <span>SYSTEM SPECIFICATION & ARCHITECTURE</span>
                  </h3>
                  <p className="modal-desc-p">{selectedTech.description}</p>
                </div>

                <div className="modal-section-card">
                  <h3 className="section-title">
                    <Shield size={16} style={{ color: accent }} />
                    <span>DOCUMENTED TECHNICAL CAPABILITIES</span>
                  </h3>
                  <ul className="modal-capabilities-list">
                    {selectedTech.capabilities.map((c, i) => (
                      <li key={i} className="modal-cap-item">
                        <span className="bullet-dot" style={{ background: accent }} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section-card modal-limitations-card">
                  <h3 className="section-title text-red">
                    <Sparkles size={16} />
                    <span>ENGINEERING LIMITATION & VULNERABILITY</span>
                  </h3>
                  <p className="modal-limitations-text">{selectedTech.limitations}</p>
                </div>

                <div className="modal-section-card">
                  <h3 className="section-title">
                    <Compass size={16} style={{ color: accent }} />
                    <span>MCU CANONICAL APPEARANCES</span>
                  </h3>
                  <div className="modal-appearances-pills">
                    {selectedTech.appearances.map((app, i) => (
                      <span key={i} className="appearance-tag-pill">{app}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== GLOBAL STYLES ==================== */}
      <style jsx>{`
        .vault-screen {
          position: fixed;
          top: var(--nav-height);
          right: var(--dock-gutter);
          bottom: 0;
          left: var(--dock-gutter);
          background: #000000;
          color: #e2e8f0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          z-index: 10;
        }

        .vault-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15) 0px,
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 3px
          );
          pointer-events: none;
          z-index: 2;
        }

        /* HEADER */
        .vault-header {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(6, 9, 14, 0.85);
          backdrop-filter: blur(12px);
        }

        .vault-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Orbitron', monospace, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
        }

        .vault-breadcrumbs .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }

        .vault-breadcrumbs .brand {
          font-weight: 700;
          color: #ffffff;
        }

        .vault-breadcrumbs .sep {
          color: #475569;
        }

        .vault-breadcrumbs .sub {
          color: #94a3b8;
        }

        .vault-subcode {
          font-family: 'Space Mono', monospace, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          color: #64748b;
          margin-top: 0.25rem;
        }

        .hud-mode-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #cbd5e1;
          font-family: 'Orbitron', monospace, sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          padding: 0.5rem 0.85rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hud-mode-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        /* TACTICAL HUD BODY */
        .tactical-hud-body {
          position: relative;
          z-index: 3;
          flex: 1;
          display: grid;
          grid-template-columns: 460px 1fr;
          gap: 2rem;
          padding: 1.5rem 2.5rem 6.5rem 2.5rem;
          overflow: hidden;
          transition: opacity 0.15s ease;
        }

        .tactical-hud-body.switching {
          opacity: 0.2;
        }

        /* LEFT INTEL */
        .tactical-left-intel {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.1rem;
          max-width: 460px;
        }

        .classification-tag {
          align-self: flex-start;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          padding: 0.25rem 0.6rem;
          border: 1px solid;
          background: rgba(255, 255, 255, 0.02);
          text-transform: uppercase;
        }

        .tactical-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 2.1rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          line-height: 1.15;
          margin: 0;
          text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
        }

        .tactical-status-cluster {
          position: relative;
          padding-top: 0.25rem;
        }

        .status-label-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'Orbitron', monospace;
        }

        .status-kicker {
          font-size: 0.7rem;
          color: #64748b;
          letter-spacing: 0.1em;
        }

        .status-badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 2px;
          letter-spacing: 0.12em;
        }

        .status-active {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.35);
        }

        .status-destroyed {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.35);
        }

        .status-sub-tag {
          font-size: 0.65rem;
          color: #94a3b8;
          font-family: 'Space Mono', monospace;
        }

        .hud-angled-pointer-wrapper {
          margin-top: 0.35rem;
          width: 320px;
          height: 35px;
        }

        .hud-pointer-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .tactical-data-block {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 0.75rem 1rem;
          border-left: 2px solid #38bdf8;
        }

        .data-kicker {
          display: block;
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          color: #94a3b8;
          margin-bottom: 0.25rem;
        }

        .data-primary-val {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.95rem;
          color: #f1f5f9;
          font-weight: 600;
        }

        .data-secondary-val {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          color: #64748b;
          margin-top: 0.2rem;
        }

        .capabilities-bullets {
          list-style: none;
          padding: 0;
          margin: 0.5rem 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .capability-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #cbd5e1;
          line-height: 1.4;
        }

        .bullet-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          margin-top: 0.35rem;
          flex-shrink: 0;
        }

        .tactical-limitations-preview {
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 0.6rem 0.85rem;
        }

        .limitations-text {
          font-size: 0.75rem;
          color: #fca5a5;
          line-height: 1.4;
          margin: 0.25rem 0 0 0;
        }

        .tactical-action-row {
          margin-top: 0.25rem;
        }

        .tactical-open-dossier-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid;
          padding: 0.65rem 1.25rem;
          font-family: 'Orbitron', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-decoration: none;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tactical-open-dossier-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(4px);
        }

        /* RIGHT VIEWPORT */
        .tactical-right-viewport {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .viewport-appearances-box {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          max-width: 380px;
          text-align: right;
          z-index: 4;
        }

        .appearances-kicker {
          display: block;
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          color: #64748b;
          margin-bottom: 0.25rem;
        }

        .appearances-list-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          color: #94a3b8;
          line-height: 1.4;
        }

        .tactical-canvas-frame {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2rem 1rem 1rem 1rem;
          border: 1px dashed rgba(255, 255, 255, 0.06);
          background: radial-gradient(circle at center, rgba(30, 41, 59, 0.18) 0%, rgba(6, 9, 14, 0.8) 70%);
        }

        /* Reticle corners */
        .reticle-corner {
          position: absolute;
          width: 18px;
          height: 18px;
          border: 2px solid;
          pointer-events: none;
        }
        .reticle-tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
        .reticle-tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
        .reticle-bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
        .reticle-br { bottom: -1px; right: -1px; border-left: none; border-top: none; }

        .visual-object-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .floating-png-object {
          max-height: 70%;
          max-width: 75%;
          object-fit: contain;
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.7));
          animation: floatLevitate 5s ease-in-out infinite;
          transition: transform 0.3s ease;
        }

        .floating-png-object:hover {
          transform: scale(1.04);
        }

        @keyframes floatLevitate {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        .holographic-fallback {
          position: relative;
          width: 240px;
          height: 240px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px dashed;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          animation: pulseHolo 4s ease-in-out infinite;
        }

        .hologram-rings {
          position: absolute;
          inset: -15px;
          pointer-events: none;
        }

        .holo-ring {
          position: absolute;
          inset: 0;
          border: 1px solid;
          border-radius: 50%;
          opacity: 0.3;
        }

        .holo-ring-1 {
          animation: spinSlow 16s linear infinite;
        }

        .holo-ring-2 {
          inset: 10px;
          border-style: dashed;
          animation: spinReverse 22s linear infinite;
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes pulseHolo {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }

        .holo-tag {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          margin-top: 0.8rem;
          letter-spacing: 0.1em;
          text-align: center;
          max-width: 80%;
        }

        .holo-sub {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: #64748b;
          margin-top: 0.2rem;
          letter-spacing: 0.15em;
        }

        .viewport-telemetry-badge {
          position: absolute;
          bottom: 0.75rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          background: rgba(6, 9, 14, 0.7);
          padding: 0.3rem 0.6rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* PANORAMIC SHELF VIEW */
        .panoramic-shelf-body {
          position: relative;
          z-index: 3;
          flex: 1;
          padding: 2rem 3rem 6.5rem 3rem;
          overflow-y: auto;
        }

        .panoramic-shelf-header {
          margin-bottom: 2rem;
          max-width: 900px;
        }

        .shelf-kicker {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: #38bdf8;
        }

        .panoramic-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0.4rem 0 0.5rem 0;
          letter-spacing: 0.05em;
        }

        .panoramic-subtitle {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .panoramic-controls-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .search-pill-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.45rem 0.85rem;
          border-radius: 20px;
          min-width: 280px;
        }

        .search-pill-input {
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 0.8rem;
          width: 100%;
        }

        .category-chips {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .cat-chip {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          font-family: 'Orbitron', monospace;
          font-size: 0.65rem;
          padding: 0.4rem 0.75rem;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cat-chip.active {
          background: #38bdf8;
          border-color: #38bdf8;
          color: #06090e;
          font-weight: 700;
        }

        .panoramic-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .panoramic-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .panoramic-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.25) !important;
          background: rgba(30, 41, 59, 0.5);
        }

        .panoramic-card-thumb {
          position: relative;
          height: 180px;
          background: radial-gradient(circle at center, rgba(30, 41, 59, 0.4) 0%, rgba(6, 9, 14, 0.9) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .panoramic-thumb-img {
          max-height: 80%;
          max-width: 80%;
          object-fit: contain;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.6));
        }

        .panoramic-thumb-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .panoramic-card-info {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .panoramic-cat-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        .panoramic-card-name {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
        }

        .panoramic-card-origin {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          color: #64748b;
          margin-top: 0.25rem;
        }

        .panoramic-card-action {
          font-family: 'Orbitron', monospace;
          font-size: 0.65rem;
          font-weight: 700;
          margin-top: 0.6rem;
          letter-spacing: 0.1em;
        }

        /* BOTTOM HORIZONTAL SWITCHER BAR */
        .vault-bottom-switcher-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 6;
          height: 72px;
          background: rgba(6, 9, 14, 0.92);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
        }

        .switcher-tabs-scroll {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          overflow-x: auto;
          width: 100%;
          padding: 0.5rem 0;
        }

        .switcher-tabs-scroll::-webkit-scrollbar {
          height: 3px;
        }

        .switcher-tabs-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 2px;
        }

        .stone-tab-pill {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.9rem;
          border-radius: 4px;
          border: 1px solid;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .stone-tab-pill:hover {
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .stone-tab-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .stone-tab-label {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .stone-tab-vessel {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
        }

        /* ==================== STAGE 3: BLUEPRINT DOSSIER MODAL ==================== */
        .blueprint-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(2, 6, 12, 0.85);
          backdrop-filter: blur(12px);
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.2s ease;
        }

        .blueprint-modal-container {
          background: #090d14;
          border: 1px solid rgba(255, 255, 255, 0.12);
          width: 100%;
          max-width: 1100px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
          display: flex;
          flex-direction: column;
        }

        .modal-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .modal-breadcrumbs {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .modal-close-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #cbd5e1;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 3px;
          transition: all 0.15s ease;
        }

        .modal-close-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
          color: #ffffff;
        }

        .modal-header {
          padding: 1.5rem 2rem 1rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .modal-classification-badge {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          padding: 0.2rem 0.55rem;
          border: 1px solid;
          margin-bottom: 0.5rem;
        }

        .modal-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.85rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.05em;
        }

        .modal-creator-meta {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 0.4rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .modal-grid-body {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 2rem;
          padding: 1.75rem 2rem;
        }

        .modal-image-card {
          position: relative;
          height: 300px;
          background: radial-gradient(circle at center, rgba(30, 41, 59, 0.3) 0%, rgba(6, 9, 14, 0.9) 100%);
          border: 1px dashed rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .modal-object-img {
          max-height: 80%;
          max-width: 80%;
          object-fit: contain;
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.8));
        }

        .modal-object-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .modal-telemetry-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tele-row {
          display: flex;
          justify-content: space-between;
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
        }

        .tele-kicker {
          color: #64748b;
        }

        .tele-val {
          color: #f1f5f9;
          font-weight: 600;
        }

        .modal-section-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .section-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 0 0.75rem 0;
        }

        .modal-desc-p {
          font-size: 0.85rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0;
        }

        .modal-capabilities-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .modal-cap-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.8rem;
          color: #cbd5e1;
          line-height: 1.45;
        }

        .modal-limitations-card {
          background: rgba(239, 68, 68, 0.06);
          border-color: rgba(239, 68, 68, 0.2);
        }

        .modal-limitations-text {
          font-size: 0.8rem;
          color: #fca5a5;
          line-height: 1.5;
          margin: 0;
        }

        .modal-appearances-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .appearance-tag-pill {
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          padding: 0.3rem 0.65rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #cbd5e1;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 1024px) {
          .tactical-hud-body {
            grid-template-columns: 1fr;
            overflow-y: auto;
          }
          .modal-grid-body {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
