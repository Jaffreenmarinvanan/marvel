// @ts-nocheck
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, Shield, Users, LayoutGrid, List, X, Layers, Zap,
} from 'lucide-react';
import { useDynamicData } from '@/hooks/useDynamicData';
import type { Character } from '@/types';
import { ChromaGrid } from '@/components/ChromaGrid/ChromaGrid';
import ShinyText from '@/components/ReactBits/ShinyText';
import DecryptedText from '@/components/ReactBits/DecryptedText';
import CountUp from '@/components/ReactBits/CountUp';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const TYPE_COLORS: Record<string, string> = {
  hero: '#3b82f6',
  antiHero: '#f59e0b',
  supporting: '#22c55e',
};

const STATUS_COLORS: Record<string, string> = {
  alive: '#4ade80',
  deceased: '#f87171',
  unknown: '#94a3b8',
};

function getHeroImage(char: Character) {
  if (char.imageUrl) return char.imageUrl;
  return '';
}

function getHeroAccent(char: Character) {
  return char.portraitColor ?? '#3b82f6';
}

function getChromaItems(list: Character[]) {
  return list.map((c) => ({
    image: getHeroImage(c),
    title: c.name,
    subtitle: c.realName || c.species || '',
    accent: getHeroAccent(c),
    url: `/heroes/${c.slug}`,
    alt: `${c.name} portrait`,
  }));
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function HeroesEncyclopediaPage() {
  const { heroes } = useDynamicData();
  const [search, setSearch] = useState('');
  const [selectedAffiliation, setSelectedAffiliation] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'chroma' | 'grid' | 'table'>('chroma');

  const affiliations = useMemo(() => {
    const all = heroes.flatMap((h) => h.affiliation);
    return ['all', ...Array.from(new Set(all)).slice(0, 7)];
  }, []);

  const statuses = ['all', 'alive', 'deceased', 'unknown'];

  const filteredHeroes = useMemo(() => {
    return heroes.filter((h) => {
      const q = search.toLowerCase();
      const matchesSearch =
        h.name.toLowerCase().includes(q) ||
        (h.realName && h.realName.toLowerCase().includes(q)) ||
        (h.actor && h.actor.toLowerCase().includes(q)) ||
        h.powers.some((p) => p.toLowerCase().includes(q));
      const matchesAff =
        selectedAffiliation === 'all' || h.affiliation.includes(selectedAffiliation);
      const matchesStatus =
        selectedStatus === 'all' || h.status === selectedStatus;
      return matchesSearch && matchesAff && matchesStatus;
    });
  }, [search, selectedAffiliation, selectedStatus]);

  const chromaItems = useMemo(() => getChromaItems(filteredHeroes), [filteredHeroes]);

  const hasActiveFilters = search !== '' || selectedAffiliation !== 'all' || selectedStatus !== 'all';

  const clearFilters = () => {
    setSearch('');
    setSelectedAffiliation('all');
    setSelectedStatus('all');
  };

  return (
    <div className="heroes-page-container">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="heroes-header">
        <div className="container-wide">
          {/* Breadcrumb */}
          <div className="header-breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">Heroes Encyclopedia</span>
          </div>

          {/* Page title */}
          <div className="page-title-block">
            <div className="page-title-eyebrow text-label text-gold">
              <DecryptedText text="MARVEL CINEMATIC UNIVERSE — PERSONNEL DIVISION" animateOn="view" />
            </div>
            <h1 className="page-heading">
              <ShinyText text="Earth's Mightiest Heroes" speed={4} shineColor="#3b82f6" />
            </h1>
            <p className="page-subheading">
              Every defender. Every champion. Every soul who stood against the darkness.
            </p>
          </div>

          {/* Search + View Controls */}
          <div className="controls-bar card-base">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search heroes, real names, actors, powers..."
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

            {/* Status filter */}
            <div className="sort-box">
              <Shield size={15} className="sort-icon" />
              <span className="sort-label">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="sort-select"
              >
                <option value="all">All Statuses</option>
                <option value="alive">Alive</option>
                <option value="deceased">Deceased</option>
                <option value="unknown">Unknown</option>
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

          {/* Filter Chips */}
          <div className="filter-chips-row">
            <div className="type-toggle-group">
              <button
                onClick={() => setSelectedAffiliation('all')}
                className={`chip-btn ${selectedAffiliation === 'all' ? 'chip-btn-active' : ''}`}
              >
                All Heroes ({heroes.length})
              </button>
              {affiliations.slice(1).map((aff) => (
                <button
                  key={aff}
                  onClick={() => setSelectedAffiliation(aff)}
                  className={`chip-btn ${selectedAffiliation === aff ? 'chip-btn-active' : ''}`}
                >
                  <Users size={13} />
                  <span>{aff}</span>
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
              Showing <strong><CountUp to={filteredHeroes.length} duration={1} /></strong> heroes{' '}
              {hasActiveFilters && <span className="text-muted">(filtered)</span>}
            </span>
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
              {filteredHeroes.length === 0 ? (
                <div className="empty-state">
                  <Shield size={40} className="empty-icon" />
                  <p>No heroes match your filters.</p>
                  <button onClick={clearFilters} className="btn-secondary">Clear Filters</button>
                </div>
              ) : (
                <ChromaGrid
                  items={chromaItems}
                  columns={5}
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
              {filteredHeroes.length === 0 ? (
                <div className="empty-state full-span">
                  <Shield size={40} className="empty-icon" />
                  <p>No heroes match your filters.</p>
                  <button onClick={clearFilters} className="btn-secondary">Clear Filters</button>
                </div>
              ) : (
                filteredHeroes.map((char) => {
                  const accent = getHeroAccent(char);
                  const img = getHeroImage(char);
                  return (
                    <div key={char.id} className="movie-card card-base card-hover">
                      <Link href={`/heroes/${char.slug}`} className="movie-poster-wrap">
                        <div
                          className="movie-poster"
                          style={{ background: `linear-gradient(135deg, ${accent} 0%, #050608 100%)` }}
                        >
                          {img ? (
                            <img
                              src={img}
                              alt={`${char.name} portrait`}
                              className="movie-poster-img"
                            />
                          ) : (
                            <div className="poster-title-watermark" style={{ color: accent }}>
                              {char.name.split(' ')[0]}
                            </div>
                          )}
                          <div className="poster-top-chips">
                            <span
                              className="badge badge-red"
                              style={{ background: `${accent}22`, borderColor: accent, color: accent }}
                            >
                              {char.type.toUpperCase()}
                            </span>
                            {char.model3dUrl && (
                              <span
                                className="badge"
                                style={{ background: 'rgba(56, 189, 248, 0.9)', borderColor: '#38bdf8', color: '#031e2e', fontWeight: 900 }}
                              >
                                3D MODEL
                              </span>
                            )}
                          </div>
                          <div className="poster-bottom-meta">
                            <span
                              className="poster-year"
                              style={{ color: STATUS_COLORS[char.status] ?? '#94a3b8' }}
                            >
                              ● {(char.status ?? 'unknown').toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="movie-card-body">
                        <div className="card-order-track">
                          <span>{char.species}</span>
                          <span>•</span>
                          <span>{char.homeworld}</span>
                        </div>
                        <h3 className="card-title">
                          <Link href={`/heroes/${char.slug}`}>{char.name}</Link>
                        </h3>
                        {char.realName && (
                          <p className="card-director">{char.realName}</p>
                        )}
                        {char.actor && (
                          <p className="card-director" style={{ color: 'var(--text-muted)' }}>
                            Portrayed by {char.actor}
                          </p>
                        )}
                        <p className="card-synopsis">
                          {char.biography?.slice(0, 110)}...
                        </p>
                        <div className="card-actions">
                          <Link href={`/heroes/${char.slug}`} className="btn-detail">
                            <span>Full Dossier</span>
                            <span>→</span>
                          </Link>
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
                    <th>Hero</th>
                    <th>Real Name</th>
                    <th>Actor</th>
                    <th>Species</th>
                    <th>Status</th>
                    <th>Affiliation</th>
                    <th>First Appearance</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHeroes.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No results. <button onClick={clearFilters} style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer' }}>Clear filters</button>
                      </td>
                    </tr>
                  ) : (
                    filteredHeroes.map((char) => (
                      <tr key={char.id}>
                        <td>
                          <Link href={`/heroes/${char.slug}`} className="table-link" style={{ fontWeight: 600, color: getHeroAccent(char) }}>
                            {char.name}
                          </Link>
                        </td>
                        <td className="text-muted">{char.realName || '—'}</td>
                        <td className="text-muted">{char.actor || '—'}</td>
                        <td className="text-muted">{char.species}</td>
                        <td>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '9999px',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: STATUS_COLORS[char.status] ?? '#94a3b8',
                            background: `${STATUS_COLORS[char.status] ?? '#94a3b8'}18`,
                            border: `1px solid ${STATUS_COLORS[char.status] ?? '#94a3b8'}44`,
                          }}>
                            {char.status ?? 'unknown'}
                          </span>
                        </td>
                        <td className="text-muted">{char.affiliation.slice(0, 2).join(', ')}</td>
                        <td className="text-muted text-mono">{char.firstAppearance?.replace(/-/g, ' ')}</td>
                        <td>
                          <Link href={`/heroes/${char.slug}`} className="btn-detail" style={{ padding: '0.3rem 0.7rem', fontSize: '0.75rem' }}>
                            View →
                          </Link>
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

      <style>{`
        .heroes-page-container {
          min-height: 100vh;
          background: var(--bg-primary);
          padding-bottom: 6rem;
        }
        .heroes-header {
          padding: 2.5rem 0 2rem;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(180deg, rgba(59,130,246,0.04) 0%, transparent 100%);
        }
        .header-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .crumb-link {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.15s;
        }
        .crumb-link:hover { color: var(--gold); }
        .crumb-sep { opacity: 0.4; }
        .crumb-active { color: var(--text-primary); }
        .page-title-block { margin-bottom: 2rem; }
        .page-title-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          margin-bottom: 0.6rem;
        }
        .text-label { font-weight: 700; text-transform: uppercase; font-family: var(--font-body); }
        .text-gold { color: var(--gold); }
        .page-heading {
          font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 900;
          margin: 0 0 0.5rem;
          color: var(--text-primary);
          font-family: var(--font-heading);
          letter-spacing: -0.01em;
        }
        .page-subheading {
          color: var(--text-secondary);
          font-size: 1rem;
          margin: 0;
          max-width: 540px;
        }

        /* Controls bar */
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
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
        }
        .search-icon { color: var(--text-muted); flex-shrink: 0; }
        .filter-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: var(--font-body);
        }
        .filter-input::placeholder { color: var(--text-muted); }
        .search-clear-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          padding: 0;
          transition: color 0.15s;
        }
        .search-clear-btn:hover { color: var(--text-primary); }
        .sort-box {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          white-space: nowrap;
        }
        .sort-icon { color: var(--text-muted); }
        .sort-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
        .sort-select {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-primary);
          font-size: 0.85rem;
          font-family: var(--font-body);
          padding: 0.3rem 0.6rem;
          cursor: pointer;
          outline: none;
        }
        .view-toggle {
          display: flex;
          gap: 0.3rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.2rem;
          background: var(--bg-secondary);
        }
        .view-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.15s;
        }
        .view-btn:hover { color: var(--text-primary); background: rgba(255,255,255,0.05); }
        .view-btn-active { background: var(--gold) !important; color: #0b0d14 !important; }

        /* Filter chips */
        .filter-chips-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .type-toggle-group { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; flex: 1; }
        .chip-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          font-family: var(--font-body);
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .chip-btn:hover { border-color: var(--text-secondary); color: var(--text-primary); }
        .chip-btn-active { background: var(--gold); border-color: var(--gold); color: #0b0d14 !important; }
        .clear-filters-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          border: 1px solid rgba(248,113,113,0.4);
          background: rgba(248,113,113,0.08);
          color: #f87171;
          cursor: pointer;
          font-family: var(--font-body);
          transition: all 0.15s;
          white-space: nowrap;
        }
        .clear-filters-btn:hover { background: rgba(248,113,113,0.15); }

        /* Section */
        .section { padding: 2rem 0; }
        .container-wide { max-width: 1400px; margin: 0 auto; padding: 0 1.5rem; }

        /* Results summary */
        .results-summary {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          flex-wrap: wrap;
        }
        .results-summary strong { color: var(--text-primary); }
        .text-muted { color: var(--text-muted); }
        .badge-chroma-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          color: var(--gold);
          opacity: 0.8;
        }

        /* Chroma section */
        .chroma-section { width: 100%; }
        .marvel-chroma-grid { width: 100%; }

        /* Standard grid */
        .movies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.25rem;
        }
        .movie-card {
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .movie-poster-wrap { display: block; text-decoration: none; }
        .movie-poster {
          position: relative;
          aspect-ratio: 2 / 3;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .movie-poster-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .movie-card:hover .movie-poster-img { transform: scale(1.04); }
        .poster-title-watermark {
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 900;
          font-family: var(--font-heading);
          opacity: 0.3;
          text-align: center;
          padding: 1rem;
          line-height: 1;
          text-transform: uppercase;
        }
        .poster-top-chips {
          position: absolute;
          top: 0.6rem;
          left: 0.6rem;
          right: 0.6rem;
          display: flex;
          gap: 0.3rem;
          flex-wrap: wrap;
        }
        .poster-bottom-meta {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem 0.75rem 0.6rem;
          background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.75rem;
        }
        .poster-year { font-weight: 700; font-size: 0.7rem; letter-spacing: 0.05em; }
        .movie-card-body { padding: 0.9rem; flex: 1; display: flex; flex-direction: column; gap: 0.3rem; }
        .card-order-track {
          display: flex;
          gap: 0.4rem;
          font-size: 0.7rem;
          color: var(--text-muted);
          font-family: monospace;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .card-title { font-size: 1rem; font-weight: 700; margin: 0; color: var(--text-primary); }
        .card-title a { text-decoration: none; color: inherit; }
        .card-title a:hover { color: var(--gold); }
        .card-director { font-size: 0.8rem; color: var(--text-secondary); margin: 0; }
        .card-synopsis {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0.3rem 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-actions { display: flex; gap: 0.5rem; margin-top: auto; padding-top: 0.75rem; flex-wrap: wrap; }
        .btn-detail {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
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

        /* Badges */
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 1px solid;
        }
        .badge-red { background: rgba(196,30,58,0.15); border-color: rgba(196,30,58,0.4); color: #ef4444; }
        .badge-slate { background: rgba(100,116,139,0.15); border-color: rgba(100,116,139,0.3); color: #94a3b8; }

        /* Table */
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
        .mcu-table tr:hover td { background: rgba(59,130,246,0.04); }
        .table-link { color: var(--text-primary); text-decoration: none; }
        .table-link:hover { color: var(--gold); }
        .text-mono { font-family: monospace; }

        /* Card base */
        .card-base {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
        }
        .card-hover { transition: border-color 0.2s, transform 0.2s; }
        .card-hover:hover { border-color: rgba(201,168,76,0.3); transform: translateY(-2px); }

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
