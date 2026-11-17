'use client';

import Link from 'next/link';
import { characters, characterProfilePath, getCharacterBySlug } from '@/data/characters';
import { movies } from '@/data/movies';
import { Film, Users, Shield, ArrowRight } from 'lucide-react';

export default function CharacterDetailView({ slug }: { slug: string }) {
  const character = getCharacterBySlug(slug);

  if (!character) {
    return null;
  }

  const charMovies = movies.filter((m) => character.appearances.includes(m.slug));
  const resolvedAllies = characters.filter((c) => character.allies.includes(c.slug));

  const monogram = character.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="char-profile-container">
      <section
        className="profile-hero"
        style={{ background: `linear-gradient(180deg, ${character.portraitColor}33 0%, var(--midnight) 100%)` }}
      >
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <Link href="/characters" className="crumb-link">Directory</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{character.name}</span>
          </div>

          <div className="profile-grid">
            <div className="text-col">
              <div className="badge-row">
                <span className="badge badge-gold">{character.type.toUpperCase()}</span>
                <span className="badge badge-slate">{character.species.toUpperCase()}</span>
                <span className="badge badge-slate">STATUS: {character.status.toUpperCase()}</span>
              </div>

              <h1 className="char-name">{character.name}</h1>
              <div className="char-subtitle">{character.realName || character.homeworld}</div>

              {character.quote && (
                <div className="quote-box">
                  <p>"{character.quote}"</p>
                </div>
              )}

              <p className="bio-lead">{character.biography}</p>

              <div className="meta-card card-base">
                <div>
                  <span className="meta-label">Origin Record</span>
                  <span className="meta-val">{character.firstAppearance}</span>
                </div>
                <div>
                  <span className="meta-label">Homeworld</span>
                  <span className="meta-val">{character.homeworld || 'Earth'}</span>
                </div>
                <div>
                  <span className="meta-label">Total Releases</span>
                  <span className="meta-val">{character.appearances.length} Appearances</span>
                </div>
              </div>
            </div>

            <div className="avatar-col">
              <div
                className="avatar-frame"
                style={{
                  background: `radial-gradient(circle at center, ${character.portraitColor} 0%, #06070a 100%)`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {character.imageUrl ? (
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      position: 'absolute',
                      inset: 0,
                    }}
                  />
                ) : (
                  <div className="monogram">{monogram}</div>
                )}
                <div className="tag-top" style={{ position: 'relative', zIndex: 2 }}>PERSONNEL ARCHIVE</div>
                <div className="tag-bottom" style={{ position: 'relative', zIndex: 2 }}>{character.status.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="content-grid">
            <div className="main-content">
              <div className="block">
                <h2 className="block-title">Archival History & Background</h2>
                <div className="card-base text-block">
                  <p>{character.origin}</p>
                </div>
              </div>

              {character.powers.length > 0 && (
                <div className="block">
                  <h2 className="block-title">Attributes & Abilities</h2>
                  <div className="card-base text-block">
                    <ul className="attr-list">
                      {character.powers.map((p, i) => (
                        <li key={i}>✦ {p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="side-content">
              <div className="side-card card-base">
                <div className="side-head">
                  <Film size={16} className="text-gold" />
                  <h3 className="side-title">MCU Appearances</h3>
                </div>
                <div className="apps-list">
                  {charMovies.map((m) => (
                    <Link key={m.slug} href={`/movies/${m.slug}`} className="app-item">
                      <div>
                        <div className="m-title">{m.title}</div>
                        <div className="m-year">{m.year} • Phase {m.phase}</div>
                      </div>
                      <ArrowRight size={13} className="text-gold" />
                    </Link>
                  ))}
                </div>
              </div>

              {resolvedAllies.length > 0 && (
                <div className="side-card card-base">
                  <div className="side-head">
                    <Users size={16} className="text-gold" />
                    <h3 className="side-title">Key Associations</h3>
                  </div>
                  <div className="allies-list">
                    {resolvedAllies.map((a) => (
                      <Link key={a.slug} href={characterProfilePath(a.slug)} className="ally-pill">
                        <span>{a.name}</span>
                        <span className="badge badge-slate">{a.species}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .char-profile-container { min-height: 100vh; }
        .profile-hero {
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

        .profile-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        .badge-row { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
        .char-name {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4.5vw, 3.75rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 0.35rem;
        }
        .char-subtitle {
          font-size: 1.125rem;
          color: var(--gold);
          margin-bottom: 1.5rem;
        }
        .quote-box {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-style: italic;
          color: var(--text-secondary);
          border-left: 2px solid var(--gold);
          padding-left: 1.25rem;
          margin-bottom: 1.75rem;
        }
        .bio-lead {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .meta-card {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--navy);
          border: 1px solid var(--border);
        }
        .meta-label {
          font-size: 0.6875rem;
          text-transform: uppercase;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.25rem;
        }
        .meta-val {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .avatar-col { display: flex; justify-content: center; }
        .avatar-frame {
          width: 100%;
          max-width: 340px;
          aspect-ratio: 1 / 1.2;
          border: 1px solid var(--border-2);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
        }
        .tag-top { font-size: 0.6875rem; font-weight: 700; color: var(--gold); letter-spacing: 0.1em; }
        .monogram {
          font-family: var(--font-display);
          font-size: 6rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.15);
          text-align: center;
          margin: auto 0;
        }
        .tag-bottom { font-size: 0.75rem; color: var(--text-muted); text-align: right; }

        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3.5rem;
        }
        .block { margin-bottom: 3.5rem; }
        .block-title {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.75rem;
        }
        .text-block {
          padding: 1.75rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }
        .attr-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .side-content { display: flex; flex-direction: column; gap: 2rem; }
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
        .side-title {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .apps-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .app-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: var(--navy);
          text-decoration: none;
        }
        .m-title { font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); }
        .m-year { font-size: 0.6875rem; color: var(--text-muted); }

        .allies-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .ally-pill {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 0.85rem;
          background: var(--navy);
          text-decoration: none;
          font-size: 0.8125rem;
          color: var(--text-primary);
        }

        @media (max-width: 1024px) {
          .profile-grid { grid-template-columns: 1fr; }
          .content-grid { grid-template-columns: 1fr; }
          .avatar-col { order: -1; }
        }
      `}</style>
    </div>
  );
}

