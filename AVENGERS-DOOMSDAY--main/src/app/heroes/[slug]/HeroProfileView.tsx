'use client';

import Link from 'next/link';
import { characters, characterProfilePath, getCharacterBySlug } from '@/data/characters';
import { movies } from '@/data/movies';
import { Shield, Zap, Swords, Film, Users, ArrowRight } from 'lucide-react';

export default function HeroProfileView({ slug }: { slug: string }) {
  const hero = getCharacterBySlug(slug);

  if (!hero) {
    return null;
  }

  const heroMovies = movies.filter((m) => hero.appearances.includes(m.slug));
  const resolvedAllies = characters.filter((c) => hero.allies.includes(c.slug));
  const resolvedEnemies = characters.filter((c) => hero.enemies.includes(c.slug));

  const monogram = hero.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="hero-profile-container">
      {/* 1. HERO PROFILE HERO HEADER */}
      <section
        className="profile-hero-section"
        style={{
          background: `linear-gradient(180deg, ${hero.portraitColor}33 0%, var(--midnight) 100%)`,
        }}
      >
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <Link href="/heroes" className="crumb-link">Heroes</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{hero.name}</span>
          </div>

          <div className="profile-hero-grid">
            <div className="profile-text-col">
              <div className="badge-row">
                <span className={`badge ${hero.status === 'alive' ? 'badge-slate' : 'badge-red'}`}>
                  {hero.status.toUpperCase()}
                </span>
                <span className="badge badge-gold">{hero.species.toUpperCase()}</span>
                <span className="badge badge-slate">{hero.affiliation[0] || 'INDEPENDENT'}</span>
              </div>

              <h1 className="hero-display-name">{hero.name}</h1>
              <div className="hero-alias-subtitle">
                <span>{hero.realName || 'Unknown Identity'}</span>
                {hero.actor && (
                  <>
                    <span className="dot-sep">•</span>
                    <span className="actor-credit">Portrayed by {hero.actor}</span>
                  </>
                )}
              </div>

              {hero.quote && (
                <div className="hero-featured-quote">
                  <p>"{hero.quote}"</p>
                </div>
              )}

              <p className="hero-lead-bio">{hero.biography}</p>

              <div className="hero-dossier-bar card-base">
                <div className="dossier-item">
                  <span className="dossier-label">First Appearance</span>
                  <span className="dossier-value">{hero.firstAppearance}</span>
                </div>
                <div className="dossier-item">
                  <span className="dossier-label">Homeworld</span>
                  <span className="dossier-value">{hero.homeworld || 'Earth'}</span>
                </div>
                <div className="dossier-item">
                  <span className="dossier-label">Appearances</span>
                  <span className="dossier-value">{hero.appearances.length} MCU Releases</span>
                </div>
              </div>
            </div>

            {/* Visual Monogram / Photo Card */}
            <div className="profile-avatar-col">
              <div
                className="profile-avatar-frame"
                style={{
                  background: `radial-gradient(circle at center, ${hero.portraitColor} 0%, #050608 100%)`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Cutout Image with Fallback */}
                <img
                  key={hero.slug}
                  src={hero.imageUrl || `/images/heroes/${hero.slug}.png`}
                  alt={hero.name}
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
                  S.H.I.E.L.D. DOSSIER #{hero.id.toUpperCase()}
                </div>
                <div className="frame-footer-tag" style={{ position: 'relative', zIndex: 2 }}>
                  STATUS: {hero.status.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIFICATIONS, POWERS & RELATIONS */}
      <section className="section">
        <div className="container-wide">
          <div className="dossier-layout">
            {/* Primary Details Column */}
            <div className="dossier-main">
              {/* Origin Section */}
              <div className="dossier-block">
                <h2 className="block-title">Canonical Origin</h2>
                <div className="origin-card card-base">
                  <p>{hero.origin}</p>
                </div>
              </div>

              {/* Powers & Skills Grid */}
              <div className="dossier-block">
                <h2 className="block-title">Powers, Skills & Enhancements</h2>
                <div className="powers-skills-grid">
                  <div className="card-base spec-card">
                    <div className="spec-head">
                      <Zap size={16} className="text-gold" />
                      <h3>Superhuman Powers</h3>
                    </div>
                    <ul className="spec-list">
                      {hero.powers.map((p, idx) => (
                        <li key={idx}>✦ {p}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-base spec-card">
                    <div className="spec-head">
                      <Shield size={16} className="text-gold" />
                      <h3>Tactical & Combat Skills</h3>
                    </div>
                    <ul className="spec-list">
                      {hero.skills.map((s, idx) => (
                        <li key={idx}>✦ {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Weapons & Technology */}
              {(hero.weapons.length > 0 || hero.technology.length > 0) && (
                <div className="dossier-block">
                  <h2 className="block-title">Weapons, Armor & Technology</h2>
                  <div className="gear-grid">
                    {hero.weapons.map((w, idx) => (
                      <div key={idx} className="gear-card card-base">
                        <span className="gear-type badge badge-red">WEAPON</span>
                        <span className="gear-name">{w}</span>
                      </div>
                    ))}
                    {hero.technology.map((t, idx) => (
                      <div key={idx} className="gear-card card-base">
                        <span className="gear-type badge badge-gold">TECHNOLOGY</span>
                        <span className="gear-name">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Major Battles */}
              {hero.majorBattles.length > 0 && (
                <div className="dossier-block">
                  <h2 className="block-title">Major Battles & Conflicts</h2>
                  <div className="battles-list">
                    {hero.majorBattles.map((b, idx) => (
                      <div key={idx} className="battle-item card-base">
                        <Swords size={18} className="battle-icon text-red" />
                        <span className="battle-name">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="dossier-sidebar">
              {/* MCU Filmography */}
              <div className="side-card card-base">
                <div className="side-head">
                  <Film size={16} className="text-gold" />
                  <h3 className="side-heading">MCU Appearances</h3>
                </div>
                <div className="appearances-list">
                  {heroMovies.map((m) => (
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

              {/* Allies */}
              {resolvedAllies.length > 0 && (
                <div className="side-card card-base">
                  <div className="side-head">
                    <Users size={16} className="text-gold" />
                    <h3 className="side-heading">Key Allies</h3>
                  </div>
                  <div className="allies-list">
                    {resolvedAllies.map((ally) => (
                      <Link key={ally.slug} href={characterProfilePath(ally.slug)} className="character-pill">
                        <span className="pill-name">{ally.name}</span>
                        <span className="badge badge-slate">{ally.species}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Enemies */}
              {resolvedEnemies.length > 0 && (
                <div className="side-card card-base">
                  <div className="side-head">
                    <Zap size={16} className="text-red" />
                    <h3 className="side-heading">Primary Antagonists</h3>
                  </div>
                  <div className="enemies-list">
                    {resolvedEnemies.map((enemy) => (
                      <Link key={enemy.slug} href={characterProfilePath(enemy.slug)} className="character-pill pill-enemy">
                        <span className="pill-name">{enemy.name}</span>
                        <span className="badge badge-red">ANTAGONIST</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Affiliations */}
              <div className="side-card card-base">
                <div className="side-head">
                  <Shield size={16} className="text-gold" />
                  <h3 className="side-heading">Teams & Factions</h3>
                </div>
                <div className="factions-cloud">
                  {hero.affiliation.map((aff, i) => (
                    <span key={i} className="faction-tag">{aff}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-profile-container { min-height: 100vh; }
        .profile-hero-section {
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

        .profile-hero-grid {
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
        .hero-display-name {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4.5vw, 4rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 0.35rem;
        }
        .hero-alias-subtitle {
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

        .hero-featured-quote {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-style: italic;
          color: var(--text-secondary);
          border-left: 2px solid var(--gold);
          padding-left: 1.25rem;
          margin-bottom: 1.75rem;
          line-height: 1.5;
        }
        .hero-lead-bio {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .hero-dossier-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--navy);
          border: 1px solid var(--border);
        }
        .dossier-item { display: flex; flex-direction: column; }
        .dossier-label {
          font-size: 0.6875rem;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }
        .dossier-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Avatar Frame */
        .profile-avatar-col {
          display: flex;
          justify-content: center;
        }
        .profile-avatar-frame {
          width: 100%;
          max-width: 360px;
          aspect-ratio: 1 / 1.2;
          border: 1px solid var(--border-2);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }
        .frame-header-tag {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--gold);
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

        /* Powers & Skills */
        .powers-skills-grid {
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

        /* Gear */
        .gear-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .gear-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
        }
        .gear-type { flex-shrink: 0; }
        .gear-name { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }

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
        .appearance-item:hover { background: rgba(201, 168, 76, 0.08); }
        .app-title { font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); }
        .app-meta { font-size: 0.6875rem; color: var(--text-muted); margin-top: 0.15rem; }
        .app-arrow { color: var(--gold); }

        .allies-list, .enemies-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .character-pill {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 0.85rem;
          background: var(--navy);
          text-decoration: none;
        }
        .pill-name { font-size: 0.8125rem; color: var(--text-primary); font-weight: 500; }
        .pill-enemy:hover { background: rgba(193, 18, 31, 0.1); }

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
          .profile-hero-grid { grid-template-columns: 1fr; }
          .dossier-layout { grid-template-columns: 1fr; }
          .profile-avatar-col { order: -1; }
          .profile-avatar-frame { max-width: 260px; }
        }
        @media (max-width: 640px) {
          .hero-dossier-bar { grid-template-columns: 1fr; }
          .powers-skills-grid { grid-template-columns: 1fr; }
          .gear-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

