'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, Film, Tv, LayoutGrid, List, ArrowUpDown,
  CheckCircle, Clock, X, Layers, Zap, SortAsc,
} from 'lucide-react';
import { useDynamicData } from '@/hooks/useDynamicData';
import { useStore } from '@/store';
import type { Movie } from '@/types';
import { ChromaGrid } from '@/components/ChromaGrid/ChromaGrid';
import ShinyText from '@/components/ReactBits/ShinyText';
import DecryptedText from '@/components/ReactBits/DecryptedText';
import CountUp from '@/components/ReactBits/CountUp';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const PHASE_COLORS: Record<number, string> = {
  0: '#f59e0b',
  1: '#c9a84c',
  2: '#60a5fa',
  3: '#f87171',
  4: '#a78bfa',
  5: '#34d399',
  6: '#ec4899',
};

function getPosterData(movie: Movie, mediaMap?: Record<string, any>) {
  if (movie.posterUrl) return { image: movie.posterUrl, accent: movie.posterColor ?? '#c9a84c' };
  const entry = mediaMap?.[movie.slug];
  if (entry) return { image: entry.image, accent: entry.accent || movie.posterColor || '#c9a84c' };
  return { image: '', accent: movie.posterColor ?? '#c9a84c' };
}

function getChromaItems(movieList: Movie[], mediaMap?: Record<string, any>) {
  return movieList.map((m) => {
    const poster = getPosterData(m, mediaMap);
    return {
      image: poster.image,
      title: m.title,
      subtitle: `${m.year} · Phase ${m.phase}`,
      accent: poster.accent,
      url: `/movies/${m.slug}`,
      alt: `${m.title} official poster`,
    };
  });
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function MoviesPage() {
  const { movies, mediaMap } = useDynamicData();
  const [search, setSearch] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'movie' | 'series'>('all');
  const [sortBy, setSortBy] = useState<'release' | 'chronological' | 'year' | 'runtime'>('release');
  const [viewMode, setViewMode] = useState<'chroma' | 'grid' | 'table'>('chroma');

  const { isWatched, toggleWatched } = useStore();

  const filteredMovies = useMemo(() => {
    return movies
      .filter((m) => {
        const q = search.toLowerCase();
        const matchesSearch =
          m.title.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.synopsis.toLowerCase().includes(q);
        const matchesPhase = selectedPhase === 'all' || m.phase === selectedPhase;
        const matchesType = selectedType === 'all' || m.type === selectedType;
        return matchesSearch && matchesPhase && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'release') return a.releaseOrder - b.releaseOrder;
        if (sortBy === 'chronological') return a.chronologicalOrder - b.chronologicalOrder;
        if (sortBy === 'year') return a.year - b.year;
        if (sortBy === 'runtime') return b.runtime - a.runtime;
        return 0;
      });
  }, [search, selectedPhase, selectedType, sortBy]);

  const chromaItems = useMemo(() => getChromaItems(filteredMovies, mediaMap), [filteredMovies, mediaMap]);

  const hasActiveFilters =
    search !== '' || selectedPhase !== 'all' || selectedType !== 'all' || sortBy !== 'release';

  const clearFilters = () => {
    setSearch('');
    setSelectedPhase('all');
    setSelectedType('all');
    setSortBy('release');
  };

  // Responsive columns based on screen — ChromaGrid handles it via CSS
  const chromaCols = 5;

  return (
    <div className="movies-page-container">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="movies-header">
        <div className="container-wide">
          {/* Breadcrumb */}
          <div className="header-breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">Movies &amp; Series</span>
          </div>

          {/* Page title */}
          <div className="page-title-block">
            <div className="page-title-eyebrow text-label text-gold">
              <DecryptedText text="MARVEL CINEMATIC UNIVERSE" animateOn="view" />
            </div>
            <h1 className="page-heading">
              <ShinyText text="The Marvel Collection" speed={4} shineColor="#c9a84c" />
            </h1>
            <p className="page-subheading">
              Every chapter. Every hero. Every moment that shaped the universe.
            </p>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Search + Sort + View Controls                                    */}
          {/* ---------------------------------------------------------------- */}
          <div className="controls-bar card-base">
            {/* Search */}
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search titles, directors, keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="filter-input"
              />
              {search && (
                <button onClick={() => setSearch('')} className="search-clear-btn" aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="sort-box">
              <ArrowUpDown size={15} className="sort-icon" />
              <span className="sort-label">Order:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="sort-select"
              >
                <option value="release">Release Order</option>
                <option value="chronological">Chronological Order</option>
                <option value="year">Release Year</option>
                <option value="runtime">Runtime (Longest)</option>
              </select>
            </div>

            {/* View toggle */}
            <div className="view-toggle">
              <button
                onClick={() => setViewMode('chroma')}
                className={`view-btn ${viewMode === 'chroma' ? 'view-btn-active' : ''}`}
                title="Chroma Gallery"
                aria-label="Chroma Gallery View"
              >
                <Layers size={16} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`view-btn ${viewMode === 'grid' ? 'view-btn-active' : ''}`}
                title="Standard Grid"
                aria-label="Standard Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`view-btn ${viewMode === 'table' ? 'view-btn-active' : ''}`}
                title="Table View"
                aria-label="Table View"
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Filter Chips                                                      */}
          {/* ---------------------------------------------------------------- */}
          <div className="filter-chips-row">
            <div className="type-toggle-group">
              <button
                onClick={() => setSelectedType('all')}
                className={`chip-btn ${selectedType === 'all' ? 'chip-btn-active' : ''}`}
              >
                All Releases ({movies.length})
              </button>
              <button
                onClick={() => setSelectedType('movie')}
                className={`chip-btn ${selectedType === 'movie' ? 'chip-btn-active' : ''}`}
              >
                <Film size={13} />
                <span>Theatrical Films</span>
              </button>
              <button
                onClick={() => setSelectedType('series')}
                className={`chip-btn ${selectedType === 'series' ? 'chip-btn-active' : ''}`}
              >
                <Tv size={13} />
                <span>TV Series</span>
              </button>
            </div>

            <div className="phase-chips-group">
              <span className="phase-label">Phase:</span>
              {(['all', 0, 1, 2, 3, 4, 5, 6] as const).map((phase) => (
                <button
                  key={phase}
                  onClick={() => setSelectedPhase(phase)}
                  className={`chip-btn-subtle ${selectedPhase === phase ? 'chip-subtle-active' : ''}`}
                  style={
                    selectedPhase === phase && phase !== 'all'
                      ? { borderColor: PHASE_COLORS[phase as number], color: PHASE_COLORS[phase as number] }
                      : undefined
                  }
                >
                  {phase === 'all'
                    ? 'All Phases'
                    : phase === 0
                    ? 'Phase 0 (Origins & Mutants)'
                    : phase === 6
                    ? 'Phase 6 (The Endgame)'
                    : `Phase ${phase}`}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button onClick={clearFilters} className="clear-filters-btn">
                <X size={13} />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CONTENT                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="section">
        <div className="container-wide">
          {/* Results summary */}
          <div className="results-summary">
            <span>
              Showing <strong><CountUp to={filteredMovies.length} duration={1} /></strong> archival{' '}
              {filteredMovies.length === 1 ? 'entry' : 'entries'}
            </span>
            {sortBy === 'chronological' && (
              <span className="badge badge-gold">SORTED CHRONOLOGICALLY IN-UNIVERSE</span>
            )}
            {sortBy === 'release' && (
              <span className="badge badge-slate">SORTED BY THEATRICAL PREMIERE</span>
            )}
            {viewMode === 'chroma' && (
              <span className="badge-chroma-hint">
                <Zap size={12} />
                Hover cards to reveal in full color
              </span>
            )}
          </div>

          {/* ============================================================== */}
          {/* CHROMA GRID VIEW                                                */}
          {/* ============================================================== */}
          {viewMode === 'chroma' && (
            <div className="chroma-section">
              {filteredMovies.length === 0 ? (
                <div className="empty-state">
                  <Film size={40} className="empty-icon" />
                  <p>No entries match your filters.</p>
                  <button onClick={clearFilters} className="btn-secondary">Clear Filters</button>
                </div>
              ) : (
                <ChromaGrid
                  items={chromaItems}
                  columns={chromaCols}
                  minCardWidth={160}
                  gap={14}
                  radius={260}
                  softness={0.65}
                  damping={0.4}
                  fadeOut={0.55}
                  grayscale={1}
                  dim={0.08}
                  glow={0.6}
                  borderGlow={1}
                  reveal="card"
                  aspectRatio="2 / 3"
                  cardRadius={14}
                  showInfo={true}
                  frame={false}
                  theme="dark"
                  className="marvel-chroma-grid"
                />
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* STANDARD GRID VIEW                                              */}
          {/* ============================================================== */}
          {viewMode === 'grid' && (
            <div className="movies-grid">
              {filteredMovies.length === 0 ? (
                <div className="empty-state full-span">
                  <Film size={40} className="empty-icon" />
                  <p>No entries match your filters.</p>
                  <button onClick={clearFilters} className="btn-secondary">Clear Filters</button>
                </div>
              ) : (
                filteredMovies.map((movie) => {
                  const watched = isWatched(movie.slug);
                  const poster = getPosterData(movie, mediaMap);
                  return (
                    <div key={movie.id} className="movie-card card-base card-hover">
                      <Link href={`/movies/${movie.slug}`} className="movie-poster-wrap">
                        <div
                          className="movie-poster"
                          style={{ background: `linear-gradient(135deg, ${poster.accent} 0%, #000000 100%)` }}
                        >
                          {poster.image ? (
                            <img
                              src={poster.image}
                              alt={`${movie.title} poster`}
                              className="movie-poster-img"
                            />
                          ) : (
                            <div className="poster-title-watermark">{movie.title.split(' ')[0]}</div>
                          )}
                          <div className="poster-top-chips">
                            <span className="badge badge-red">PHASE {movie.phase}</span>
                            <span className="badge badge-slate">{movie.type.toUpperCase()}</span>
                          </div>
                          <div className="poster-bottom-meta">
                            <span className="poster-year">{movie.year}</span>
                            <span className="poster-runtime">
                              <Clock size={12} />
                              {movie.runtime}m
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="movie-card-body">
                        <div className="card-order-track">
                          <span>Release #{movie.releaseOrder}</span>
                          <span>•</span>
                          <span>Timeline #{movie.chronologicalOrder}</span>
                        </div>
                        <h3 className="card-title">
                          <Link href={`/movies/${movie.slug}`}>{movie.title}</Link>
                        </h3>
                        <p className="card-director">Dir. {movie.director}</p>
                        <p className="card-synopsis">{movie.synopsis}</p>
                        <div className="card-actions">
                          <Link href={`/movies/${movie.slug}`} className="btn-detail">
                            <span>Archival Dossier</span>
                            <span>→</span>
                          </Link>
                          <button
                            onClick={() => toggleWatched(movie.slug)}
                            className={`btn-watched ${watched ? 'btn-watched-active' : ''}`}
                            title={watched ? 'Mark as unwatched' : 'Mark as watched'}
                          >
                            <CheckCircle size={15} />
                            <span>{watched ? 'Watched' : 'Watchlist'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TABLE VIEW                                                      */}
          {/* ============================================================== */}
          {viewMode === 'table' && (
            <div className="table-wrapper card-base">
              <table className="mcu-table">
                <thead>
                  <tr>
                    <th>Rel #</th>
                    <th>Chrono #</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Phase</th>
                    <th>Year</th>
                    <th>Director</th>
                    <th>Runtime</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovies.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No results. <button onClick={clearFilters} style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer' }}>Clear filters</button>
                      </td>
                    </tr>
                  ) : (
                    filteredMovies.map((movie) => (
                      <tr key={movie.id}>
                        <td className="text-muted text-mono">{movie.releaseOrder}</td>
                        <td className="text-muted text-mono">{movie.chronologicalOrder}</td>
                        <td>
                          <Link href={`/movies/${movie.slug}`} className="table-link">
                            {movie.title}
                          </Link>
                        </td>
                        <td>
                          <span className={`badge ${movie.type === 'movie' ? 'badge-red' : 'badge-slate'}`}>
                            {movie.type === 'movie' ? 'Film' : 'Series'}
                          </span>
                        </td>
                        <td>
                          <span
                            className="badge badge-slate"
                            style={{ borderColor: PHASE_COLORS[movie.phase], color: PHASE_COLORS[movie.phase] }}
                          >
                            Phase {movie.phase}
                          </span>
                        </td>
                        <td className="text-muted">{movie.year}</td>
                        <td className="text-muted">{movie.director}</td>
                        <td className="text-muted text-mono">
                          {movie.runtime > 0 ? `${movie.runtime}m` : '—'}
                        </td>
                        <td>
                          <span
                            className={`badge ${movie.status === 'released' ? 'badge-green' : movie.status === 'upcoming' ? 'badge-gold' : 'badge-slate'}`}
                          >
                            {movie.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* STYLES                                                               */}
      {/* ------------------------------------------------------------------ */}
      <style jsx>{`
        .movies-page-container {
          min-height: 100vh;
          background: #000000;
        }

        .movies-header {
          background: #000000;
          border-bottom: 1px solid var(--border);
          padding: 2rem 0;
        }

        .header-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }
        .crumb-link {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.15s;
        }
        .crumb-link:hover { color: var(--gold); }
        .crumb-sep { opacity: 0.4; }
        .crumb-active { color: var(--text-secondary); }

        .page-title-block {
          margin-bottom: 2rem;
        }
        .page-title-eyebrow {
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          margin-bottom: 0.5rem;
        }
        .page-heading {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.75rem;
        }
        .page-subheading {
          font-size: 1.0625rem;
          color: var(--text-muted);
          max-width: 540px;
          line-height: 1.6;
          font-style: italic;
        }

        .controls-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .search-box {
          flex: 1;
          min-width: 200px;
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 0.75rem;
          color: var(--text-muted);
          pointer-events: none;
        }
        .filter-input {
          width: 100%;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.55rem 2.25rem 0.55rem 2.5rem;
          font-size: 0.875rem;
          color: var(--text-primary);
          outline: none;
          font-family: var(--font-body);
          transition: border-color 0.2s;
        }
        .filter-input:focus { border-color: var(--gold); }
        .filter-input::placeholder { color: var(--text-muted); }
        .search-clear-btn {
          position: absolute;
          right: 0.6rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
        }
        .search-clear-btn:hover { color: var(--text-primary); }

        .sort-box {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
        }
        .sort-icon, .sort-label { color: var(--text-muted); font-size: 0.8rem; }
        .sort-select {
          background: var(--midnight-2);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 0.45rem 0.65rem;
          font-size: 0.8125rem;
          color: var(--text-primary);
          cursor: pointer;
          font-family: var(--font-body);
        }

        .view-toggle {
          display: flex;
          gap: 0.25rem;
          flex-shrink: 0;
        }
        .view-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.15s;
        }
        .view-btn:hover { color: var(--text-primary); border-color: var(--gold); }
        .view-btn-active {
          background: var(--gold);
          border-color: var(--gold);
          color: #0b0d14;
        }

        .filter-chips-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding-top: 0.25rem;
        }
        .type-toggle-group, .phase-chips-group {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          flex-wrap: wrap;
        }
        .chip-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.85rem;
          border: 1px solid var(--border);
          border-radius: 9999px;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.8rem;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.18s;
          white-space: nowrap;
        }
        .chip-btn:hover { color: var(--text-primary); border-color: var(--text-muted); }
        .chip-btn-active {
          background: var(--gold);
          border-color: var(--gold);
          color: #0b0d14;
          font-weight: 600;
        }
        .chip-btn-subtle {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.7rem;
          border: 1px solid var(--border);
          border-radius: 9999px;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.18s;
          white-space: nowrap;
        }
        .chip-btn-subtle:hover { color: var(--text-primary); border-color: var(--text-muted); }
        .chip-subtle-active { font-weight: 600; }
        .phase-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .clear-filters-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.7rem;
          border: 1px solid rgba(193, 18, 31, 0.4);
          border-radius: 9999px;
          background: transparent;
          color: #f87171;
          font-size: 0.75rem;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.18s;
          margin-left: auto;
        }
        .clear-filters-btn:hover { background: rgba(193,18,31,0.1); }

        /* Results summary */
        .results-summary {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          color: var(--text-muted);
          flex-wrap: wrap;
        }
        .results-summary strong { color: var(--text-primary); }
        .badge-chroma-hint {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          color: var(--gold);
          margin-left: auto;
          opacity: 0.85;
        }

        /* ============================================================ */
        /* CHROMA GRID SECTION                                           */
        /* ============================================================ */
        .chroma-section {
          position: relative;
        }
        :global(.marvel-chroma-grid) {
          --chroma-cols: 5;
        }
        @media (max-width: 1280px) {
          :global(.marvel-chroma-grid) { --chroma-cols: 4; }
        }
        @media (max-width: 1024px) {
          :global(.marvel-chroma-grid) { --chroma-cols: 3; }
        }
        @media (max-width: 640px) {
          :global(.marvel-chroma-grid) { --chroma-cols: 2; }
        }
        @media (max-width: 400px) {
          :global(.marvel-chroma-grid) { --chroma-cols: 1; }
        }

        /* ============================================================ */
        /* STANDARD GRID VIEW                                            */
        /* ============================================================ */
        .movies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .movie-card { border-radius: 12px; overflow: hidden; }
        .movie-poster-wrap { display: block; text-decoration: none; }
        .movie-poster {
          position: relative;
          aspect-ratio: 2 / 3;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1rem;
          min-height: 200px;
          overflow: hidden;
        }
        .movie-poster-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .movie-poster .poster-top-chips,
        .movie-poster .poster-bottom-meta {
          position: relative;
          z-index: 1;
        }
        .poster-top-chips { display: flex; gap: 0.4rem; }
        .poster-title-watermark {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 5rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.05);
          letter-spacing: -0.04em;
          pointer-events: none;
          user-select: none;
        }
        .poster-bottom-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }
        .poster-year {
          font-size: 0.8rem;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          font-family: var(--font-body);
        }
        .poster-runtime {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
        }
        .movie-card-body { padding: 1rem; }
        .card-order-track {
          display: flex;
          gap: 0.4rem;
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .card-title {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }
        .card-title a { text-decoration: none; color: var(--text-primary); }
        .card-title a:hover { color: var(--gold); }
        .card-director { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem; }
        .card-synopsis {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .card-actions { display: flex; gap: 0.5rem; }
        .btn-detail {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.9rem;
          background: var(--gold);
          color: #0b0d14;
          font-size: 0.8rem;
          font-weight: 700;
          border-radius: 6px;
          text-decoration: none;
          font-family: var(--font-body);
          transition: opacity 0.15s;
          flex: 1;
          justify-content: center;
        }
        .btn-detail:hover { opacity: 0.9; }
        .btn-watched {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.45rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.8rem;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .btn-watched:hover { border-color: var(--text-muted); color: var(--text-primary); }
        .btn-watched-active { border-color: #4ade80; color: #4ade80; }

        /* ============================================================ */
        /* TABLE VIEW                                                    */
        /* ============================================================ */
        .table-wrapper { border-radius: 12px; overflow-x: auto; padding: 0; }
        .mcu-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        .mcu-table th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
        }
        .mcu-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          color: var(--text-secondary);
          vertical-align: middle;
          white-space: nowrap;
        }
        .mcu-table tr:last-child td { border-bottom: none; }
        .mcu-table tr:hover td { background: rgba(201,168,76,0.04); }
        .table-link { color: var(--text-primary); text-decoration: none; }
        .table-link:hover { color: var(--gold); }
        .text-mono { font-family: monospace; }

        /* Badges */
        .badge-green {
          display: inline-flex;
          align-items: center;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: rgba(74, 222, 128, 0.12);
          border: 1px solid rgba(74, 222, 128, 0.35);
          color: #4ade80;
        }

        /* Empty state */
        .empty-state {
          text-align: center;
          padding: 5rem 2rem;
          color: var(--text-muted);
        }
        .empty-state.full-span { grid-column: 1 / -1; }
        .empty-icon { margin: 0 auto 1rem; opacity: 0.3; display: block; }
        .btn-secondary {
          margin-top: 1rem;
          padding: 0.5rem 1.25rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: transparent;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.875rem;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .btn-secondary:hover { border-color: var(--gold); color: var(--gold); }
      `}</style>
    </div>
  );
}
