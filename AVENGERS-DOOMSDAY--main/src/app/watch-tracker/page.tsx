'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CheckCircle, Circle, Bookmark, Clock, Film, Tv, Sparkles, RotateCcw } from 'lucide-react';
import { movies } from '@/data/movies';
import { useStore } from '@/store';

export default function WatchTrackerPage() {
  const { watched, toggleWatched } = useStore();
  const [filterMode, setFilterMode] = useState<'all' | 'watched' | 'unwatched'>('all');

  const totalTitles = movies.length;
  const movieSlugs = useMemo(() => new Set(movies.map((m) => m.slug)), []);
  const watchedCount = watched.filter((slug) => movieSlugs.has(slug)).length;
  const percentComplete = totalTitles ? Math.round((watchedCount / totalTitles) * 100) : 0;

  // Calculate total watched runtime
  const totalRuntimeMinutes = useMemo(() => {
    return movies
      .filter((m) => watched.includes(m.slug))
      .reduce((acc, curr) => acc + (curr.runtime || 0), 0);
  }, [watched]);

  const totalRuntimeHours = Math.round(totalRuntimeMinutes / 60);

  // Group movies by Phase
  const phases = [1, 2, 3, 4, 5];

  return (
    <div className="tracker-page-container">
      {/* Header */}
      <section className="tracker-header">
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">MCU Watch Tracker</span>
          </div>

          <div className="header-badge-row">
            <span className="badge badge-gold">PERSONAL ARCHIVE COMPANION</span>
            <span className="header-edition">STORED IN LOCAL STORAGE</span>
          </div>

          <h1 className="page-heading">The Marvel Cinematic Watch Tracker</h1>
          <p className="page-subheading">
            Track your personal journey through all 34+ theatrical films and Disney+ television series across every phase of the Marvel Cinematic Universe.
          </p>

          {/* Progress Analytics Card */}
          <div className="progress-banner card-base">
            <div className="progress-top-row">
              <div className="progress-stat">
                <span className="stat-label">COMPLETION STATUS</span>
                <span className="stat-number">{percentComplete}%</span>
              </div>
              <div className="progress-divider" />
              <div className="progress-stat">
                <span className="stat-label">TITLES WATCHED</span>
                <span className="stat-number">{watchedCount} <span className="stat-sub">/ {totalTitles}</span></span>
              </div>
              <div className="progress-divider" />
              <div className="progress-stat">
                <span className="stat-label">TIME INVESTED</span>
                <span className="stat-number">{totalRuntimeHours} <span className="stat-sub">HOURS</span></span>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="controls-bar card-base">
            <div className="filter-buttons">
              <button
                onClick={() => setFilterMode('all')}
                className={`filter-btn ${filterMode === 'all' ? 'filter-btn-active' : ''}`}
              >
                All Entries ({totalTitles})
              </button>
              <button
                onClick={() => setFilterMode('watched')}
                className={`filter-btn ${filterMode === 'watched' ? 'filter-btn-active' : ''}`}
              >
                Watched ({watchedCount})
              </button>
              <button
                onClick={() => setFilterMode('unwatched')}
                className={`filter-btn ${filterMode === 'unwatched' ? 'filter-btn-active' : ''}`}
              >
                Unwatched ({totalTitles - watchedCount})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grouped by Phase */}
      <section className="section">
        <div className="container-wide">
          <div className="phases-stack">
            {phases.map((phase) => {
              const phaseMovies = movies.filter((m) => m.phase === phase);
              if (phaseMovies.length === 0) return null;

              const visibleMovies = phaseMovies.filter((m) => {
                const isItemWatched = watched.includes(m.slug);
                if (filterMode === 'watched') return isItemWatched;
                if (filterMode === 'unwatched') return !isItemWatched;
                return true;
              });

              if (visibleMovies.length === 0) return null;

              const phaseWatchedCount = phaseMovies.filter((m) => watched.includes(m.slug)).length;

              return (
                <div key={phase} className="phase-block">
                  <div className="phase-block-head">
                    <div>
                      <span className="badge badge-red">PHASE {phase}</span>
                      <h2 className="phase-heading">
                        {phase === 1 && 'Phase One: Avengers Assembled (2008 – 2012)'}
                        {phase === 2 && 'Phase Two: Cosmic Escalation (2013 – 2015)'}
                        {phase === 3 && 'Phase Three: The Infinity Climax (2016 – 2019)'}
                        {phase === 4 && 'Phase Four: Multiverse Unleashed (2021 – 2022)'}
                        {phase === 5 && 'Phase Five: Kang & Quantum Realms (2023 – Present)'}
                      </h2>
                    </div>
                    <div className="phase-stat-chip">
                      {phaseWatchedCount} of {phaseMovies.length} Completed
                    </div>
                  </div>

                  <div className="tracker-grid">
                    {visibleMovies.map((movie) => {
                      const isItemWatched = watched.includes(movie.slug);
                      return (
                        <div
                          key={movie.id}
                          className={`tracker-card card-base ${isItemWatched ? 'card-watched' : ''}`}
                        >
                          <button
                            onClick={() => toggleWatched(movie.slug)}
                            className="toggle-box"
                            aria-label={isItemWatched ? 'Mark as unwatched' : 'Mark as watched'}
                          >
                            {isItemWatched ? (
                              <CheckCircle size={22} className="check-icon-active" />
                            ) : (
                              <Circle size={22} className="check-icon-idle" />
                            )}
                          </button>

                          <div className="tracker-card-info">
                            <div className="card-top-tags">
                              <span className="text-caption text-gold">Chrono #{movie.chronologicalOrder}</span>
                              <span className="text-caption text-muted">{movie.year} • {movie.runtime}m</span>
                            </div>

                            <h3 className="tracker-movie-title">
                              <Link href={`/movies/${movie.slug}`}>{movie.title}</Link>
                            </h3>
                            <div className="tracker-director text-caption">Dir. {movie.director}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .tracker-page-container { min-height: 100vh; }
        .tracker-header {
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

        .header-badge-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .header-edition {
          font-size: 0.6875rem;
          color: var(--text-muted);
          font-weight: 700;
          letter-spacing: 0.1em;
        }

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
          max-width: 720px;
        }

        /* Progress Card */
        .progress-banner {
          padding: 2rem;
          background: var(--navy);
          border: 1px solid var(--border-2);
          margin-bottom: 1.5rem;
        }
        .progress-top-row {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .progress-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .stat-label {
          font-size: 0.6875rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-bottom: 0.25rem;
        }
        .stat-number {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--gold);
        }
        .stat-sub { font-size: 1.125rem; color: var(--text-muted); }
        .progress-divider {
          width: 1px;
          height: 48px;
          background: var(--border);
        }

        .progress-bar-track {
          width: 100%;
          height: 8px;
          background: var(--midnight-2);
          overflow: hidden;
          border-radius: 4px;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--red-bright) 0%, var(--gold) 100%);
          transition: width 0.4s ease;
        }

        /* Filter Controls */
        .controls-bar {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.25rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
        }
        .filter-buttons {
          display: flex;
          gap: 0.5rem;
        }
        .filter-btn {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 0.8125rem;
          padding: 0.4rem 0.85rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .filter-btn:hover { color: var(--text-primary); }
        .filter-btn-active {
          background: var(--gold);
          color: var(--midnight);
          font-weight: 700;
          border-color: var(--gold);
        }

        /* Phases Stack */
        .phases-stack {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }
        .phase-block-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.85rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .phase-heading {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 0.35rem;
        }
        .phase-stat-chip {
          font-size: 0.8125rem;
          color: var(--gold);
          font-weight: 600;
        }

        /* Tracker Cards */
        .tracker-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .tracker-card {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          transition: all 0.2s ease;
        }
        .card-watched {
          background: rgba(34, 197, 94, 0.04);
          border-color: rgba(34, 197, 94, 0.3);
        }
        .toggle-box {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          margin-top: 0.15rem;
        }
        .check-icon-idle {
          color: var(--text-muted);
          transition: color 0.15s ease;
        }
        .check-icon-idle:hover { color: var(--gold); }
        .check-icon-active {
          color: #22c55e;
        }

        .tracker-card-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .card-top-tags {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }
        .tracker-movie-title {
          font-family: var(--font-display);
          font-size: 1.1875rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
          line-height: 1.3;
        }
        .tracker-movie-title a { color: var(--text-primary); text-decoration: none; }
        .tracker-movie-title a:hover { color: var(--gold); }
        .tracker-director { color: var(--text-muted); }

        @media (max-width: 1024px) {
          .tracker-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .tracker-grid { grid-template-columns: 1fr; }
          .progress-top-row { flex-direction: column; }
          .progress-divider { display: none; }
        }
      `}</style>
    </div>
  );
}

