// @ts-nocheck
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Shield, Users, Compass, Search, ArrowRight, LayoutGrid, Award } from 'lucide-react';

interface TeamItem {
  id: string;
  name: string;
  type: 'Heroic Coalition' | 'Intelligence Agency' | 'Subversive / Terrorist' | 'Cosmic Guardians' | 'Mystical Order' | 'Temporal Bureau';
  headquarters: string;
  leaders: string[];
  notableMembers: string[];
  firstAppearance: string;
  status: 'Active' | 'Defunct' | 'Reorganized' | 'Unknown';
  description: string;
  keyOperations: string[];
  imageUrl?: string;
  accentColor?: string;
}

const teamsDatabase: TeamItem[] = [
  {
    id: 'team1',
    name: 'The Avengers',
    type: 'Heroic Coalition',
    headquarters: 'Stark Tower / Avengers Compound, Upstate New York',
    leaders: ['Tony Stark (Iron Man)', 'Steve Rogers (Captain America)'],
    notableMembers: ['Thor', 'Hulk', 'Black Widow', 'Hawkeye', 'Scarlet Witch', 'Vision', 'Falcon', 'War Machine', 'Spider-Man'],
    firstAppearance: 'The Avengers (2012)',
    status: 'Reorganized',
    description: 'An extraordinary collective of remarkable individuals assembled under Nick Fury\'s Avengers Initiative to fight the battles that humanity never could. From the Battle of New York through the catastrophic defeat of Thanos in the Battle of Earth, the Avengers stood as the definitive shield of the cosmos.',
    keyOperations: [
      'Battle of New York (Repelling the Chitauri Invasion)',
      'Battle of Sokovia (Defeat of Ultron and city evacuation)',
      'Battle of Wakanda & Battle of Titan (Defense against Thanos\'s Black Order)',
      'The Time Heist & Battle of Earth (Restoration of half all universal life and final defeat of 2014 Thanos)',
    ],
    accentColor: '#38bdf8',
  },
  {
    id: 'team2',
    name: 'Guardians of the Galaxy',
    type: 'Cosmic Guardians',
    headquarters: 'The Milano / The Benatar / Knowhere',
    leaders: ['Peter Quill (Star-Lord)', 'Rocket Raccoon (current)'],
    notableMembers: ['Gamora', 'Drax the Destroyer', 'Groot', 'Mantis', 'Nebula', 'Cosmo the Spacedog', 'Adam Warlock'],
    firstAppearance: 'Guardians of the Galaxy (2014)',
    status: 'Active',
    description: 'A motley crew of cosmic outlaws, assassins, and ex-convicts who united in the Kyln prison to prevent Ronan the Accuser from using the Power Stone to incinerate planet Xandar. They evolved into the foremost guardians of the Andromeda galaxy and established their headquarters on Knowhere.',
    keyOperations: [
      'Battle of Xandar (Destruction of the Dark Aster & collective Power Stone wielding)',
      'Defeat of Ego the Living Planet',
      'Assault on the High Evolutionary\'s Counter-Earth flagship and rescue of laboratory species',
    ],
    accentColor: '#f59e0b',
  },
  {
    id: 'team3',
    name: 'S.H.I.E.L.D.',
    type: 'Intelligence Agency',
    headquarters: 'The Triskelion, Washington D.C. / The Helicarrier',
    leaders: ['Peggy Carter & Howard Stark (Founders)', 'Nick Fury (Director)', 'Phil Coulson'],
    notableMembers: ['Natasha Romanoff', 'Clint Barton', 'Maria Hill', 'Leo Fitz', 'Jemma Simmons', 'Melinda May'],
    firstAppearance: 'Iron Man (2008)',
    status: 'Defunct',
    description: 'The Strategic Homeland Intervention, Enforcement and Logistics Division. Co-founded in the wake of WWII by Peggy Carter, Howard Stark, and Chester Phillips to protect Earth from conventional and extraterrestrial threats. Infiltrated from its inception by HYDRA and officially collapsed in 2014.',
    keyOperations: [
      'Project P.E.G.A.S.U.S. (Tesseract harness research)',
      'The Avengers Initiative conceptualization and activation',
      'Project Insight (Prevented from executing global automated preemptive executions)',
    ],
    accentColor: '#64748b',
  },
  {
    id: 'team4',
    name: 'HYDRA',
    type: 'Subversive / Terrorist',
    headquarters: 'Global decentralized secret cells (Sokovia, Washington D.C., Siberia)',
    leaders: ['Johann Schmidt (Red Skull)', 'Arnim Zola', 'Alexander Pierce', 'Baron Wolfgang von Strucker'],
    notableMembers: ['Winter Soldier (Brainwashed)', 'Crossbones (Brock Rumlow)', 'Dr. List'],
    firstAppearance: 'Captain America: The First Avenger (2011)',
    status: 'Defunct',
    description: 'An ancient authoritarian syndicate rooted in occult mastery and total subjugation. Commanded by the Red Skull in WWII using Tesseract energy, HYDRA secretly grew inside S.H.I.E.L.D. like a parasite under Operation Paperclip, using the Winter Soldier to eliminate historical dissidents for 70 years.',
    keyOperations: [
      'Assassination of Howard and Maria Stark (1991)',
      'Weaponization of the Mind Stone to create enhanced twins Wanda and Pietro Maximoff',
      'Attempted launch of Project Insight Helicarriers to assassinate 20 million citizens',
    ],
    accentColor: '#ef4444',
  },
  {
    id: 'team5',
    name: 'Dora Milaje & The Royal Guard',
    type: 'Heroic Coalition',
    headquarters: 'Birnin Zana, Wakanda',
    leaders: ['General Okoye', 'Ayo'],
    notableMembers: ['Aneka', 'Nomble', 'Yama'],
    firstAppearance: 'Captain America: Civil War (2016)',
    status: 'Active',
    description: 'The elite all-female royal security force and special forces regiment of the Kingdom of Wakanda. Armed with sonic vibranium spears and unmatched martial mastery, the Dora Milaje serve as personal bodyguards to the Black Panther and the ultimate protectors of Wakanda\'s borders.',
    keyOperations: [
      'Battle of Mount Bashenga (Defeating Killmonger\'s coup)',
      'Battle of Wakanda (Frontline vanguard against Outrider hordes in Infinity War)',
      'Battle of Earth (Charge through Doctor Strange\'s portals against Thanos\'s armada)',
      'Defense of Wakanda against Namor\'s Talokan warriors',
    ],
    accentColor: '#eab308',
  },
  {
    id: 'team6',
    name: 'Masters of the Mystic Arts',
    type: 'Mystical Order',
    headquarters: 'Kamar-Taj, Nepal (Sanctums: New York, London, Hong Kong)',
    leaders: ['The Ancient One', 'Doctor Stephen Strange', 'Wong (Sorcerer Supreme)'],
    notableMembers: ['Karl Mordo (formerly)', 'Kaecilius (rogue)', 'Rintrah'],
    firstAppearance: 'Doctor Strange (2016)',
    status: 'Active',
    description: 'A millennium-old secret fellowship of sorcerers dedicated to shielding reality from interdimensional eldritch entities and dark magical incursions. They maintain three global Sanctums aligned with Earth\'s planetary geomantic grid.',
    keyOperations: [
      'Containment of Dormammu and the Dark Dimension',
      'Protection of the Time Stone for generations in the Eye of Agamotto',
      'Defense of Kamar-Taj against the corrupted Scarlet Witch',
    ],
    accentColor: '#10b981',
  },
  {
    id: 'team7',
    name: 'Time Variance Authority (TVA)',
    type: 'Temporal Bureau',
    headquarters: 'The TVA Citadel, Outside Normal Space-Time',
    leaders: ['He Who Remains (Creator)', 'Hunter B-15 & Mobius M. Mobius (New Era)', 'Loki (God of Stories)'],
    notableMembers: ['Casey / Frank', 'Ouroboros (O.B.)', 'Judge Ravonna Renslayer', 'Miss Minutes'],
    firstAppearance: 'Loki Season 1 (2021)',
    status: 'Active',
    description: 'A vast bureaucratic empire located outside space and time, founded by He Who Remains following the Multiversal War. The TVA prunes unauthorized timeline branches. Following the destruction of the Temporal Loom, Loki sacrificed his freedom to physically sustain all branching multiverse timelines.',
    keyOperations: [
      'Millennia of Sacred Timeline pruning and temporal reset deployment',
      'The hunt for Sylvie Laufeydottir',
      'Reconstruction into a defense bureau monitoring Kang Variants across the multiverse',
    ],
    accentColor: '#f97316',
  },
  {
    id: 'team8',
    name: 'The Illuminati (Earth-838)',
    type: 'Heroic Coalition',
    headquarters: 'Illuminati Headquarters, Earth-838',
    leaders: ['Professor Charles Xavier', 'Reed Richards (Mister Fantastic)'],
    notableMembers: ['Captain Carter', 'Blackagar Boltagon (Black Bolt)', 'Captain Marvel (Maria Rambeau)', 'Baron Mordo'],
    firstAppearance: 'Doctor Strange in the Multiverse of Madness (2022)',
    status: 'Defunct',
    description: 'The supreme governing superhero council of Earth-838, secretly steering geopolitical and cosmic crises. Having defeated their own Thanos using the Book of Vishanti, they judged interdimensional travelers before being systematically eliminated by the dreamwalking Earth-616 Scarlet Witch.',
    keyOperations: [
      'Execution of Earth-838 Stephen Strange after his Darkhold corruption',
      'Interrogation and containment of Earth-616 Stephen Strange and America Chavez',
      'Fatal defense of Illuminati Chambers against the Wanda Maximoff incursion',
    ],
    accentColor: '#a855f7',
  },
];

