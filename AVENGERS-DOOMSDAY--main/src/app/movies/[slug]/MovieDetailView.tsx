'use client';

import Link from 'next/link';
import { movies, getMovieBySlug } from '@/data/movies';
import { getMovieMedia } from '@/data/mediaMap';
import { characters, characterProfilePath } from '@/data/characters';
import { infinityStones } from '@/data/infinity-stones';
import { weapons } from '@/data/weapons';
import { Clock, Calendar, Film, ArrowLeft, ArrowRight, Shield, Sparkles } from 'lucide-react';

export default function MovieDetailView({ slug }: { slug: string }) {
  const movie = getMovieBySlug(slug);

  if (!movie) {
    return null;
  }

  // Find adjacent movies by release order
  const sortedByRelease = [...movies].sort((a, b) => a.releaseOrder - b.releaseOrder);
  const currentIndex = sortedByRelease.findIndex((m) => m.slug === movie.slug);
  const prevMovie = currentIndex > 0 ? sortedByRelease[currentIndex - 1] : null;
  const nextMovie = currentIndex < sortedByRelease.length - 1 ? sortedByRelease[currentIndex + 1] : null;

  // Resolve related stones
  const resolvedStones = infinityStones.filter((s) => movie.infinityStones.includes(s.slug));

  // Resolve related weapons
  const resolvedWeapons = weapons.filter((w) => movie.artifacts.includes(w.slug));

  const media = getMovieMedia(movie.slug);

  return (
    <div className="detail-container">
      {/* 1. CINEMATIC DETAIL HERO */}
      <section
        className="detail-hero"
        style={{
          background: `linear-gradient(180deg, ${movie.posterColor}33 0%, var(--midnight) 100%)`,
        }}
      >
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <Link href="/movies" className="crumb-link">Movies</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{movie.title}</span>
          </div>

          <div className="hero-grid">
            <div className="hero-text-col">
              <div className="hero-badge-group">
                <span className="badge badge-red">PHASE {movie.phase}</span>
                <span className="badge badge-gold">CHRONOLOGICAL #{movie.chronologicalOrder}</span>
                <span className="badge badge-slate">RELEASE #{movie.releaseOrder}</span>
              </div>

              <h1 className="hero-title">{movie.title}</h1>

              <div className="hero-subhead">
                <span>Directed by <strong>{movie.director}</strong></span>
                <span>•</span>
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.runtime} min</span>
              </div>

              <p className="hero-synopsis">{movie.synopsis}</p>

              <div className="hero-stats-panel card-base">
                <div className="hero-stat">
                  <span className="stat-label">Theatrical Release</span>
                  <span className="stat-value">{movie.releaseDate}</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-label">Global Box Office</span>
                  <span className="stat-value">{movie.boxOffice || 'N/A'}</span>
                </div>
                <div className="hero-stat">
                  <span className="stat-label">Writers</span>
                  <span className="stat-value">{movie.writers.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Poster Presentation with Official Poster & Logo */}
            <div className="hero-poster-col">
              <div
                className="hero-poster-frame"
                style={{
                  background: `linear-gradient(135deg, ${media.accent || movie.posterColor}33 0%, #06070a 100%)`,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {movie.posterUrl || media.image ? (
                  <img
                    src={movie.posterUrl || media.image}
                    alt={movie.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div className="poster-monogram">{movie.title.split(' ')[0]}</div>
                )}

                {/* Official Movie Logo */}
                {media.logo && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 24,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      maxWidth: '85%',
                      background: 'rgba(0, 0, 0, 0.78)',
                      padding: '8px 14px',
                      borderRadius: 6,
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
                    }}
                  >
                    <img
                      src={media.logo}
                      alt={`${movie.title} Logo`}
                      style={{
                        maxHeight: 46,
                        maxWidth: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        margin: '0 auto',
                      }}
                    />
                  </div>
                )}

                <div className="poster-inner-badge">ARCHIVAL RECORD</div>
                <div className="poster-phase-mark">PHASE {movie.phase} • {movie.year}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SPECIFICATIONS & CAST */}
      <section className="section">
        <div className="container-wide">
          <div className="content-layout">
            {/* Left Primary Column */}
            <div className="main-col">
              {/* Cast and Characters */}
              <div className="block-group">
                <h2 className="block-title">Key Cast & Appearances</h2>
                <div className="cast-grid">
                  {movie.cast.map((c, i) => (
                    <div key={i} className="cast-card card-base">
                      <div className="cast-actor">{c.actor}</div>
                      <div className="cast-character">
                        {c.characterSlug ? (
                          <Link href={characterProfilePath(c.characterSlug)} className="cast-link">
                            {c.character}
                          </Link>
                        ) : (
                          c.character
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Events */}
              <div className="block-group">
                <h2 className="block-title">Canonical Milestones</h2>
                <ul className="events-list">
                  {movie.majorEvents.map((event, idx) => (
                    <li key={idx} className="event-item card-base">
                      <span className="event-num">0{idx + 1}</span>
                      <p className="event-text">{event}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Post-Credit Scenes */}
              {movie.postCreditScenes && movie.postCreditScenes.length > 0 && (
                <div className="block-group">
                  <h2 className="block-title">Post-Credit Archival Records</h2>
                  <div className="post-credits-list">
                    {movie.postCreditScenes.map((scene, idx) => (
                      <div key={idx} className="post-credit-card card-base">
                        <div className="post-credit-header">
                          <span className="badge badge-gold">
                            {scene.type === 'mid' ? 'MID-CREDITS SCENE' : 'POST-CREDITS SCENE'}
                          </span>
                        </div>
                        <p className="post-credit-desc">{scene.description}</p>
                        <div className="post-credit-sig">
                          <strong>Universe Significance:</strong> {scene.significance}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Easter Eggs */}
              {movie.easterEggs && movie.easterEggs.length > 0 && (
                <div className="block-group">
                  <h2 className="block-title">Archival Easter Eggs</h2>
                  <div className="easter-eggs-grid">
                    {movie.easterEggs.map((egg, idx) => (
                      <div key={idx} className="egg-card card-base">
                        <span className="egg-icon">✦</span>
                        <p className="egg-text">{egg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Column */}
            <div className="sidebar-col">
              {/* Infinity Stones Card */}
              {resolvedStones.length > 0 && (
                <div className="side-card card-base">
                  <div className="side-card-head">
                    <Sparkles size={16} className="text-gold" />
                    <h3 className="side-title">Infinity Stone Connections</h3>
                  </div>
                  <div className="side-stones-list">
                    {resolvedStones.map((stone) => (
                      <div
                        key={stone.slug}
                        className="side-stone-item"
                        style={{ borderLeftColor: stone.hexColor }}
                      >
                        <div className="stone-dot" style={{ backgroundColor: stone.hexColor }} />
                        <div>
                          <div className="side-stone-name">{stone.name}</div>
                          <div className="side-stone-origin">{stone.powers[0]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weapons & Relics */}
              {resolvedWeapons.length > 0 && (
                <div className="side-card card-base">
                  <div className="side-card-head">
                    <Shield size={16} className="text-gold" />
                    <h3 className="side-title">Featured Weapons & Artifacts</h3>
                  </div>
                  <div className="side-items-list">
                    {resolvedWeapons.map((w) => (
                      <Link key={w.slug} href={`/weapons/${w.slug}`} className="side-relic-item">
                        <span className="relic-name">{w.name}</span>
                        <span className="relic-cat badge badge-slate">{w.category}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Film Locations */}
              <div className="side-card card-base">
                <div className="side-card-head">
                  <Film size={16} className="text-gold" />
                  <h3 className="side-title">Key Locations</h3>
                </div>
                <div className="side-locations-cloud">
                  {movie.locations.map((loc, i) => (
                    <span key={i} className="location-chip">{loc}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PREVIOUS / NEXT CHRONICLE NAVIGATION */}
      <section className="section bg-midnight-2">
        <div className="container-wide">
          <div className="nav-neighbor-grid">
            {prevMovie ? (
              <Link href={`/movies/${prevMovie.slug}`} className="neighbor-card card-base card-hover">
                <div className="neighbor-dir">
                  <ArrowLeft size={16} />
                  <span>PREVIOUS RELEASE (#{prevMovie.releaseOrder})</span>
                </div>
                <h4 className="neighbor-title">{prevMovie.title}</h4>
                <div className="neighbor-year">{prevMovie.year} • Phase {prevMovie.phase}</div>
              </Link>
            ) : (
              <div className="neighbor-empty" />
            )}

            {nextMovie && (
              <Link href={`/movies/${nextMovie.slug}`} className="neighbor-card card-base card-hover neighbor-card-right">
                <div className="neighbor-dir">
                  <span>NEXT RELEASE (#{nextMovie.releaseOrder})</span>
                  <ArrowRight size={16} />
                </div>
                <h4 className="neighbor-title">{nextMovie.title}</h4>
                <div className="neighbor-year">{nextMovie.year} • Phase {nextMovie.phase}</div>
              </Link>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .detail-container { min-height: 100vh; }
        .detail-hero {
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

        .hero-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        .hero-badge-group {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 4vw, 3.5rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.15;
          margin-bottom: 0.85rem;
        }
        .hero-subhead {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9375rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .hero-subhead strong { color: var(--text-primary); }

        .hero-synopsis {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .hero-stats-panel {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--navy);
          border: 1px solid var(--border);
        }
        .hero-stat { display: flex; flex-direction: column; }
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

        /* Poster */
        .hero-poster-col { display: flex; justify-content: center; }
        .hero-poster-frame {
          width: 100%;
          max-width: 380px;
          aspect-ratio: 2 / 3;
          border: 1px solid var(--border-2);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
          position: relative;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }
        .poster-inner-badge {
          font-size: 0.6875rem;
          letter-spacing: 0.15em;
          color: var(--gold);
          font-weight: 700;
        }
        .poster-monogram {
          font-family: var(--font-display);
          font-size: 3.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.15);
          letter-spacing: 0.05em;
          text-align: center;
          margin: auto 0;
        }
        .poster-phase-mark {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-align: right;
          letter-spacing: 0.08em;
        }

        /* Content Layout */
        .content-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3.5rem;
        }
        .block-group { margin-bottom: 3.5rem; }
        .block-title {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.75rem;
        }

        /* Cast Grid */
        .cast-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .cast-card {
          padding: 1rem 1.25rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
        }
        .cast-actor { font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); }
        .cast-character { font-size: 0.8125rem; color: var(--gold-muted); margin-top: 0.2rem; }
        .cast-link { color: var(--gold); text-decoration: none; }
        .cast-link:hover { text-decoration: underline; }

        /* Events list */
        .events-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .event-item {
          display: flex;
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
        }
        .event-num {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--gold);
        }
        .event-text { font-size: 0.875rem; line-height: 1.6; color: var(--text-secondary); }

        /* Post credits */
        .post-credits-list { display: flex; flex-direction: column; gap: 1.25rem; }
        .post-credit-card {
          padding: 1.5rem;
          background: var(--navy);
          border: 1px solid var(--border);
        }
        .post-credit-header { margin-bottom: 0.75rem; }
        .post-credit-desc {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }
        .post-credit-sig {
          font-size: 0.8125rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
          padding-top: 0.75rem;
        }
        .post-credit-sig strong { color: var(--gold); }

        /* Easter eggs */
        .easter-eggs-grid { display: grid; grid-template-columns: 1fr; gap: 0.75rem; }
        .egg-card {
          display: flex;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          align-items: flex-start;
        }
        .egg-icon { color: var(--gold); flex-shrink: 0; font-size: 1rem; }
        .egg-text { font-size: 0.8125rem; line-height: 1.6; color: var(--text-secondary); }

        /* Sidebar */
        .sidebar-col { display: flex; flex-direction: column; gap: 2rem; }
        .side-card {
          padding: 1.5rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
        }
        .side-card-head {
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
        .side-stones-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .side-stone-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: var(--navy);
          border-left: 3px solid;
          text-decoration: none;
        }
        .stone-dot { width: 10px; height: 10px; border-radius: 50%; }
        .side-stone-name { font-size: 0.8125rem; font-weight: 600; color: var(--text-primary); }
        .side-stone-origin { font-size: 0.6875rem; color: var(--text-muted); }

        .side-items-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .side-relic-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 0.85rem;
          background: var(--navy);
          text-decoration: none;
        }
        .relic-name { font-size: 0.8125rem; color: var(--text-primary); font-weight: 500; }

        .side-locations-cloud { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .location-chip {
          padding: 0.35rem 0.65rem;
          background: var(--navy);
          border: 1px solid var(--border);
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        /* Neighbors */
        .nav-neighbor-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .neighbor-card {
          padding: 1.75rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          text-decoration: none;
          display: flex;
          flex-direction: column;
        }
        .neighbor-card-right { text-align: right; align-items: flex-end; }
        .neighbor-dir {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
        }
        .neighbor-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .neighbor-year { font-size: 0.75rem; color: var(--text-muted); }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; }
          .content-layout { grid-template-columns: 1fr; }
          .hero-poster-col { order: -1; }
          .hero-poster-frame { max-width: 260px; }
        }
        @media (max-width: 640px) {
          .hero-stats-panel { grid-template-columns: 1fr; }
          .cast-grid { grid-template-columns: 1fr; }
          .nav-neighbor-grid { grid-template-columns: 1fr; }
          .neighbor-card-right { text-align: left; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}
