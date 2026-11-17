'use client';

import Link from 'next/link';
import { characters, characterProfilePath, getCharacterBySlug } from '@/data/characters';
import { movies } from '@/data/movies';
import { Skull, Zap, Swords, Film, Users, ShieldAlert, ArrowRight } from 'lucide-react';

export default function VillainProfileView({ slug }: { slug: string }) {
  const villain = getCharacterBySlug(slug);

  if (!villain) {
    return null;
  }

  const villainMovies = movies.filter((m) => villain.appearances.includes(m.slug));
  const adversaries = characters.filter((c) => villain.enemies.includes(c.slug));

  const monogram = villain.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="villain-profile-container">
      {/* 1. ANTAGONIST HERO HEADER */}
      <section
        className="villain-hero-section"
        style={{
          background: `linear-gradient(180deg, rgba(193, 18, 31, 0.2) 0%, var(--midnight) 100%)`,
        }}
      >
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <Link href="/villains" className="crumb-link">Antagonists</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{villain.name}</span>
          </div>

          <div className="villain-hero-grid">
            <div className="villain-text-col">
              <div className="badge-row">
                <span className="badge badge-red">THREAT LEVEL: OMEGA</span>
                <span className="badge badge-slate">{villain.species.toUpperCase()}</span>
                <span className={`badge ${villain.status === 'deceased' ? 'badge-red' : 'badge-gold'}`}>
                  STATUS: {villain.status.toUpperCase()}
                </span>
              </div>

              <h1 className="villain-display-name">{villain.name}</h1>
              <div className="villain-alias-subtitle">
                <span>{villain.realName || villain.homeworld || 'Origin Unknown'}</span>
                {villain.actor && (
                  <>
                    <span className="dot-sep">•</span>
                    <span className="actor-credit">Portrayed by {villain.actor}</span>
                  </>
                )}
              </div>

              {villain.quote && (
                <div className="villain-quote-box">
                  <p>"{villain.quote}"</p>
                </div>
              )}

              <p className="villain-lead-bio">{villain.biography}</p>

              <div className="villain-stats-bar card-base">
                <div className="stat-item">
                  <span className="stat-label">First MCU Incursion</span>
                  <span className="stat-value">{villain.firstAppearance}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Origin Realm</span>
                  <span className="stat-value">{villain.homeworld || 'Unknown'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Adversaries Count</span>
                  <span className="stat-value">{villain.enemies.length} Primary Foes</span>
                </div>
              </div>
            </div>

            {/* Avatar Frame */}
            <div className="villain-avatar-col">
              <div
                className="villain-avatar-frame"
                style={{
                  background: `radial-gradient(circle at center, ${villain.portraitColor} 0%, #050608 100%)`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Cutout Image with Fallback */}
                <img
                  src={villain.imageUrl || `/images/villains/${villain.slug}.png`}
                  alt={villain.name}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                    const fallback = (e.target as HTMLElement).nextElementSibling;
                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    position: 'absolute',
                    inset: 0,
                    padding: '1.25rem',
                    filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.8))',
                    zIndex: 1,
                  }}
                />
                <div className="frame-monogram" style={{ display: 'none' }}>{monogram}</div>
                <div className="frame-header-tag" style={{ position: 'relative', zIndex: 2 }}>
                  <ShieldAlert size={14} className="text-red" />
                  <span>CLASSIFIED THREAT DOSSIER</span>
                </div>
                <div className="frame-footer-tag" style={{ position: 'relative', zIndex: 2 }}>
                  STATUS: {villain.status.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIFICATIONS, MOTIVATIONS & BATTLES */}
      <section className="section">
        <div className="container-wide">
          <div className="dossier-layout">
            {/* Primary Details */}
            <div className="dossier-main">
              {/* Origin & Ideology */}
              <div className="dossier-block">
                <h2 className="block-title">Canonical Origin & Motivations</h2>
                <div className="origin-card card-base">
                  <p>{villain.origin}</p>
                </div>
              </div>

              {/* Powers & Destructive Capabilities */}
              <div className="dossier-block">
                <h2 className="block-title">Powers & Destructive Capabilities</h2>
                <div className="powers-grid">
                  <div className="card-base spec-card">
                    <div className="spec-head">
                      <Zap size={16} className="text-red" />
                      <h3>Superhuman Attributes</h3>
                    </div>
                    <ul className="spec-list">
                      {villain.powers.map((p, idx) => (
                        <li key={idx}>✦ {p}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-base spec-card">
                    <div className="spec-head">
                      <Skull size={16} className="text-gold" />
                      <h3>Tactical & Technological Mastery</h3>
                    </div>
                    <ul className="spec-list">
                      {villain.skills.map((s, idx) => (
                        <li key={idx}>✦ {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Weapons of Conquest */}
              {villain.weapons.length > 0 && (
                <div className="dossier-block">
                  <h2 className="block-title">Weapons & Relics of Conquest</h2>
                  <div className="weapons-grid">
                    {villain.weapons.map((w, idx) => (
                      <div key={idx} className="weapon-card card-base">
                        <span className="badge badge-red">ARMAMENT</span>
                        <span className="weapon-name">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Major Battles */}
              {villain.majorBattles.length > 0 && (
                <div className="dossier-block">
                  <h2 className="block-title">Major Incursions & Battles</h2>
                  <div className="battles-list">
                    {villain.majorBattles.map((b, idx) => (
                      <div key={idx} className="battle-item card-base">
                        <Swords size={18} className="battle-icon text-red" />
                        <span className="battle-name">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="dossier-sidebar">
              {/* MCU Filmography */}
              <div className="side-card card-base">
                <div className="side-head">
                  <Film size={16} className="text-gold" />
                  <h3 className="side-heading">MCU Appearances</h3>
                </div>
                <div className="appearances-list">
                  {villainMovies.map((m) => (
                    <Link key={m.slug} href={`/movies/${m.slug}`} className="appearance-item">
                      <div>
                        <div className="app-title">{m.title}</div>
                        <div className="app-meta">{m.year} • Phase {m.phase}</div>
                      </div>
                      <ArrowRight size={14} className="app-arrow" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Primary Adversaries */}
              {adversaries.length > 0 && (
                <div className="side-card card-base">
                  <div className="side-head">
                    <Users size={16} className="text-gold" />
                    <h3 className="side-heading">Primary Adversaries</h3>
                  </div>
                  <div className="adversaries-list">
                    {adversaries.map((adv) => (
                      <Link key={adv.slug} href={characterProfilePath(adv.slug)} className="adversary-pill">
                        <span className="adv-name">{adv.name}</span>
                        <span className="badge badge-slate">{adv.species}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Organizations */}
              {villain.affiliation.length > 0 && (
                <div className="side-card card-base">
                  <div className="side-head">
                    <ShieldAlert size={16} className="text-red" />
                    <h3 className="side-heading">Factions & Armies</h3>
                  </div>
                  <div className="factions-cloud">
                    {villain.affiliation.map((aff, i) => (
                      <span key={i} className="faction-tag">{aff}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .villain-profile-container { min-height: 100vh; }
        .villain-hero-section {
          padding-top: 2rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid var(--border);
        }
        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          margin-bottom: 1.5rem;
        }
        .crumb-link { color: var(--text-muted); text-decoration: none; }
        .crumb-link:hover { color: var(--gold); }
        .crumb-sep { color: var(--border-2); }
        .crumb-active { color: var(--gold); font-weight: 500; }

        .villain-hero-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        .badge-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .villain-display-name {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4.5vw, 4rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 0.35rem;
        }
        .villain-alias-subtitle {
          font-size: 1.125rem;
          color: var(--gold);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .dot-sep { color: var(--border-2); }
        .actor-credit { color: var(--text-muted); font-size: 0.9375rem; }

        .villain-quote-box {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-style: italic;
          color: var(--text-secondary);
          border-left: 2px solid var(--red-bright);
          padding-left: 1.25rem;
          margin-bottom: 1.75rem;
          line-height: 1.5;
        }
        .villain-lead-bio {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .villain-stats-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--navy);
          border: 1px solid var(--border);
        }
        .stat-item { display: flex; flex-direction: column; }
        .stat-label {
          font-size: 0.6875rem;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }
        .stat-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Avatar Frame */
        .villain-avatar-col {
          display: flex;
          justify-content: center;
        }
        .villain-avatar-frame {
          width: 100%;
          max-width: 360px;
          aspect-ratio: 1 / 1.2;
          border: 1px solid rgba(193, 18, 31, 0.4);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        }
        .frame-header-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--red-bright);
        }
        .frame-monogram {
          font-family: var(--font-display);
          font-size: 6rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.15);
          text-align: center;
          margin: auto 0;
          letter-spacing: 0.05em;
        }
        .frame-footer-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-align: right;
          letter-spacing: 0.08em;
        }

        /* Dossier content */
        .dossier-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3.5rem;
        }
        .dossier-block { margin-bottom: 3.5rem; }
        .block-title {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.75rem;
        }

        .origin-card {
          padding: 1.75rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        /* Powers */
        .powers-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .spec-card {
          padding: 1.5rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
        }
        .spec-head {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.5rem;
        }
        .spec-head h3 {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .spec-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        /* Weapons */
        .weapons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .weapon-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
        }
        .weapon-name { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }

        /* Battles */
        .battles-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        .battle-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--navy);
          border: 1px solid var(--border);
        }
        .battle-icon { flex-shrink: 0; }
        .battle-name { font-size: 0.875rem; color: var(--text-primary); font-weight: 500; }

        /* Sidebar */
        .dossier-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .side-card {
          padding: 1.5rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
        }
        .side-head {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.75rem;
        }
        .side-heading {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .appearances-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .appearance-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: var(--navy);
          text-decoration: none;
          transition: background 0.15s ease;
        }
        .appearance-item:hover { background: rgba(193, 18, 31, 0.1); }
        .app-title { font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); }
        .app-meta { font-size: 0.6875rem; color: var(--text-muted); margin-top: 0.15rem; }
        .app-arrow { color: var(--gold); }

        .adversaries-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .adversary-pill {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 0.85rem;
          background: var(--navy);
          text-decoration: none;
        }
        .adv-name { font-size: 0.8125rem; color: var(--text-primary); font-weight: 500; }
        .adversary-pill:hover { background: rgba(201, 168, 76, 0.08); }

        .factions-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .faction-tag {
          padding: 0.35rem 0.65rem;
          background: var(--navy);
          border: 1px solid var(--border);
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .villain-hero-grid { grid-template-columns: 1fr; }
          .dossier-layout { grid-template-columns: 1fr; }
          .villain-avatar-col { order: -1; }
          .villain-avatar-frame { max-width: 260px; }
        }
        @media (max-width: 640px) {
          .villain-stats-bar { grid-template-columns: 1fr; }
          .powers-grid { grid-template-columns: 1fr; }
          .weapons-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
