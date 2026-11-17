'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tv, Search, Clock, CheckCircle } from 'lucide-react';
import { movies } from '@/data/movies';
import { getMovieMedia } from '@/data/mediaMap';
import { useStore } from '@/store';

export default function TvSeriesPage() {
  const [search, setSearch] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<number | 'all'>('all');
  const { isWatched, toggleWatched } = useStore();

  const seriesList = movies
    .filter((m) => m.type === 'series')
    .filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.synopsis.toLowerCase().includes(search.toLowerCase());
      const matchesPhase = selectedPhase === 'all' || m.phase === selectedPhase;
      return matchesSearch && matchesPhase;
    });

  return (
    <div className="series-page-container">
      <section className="series-header">
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">Television Series</span>
          </div>

          <h1 className="page-heading">Marvel Studios Television Series</h1>
          <p className="page-subheading">
            Official canonical streaming series expanding the Marvel Cinematic Universe lore, character trajectories, and the multiverse.
          </p>

          <div className="controls-bar card-base">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search series titles, directors, or arcs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="phase-chips">
              <span className="phase-label">Phase:</span>
              {(['all', 0, 1, 2, 3, 4, 5, 6] as const).map((phase) => (
                <button
                  key={phase}
                  onClick={() => setSelectedPhase(phase)}
                  className={`chip-btn ${selectedPhase === phase ? 'chip-btn-active' : ''}`}
                >
                  {phase === 'all'
                    ? 'All Series'
                    : phase === 0
                    ? 'Phase 0 (Agent Carter)'
                    : phase === 2
                    ? 'Phase 2 (Defenders Origin)'
                    : phase === 3
                    ? 'Phase 3 (Defenders & Punisher)'
                    : phase === 6
                    ? 'Phase 6 (Born Again & Beyond)'
                    : `Phase ${phase}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="series-grid">
            {seriesList.map((series) => {
              const watched = isWatched(series.slug);
              const media = getMovieMedia(series.slug);
              return (
                <div key={series.id} className="series-card card-base card-hover">
                  <div
                    className="series-card-banner"
                    style={{
                      background: `linear-gradient(135deg, ${series.posterColor} 0%, #08090d 100%)`,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {media.image && (
                      <img
                        src={media.image}
                        alt={series.title}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: 0.55,
                        }}
                      />
                    )}
                    <div className="banner-top" style={{ position: 'relative', zIndex: 2 }}>
                      <span className="badge badge-red">PHASE {series.phase}</span>
                      <span className="badge badge-slate">{series.episodes || 6} EPISODES</span>
                    </div>
                    <div className="banner-center" style={{ position: 'relative', zIndex: 2 }}>
                      <Tv size={36} className="banner-icon" />
                    </div>
                    <div className="banner-bottom" style={{ position: 'relative', zIndex: 2 }}>
                      <span className="platform-tag">DISNEY+ ORIGINAL</span>
                      <span className="year-tag">{series.year}</span>
                    </div>
                  </div>

                  <div className="series-card-body">
                    <h3 className="series-title">
                      <Link href={`/movies/${series.slug}`}>{series.title}</Link>
                    </h3>

                    <div className="series-order-meta">
                      <span>Timeline Order #{series.chronologicalOrder}</span>
                      <span>•</span>
                      <span>Rel #{series.releaseOrder}</span>
                    </div>

                    <p className="series-synopsis">{series.synopsis}</p>

                    <div className="series-footer">
                      <Link href={`/movies/${series.slug}`} className="btn-explore">
                        <span>Read Arc Dossier</span>
                        <span>→</span>
                      </Link>
                      <button
                        onClick={() => toggleWatched(series.slug)}
                        className={`btn-watched ${watched ? 'btn-watched-active' : ''}`}
                      >
                        <CheckCircle size={14} />
                        <span>{watched ? 'Watched' : 'Watchlist'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .series-page-container { min-height: 100vh; }
        .series-header {
          padding-top: 2rem;
          padding-bottom: 2rem;
          background: linear-gradient(180deg, var(--midnight-2) 0%, var(--midnight) 100%);
          border-bottom: 1px solid var(--border);
        }
        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          margin-bottom: 1.25rem;
        }
        .crumb-link { color: var(--text-muted); text-decoration: none; }
        .crumb-link:hover { color: var(--gold); }
        .crumb-sep { color: var(--border-2); }
        .crumb-active { color: var(--gold); font-weight: 500; }

        .page-heading {
          font-family: var(--font-display);
          font-size: 2.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .page-subheading {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          margin-bottom: 2.25rem;
          max-width: 680px;
        }

        .controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.875rem 1.25rem;
          background: var(--midnight-2);
          border: 1px solid var(--border-2);
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          min-width: 260px;
        }
        .search-icon { color: var(--text-muted); }
        .filter-input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.875rem;
          width: 100%;
          outline: none;
        }
        .phase-chips {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .phase-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-right: 0.25rem;
        }
        .chip-btn {
          background: var(--navy);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.75rem;
          padding: 0.35rem 0.75rem;
          cursor: pointer;
        }
        .chip-btn-active {
          background: var(--red-bright);
          color: white;
          border-color: var(--red-bright);
        }

        /* Series Grid */
        .series-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
        .series-card {
          display: flex;
          flex-direction: column;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          overflow: hidden;
        }
        .series-card-banner {
          height: 160px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.25rem;
          position: relative;
        }
        .banner-top {
          display: flex;
          gap: 0.5rem;
          z-index: 2;
        }
        .banner-center {
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.15);
        }
        .banner-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
        }
        .platform-tag {
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.08em;
        }
        .year-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .series-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .series-title {
          font-family: var(--font-display);
          font-size: 1.375rem;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }
        .series-title a { color: var(--text-primary); text-decoration: none; }
        .series-title a:hover { color: var(--gold); }

        .series-order-meta {
          font-size: 0.6875rem;
          color: var(--gold-muted);
          font-weight: 600;
          margin-bottom: 0.75rem;
          display: flex;
          gap: 0.4rem;
        }
        .series-synopsis {
          font-size: 0.8125rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .series-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border);
          padding-top: 1rem;
        }
        .btn-explore {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--gold);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .btn-watched {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.6875rem;
          padding: 0.3rem 0.6rem;
          cursor: pointer;
        }
        .btn-watched-active {
          background: rgba(34, 197, 94, 0.1);
          border-color: #22c55e;
          color: #22c55e;
        }

        @media (max-width: 1024px) {
          .series-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .series-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