export default function TeamsArchivePage() {
  const [selectedTeam, setSelectedTeam] = useState<TeamItem>(teamsDatabase[0]);
  const [viewMode, setViewMode] = useState<'hud' | 'panoramic'>('hud');
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const types = useMemo(() => {
    return ['all', ...Array.from(new Set(teamsDatabase.map((t) => t.type)))];
  }, []);

  const filteredTeams = useMemo(() => {
    return teamsDatabase.filter((t) => {
      const q = search.toLowerCase();
      const matchesSearch =
        t.name.toLowerCase().includes(q) ||
        t.headquarters.toLowerCase().includes(q) ||
        t.leaders.some((l) => l.toLowerCase().includes(q)) ||
        t.notableMembers.some((m) => m.toLowerCase().includes(q));

      const matchesType =
        selectedType === 'all' || t.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [search, selectedType]);

  const handleSelect = (t: TeamItem) => {
    if (t.id === selectedTeam.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedTeam(t);
      setIsTransitioning(false);
    }, 120);
  };

  const accent = selectedTeam.accentColor || '#38bdf8';
  const imgUrl = selectedTeam.imageUrl || `/images/teams/${selectedTeam.id}.png`;

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
            <span className="count" style={{ color: accent }}>{teamsDatabase.length} COALITIONS</span>
            <span className="sep">•</span>
            <span className="sub">TEAMS & ORGANIZATIONS DOSSIER</span>
          </div>
          <div className="vault-subcode">GLOBAL SECURITY CLEARANCE // S.H.I.E.L.D. COALITION DATABASE</div>
        </div>

        <div className="vault-header-right">
          <button
            onClick={() => setViewMode(viewMode === 'hud' ? 'panoramic' : 'hud')}
            className="hud-mode-toggle-btn"
          >
            <LayoutGrid size={14} style={{ color: accent }} />
            <span>{viewMode === 'hud' ? 'SWITCH TO PANORAMIC HEADQUARTERS' : 'SWITCH TO TACTICAL HUD'}</span>
          </button>
        </div>
      </header>

      {/* ==================== VIEW MODE 1: TACTICAL HUD ==================== */}
      {viewMode === 'hud' && (
        <main className={`tactical-hud-body ${isTransitioning ? 'switching' : ''}`}>
          {/* LEFT INTEL */}
          <section className="tactical-left-intel">
            <div className="classification-tag" style={{ borderColor: accent, color: accent }}>
              {selectedTeam.type.toUpperCase()} // STATUS: {selectedTeam.status.toUpperCase()}
            </div>

            <h1 className="tactical-title" style={{ color: accent }}>
              {selectedTeam.name.toUpperCase()}
            </h1>

            {/* STATUS & ANGLE POINTER LINE */}
            <div className="tactical-status-cluster">
              <div className="status-label-group">
                <span className="status-kicker">OPERATIONAL STATUS:</span>
                <span className={`status-badge ${selectedTeam.status === 'Active' ? 'status-active' : 'status-defunct'}`}>
                  {selectedTeam.status.toUpperCase()}
                </span>
                <span className="status-sub-tag">FOUNDED: {selectedTeam.firstAppearance}</span>
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

            {/* HEADQUARTERS & COMMAND */}
            <div className="tactical-data-block">
              <span className="data-kicker">PRIMARY HEADQUARTERS:</span>
              <div className="data-primary-val">{selectedTeam.headquarters}</div>
              <div className="data-secondary-val">COMMAND: {selectedTeam.leaders.join(', ')}</div>
            </div>

            {/* DESCRIPTION */}
            <div className="hero-quote-box" style={{ borderColor: accent }}>
              <span className="quote-text">{selectedTeam.description}</span>
            </div>

            {/* KEY OPERATIONS */}
            <div className="tactical-powers-summary">
              <span className="data-kicker">HISTORICAL OPERATIONS:</span>
              <ul className="capabilities-bullets">
                {selectedTeam.keyOperations.slice(0, 3).map((op, idx) => (
                  <li key={idx} className="capability-item">
                    <span className="bullet-dot" style={{ background: accent }} />
                    <span>{op}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* NOTABLE MEMBERS */}
            <div className="custody-preview-row">
              <span className="data-kicker">KEY ASSETS & NOTABLE OPERATIVES:</span>
              <div className="wielders-pills">
                {selectedTeam.notableMembers.slice(0, 6).map((mem, idx) => (
                  <span key={idx} className="wielder-pill">{mem}</span>
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT VISUAL VIEWPORT */}
          <section className="tactical-right-viewport">
            {/* Top-Right Headquarters Box */}
            <div className="viewport-appearances-box">
              <span className="appearances-kicker">OPERATIONAL JURISDICTION:</span>
              <div className="appearances-list-text" style={{ color: accent }}>
                {selectedTeam.headquarters.split('/')[0].trim().toUpperCase()}
              </div>
            </div>

            {/* Tactical Viewport Container */}
            <div className="tactical-canvas-frame">
              {/* Corner Reticle Brackets */}
              <div className="reticle-corner reticle-tl" style={{ borderColor: accent }} />
              <div className="reticle-corner reticle-tr" style={{ borderColor: accent }} />
              <div className="reticle-corner reticle-bl" style={{ borderColor: accent }} />
              <div className="reticle-corner reticle-br" style={{ borderColor: accent }} />

              {/* Visual Object: PNG Emblem Cutout Display with Fallback */}
              <div className="visual-object-wrapper">
                <img
                  key={imgUrl}
                  src={imgUrl}
                  alt={selectedTeam.name}
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
                  <Users size={64} style={{ color: accent }} className="holo-icon" />
                  <div className="holo-tag" style={{ color: accent }}>{selectedTeam.name.toUpperCase()}</div>
                  <div className="holo-sub">{selectedTeam.type.toUpperCase()} INSIGNIA</div>
                </div>
              </div>

              {/* Viewport Floating Telemetry */}
              <div className="viewport-telemetry-badge" style={{ color: accent }}>
                <span className="reticle-symbol">▲</span>
                <span>COALITION STATUS: ALLIANCE PROTOCOL SYNCHRONIZED // LEVEL 8 CLEARANCE</span>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ==================== VIEW MODE 2: PANORAMIC HEADQUARTERS ==================== */}
      {viewMode === 'panoramic' && (
        <main className="panoramic-shelf-body">
          <div className="panoramic-shelf-header">
            <span className="shelf-kicker">GLOBAL & INTERSTELLAR ALLIANCES // CLASSIFIED 006-TEAMS</span>
            <h1 className="panoramic-title">TEAMS & ORGANIZATIONS MATRIX</h1>
            <p className="panoramic-subtitle">
              Strategic coalitions, ancient brotherhoods, intelligence bureaus, and clandestine authoritarian syndicates shaping universal affairs.
            </p>

            {/* Filter controls */}
            <div className="panoramic-controls-row">
              <div className="search-pill-box">
                <Search size={14} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search organizations by name, leader, or base..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-pill-input"
                />
              </div>

              <div className="category-chips">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`cat-chip ${selectedType === type ? 'active' : ''}`}
                  >
                    {type === 'all' ? 'ALL COALITIONS' : type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="panoramic-grid">
            {filteredTeams.map((team) => {
              const tAccent = team.accentColor || '#38bdf8';
              const tImg = team.imageUrl || `/images/teams/${team.id}.png`;
              return (
                <div
                  key={team.id}
                  className="panoramic-card"
                  onClick={() => {
                    setSelectedTeam(team);
                    setViewMode('hud');
                  }}
                  style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
                >
                  <div className="panoramic-card-thumb">
                    <img
                      src={tImg}
                      alt={team.name}
                      className="panoramic-thumb-img"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                        const fallback = (e.target as HTMLElement).nextElementSibling;
                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                      }}
                    />
                    <div className="panoramic-thumb-fallback" style={{ display: 'none', background: `radial-gradient(circle, ${tAccent}22 0%, #06090e 100%)` }}>
                      <Users size={32} style={{ color: tAccent }} />
                    </div>
                  </div>

                  <div className="panoramic-card-info">
                    <div className="panoramic-cat-tag" style={{ color: tAccent }}>{team.type.toUpperCase()}</div>
                    <div className="panoramic-card-name">{team.name}</div>
                    <div className="panoramic-card-origin">{team.headquarters.slice(0, 50)}...</div>
                    <div className="panoramic-card-action" style={{ color: tAccent }}>EXAMINE HUD →</div>
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
          {teamsDatabase.map((t) => {
            const tAccent = t.accentColor || '#38bdf8';
            const isActive = t.id === selectedTeam.id;
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
                <div className="stone-tab-labels">
                  <span className="stone-tab-name" style={{ color: isActive ? tAccent : '#e2e8f0' }}>
                    {t.name}
                  </span>
                  <span className="stone-tab-vessel">{t.status.toUpperCase()}</span>
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
        .status-active {
          color: #10b981;
        }
        .status-defunct {
          color: #ef4444;
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

        .data-secondary-val {
          font-size: 10px;
          color: #94a3b8;
          letter-spacing: 0.08em;
          font-family: monospace;
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

        /* PANORAMIC HEADQUARTERS */
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
