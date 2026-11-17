'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Users, Shield, Zap, Compass, ArrowRight } from 'lucide-react';
import { characters } from '@/data/characters';
import type { Character } from '@/types';

export default function CharactersDirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');

  const speciesList = useMemo(() => {
    const set = new Set<string>();
    characters.forEach((c) => set.add(c.species));
    return Array.from(set);
  }, []);

  const filteredCharacters = useMemo(() => {
    return characters.filter((c) => {
      const q = search.toLowerCase();
      const matchesSearch =
        c.name.toLowerCase().includes(q) ||
        (c.realName && c.realName.toLowerCase().includes(q)) ||
        c.biography.toLowerCase().includes(q);

      const matchesType = selectedType === 'all' || c.type === selectedType;
      const matchesSpecies = selectedSpecies === 'all' || c.species === selectedSpecies;

      return matchesSearch && matchesType && matchesSpecies;
    });
  }, [search, selectedType, selectedSpecies]);

  const getProfileRoute = (char: Character) => {
    if (char.type === 'villain') return `/villains/${char.slug}`;
    if (char.type === 'hero' || char.type === 'anti-hero') return `/heroes/${char.slug}`;
    return `/characters/${char.slug}`;
  };

  return (
    <div className="chars-page-container">
      <section className="chars-header">
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">Character Directory</span>
          </div>

          <h1 className="page-heading">The Complete MCU Personnel Registry</h1>
          <p className="page-subheading">
            Comprehensive archive containing every documented being, superhuman, antagonist, cosmic entity, and strategic ally across the Marvel Cinematic Universe.
          </p>

          <div className="controls-bar card-base">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, identity, or lore..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="type-filter-group">
              {(['all', 'hero', 'villain', 'anti-hero', 'cosmic', 'supporting'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`type-chip ${selectedType === t ? 'type-chip-active' : ''}`}
                >
                  {t === 'all' ? 'All Roles' : t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="species-row">
            <span className="species-label">Species Classification:</span>
            <button
              onClick={() => setSelectedSpecies('all')}
              className={`species-btn ${selectedSpecies === 'all' ? 'species-btn-active' : ''}`}
            >
              All Species
            </button>
            {speciesList.map((sp) => (
              <button
                key={sp}
                onClick={() => setSelectedSpecies(sp)}
                className={`species-btn ${selectedSpecies === sp ? 'species-btn-active' : ''}`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="results-count">
            <span>Cataloging <strong>{filteredCharacters.length}</strong> universe personnel</span>
          </div>

          <div className="chars-grid">
            {filteredCharacters.map((char) => {
              const route = getProfileRoute(char);
              const monogram = char.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2);

              return (
                <div key={char.id} className="char-card card-base card-hover">
                  <div
                    className="char-avatar-bar"
                    style={{ background: `radial-gradient(circle at center, ${char.portraitColor} 0%, #06070a 100%)` }}
                  >
                    <div className="char-monogram">{monogram}</div>
                    <div className="char-top-badge">
                      <span className={`badge ${char.type === 'villain' ? 'badge-red' : char.type === 'hero' ? 'badge-slate' : 'badge-gold'}`}>
                        {char.type.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="char-body">
                    <span className="char-species">{char.species}</span>
                    <h3 className="char-name">
                      <Link href={route}>{char.name}</Link>
                    </h3>
                    <div className="char-realname">{char.realName || 'Secret Identity'}</div>

                    <p className="char-bio">{char.biography}</p>

                    <div className="char-footer">
                      <span className="appearances-count">{char.appearances.length} Releases</span>
                      <Link href={route} className="btn-link">
                        <span>Dossier</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .chars-page-container { min-height: 100vh; }
        .chars-header {
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
          margin-bottom: 1rem;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          min-width: 250px;
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

        .type-filter-group {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex-wrap: wrap;
        }
        .type-chip {
          background: var(--navy);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.6875rem;
          padding: 0.35rem 0.65rem;
          cursor: pointer;
        }
        .type-chip-active {
          background: var(--gold);
          color: var(--midnight);
          font-weight: 700;
          border-color: var(--gold);
        }

        .species-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .species-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-right: 0.25rem;
        }
        .species-btn {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.6875rem;
          padding: 0.25rem 0.55rem;
          cursor: pointer;
        }
        .species-btn-active {
          background: var(--navy);
          color: var(--text-primary);
          border-color: var(--gold-muted);
        }

        .results-count {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        /* Chars Grid */
        .chars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .char-card {
          display: flex;
          flex-direction: column;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          overflow: hidden;
        }
        .char-avatar-bar {
          height: 140px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1rem;
          position: relative;
        }
        .char-monogram {
          font-family: var(--font-display);
          font-size: 3.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.12);
          text-align: center;
          margin: auto 0;
        }
        .char-top-badge {
          display: flex;
          justify-content: flex-end;
          z-index: 2;
        }

        .char-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .char-species {
          font-size: 0.6875rem;
          color: var(--gold-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.2rem;
        }
        .char-name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.15rem;
        }
        .char-name a { color: var(--text-primary); text-decoration: none; }
        .char-name a:hover { color: var(--gold); }
        .char-realname {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }
        .char-bio {
          font-size: 0.75rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .char-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border);
          padding-top: 0.75rem;
        }
        .appearances-count {
          font-size: 0.6875rem;
          color: var(--text-muted);
        }
        .btn-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--gold);
          text-decoration: none;
        }
        .btn-link:hover { text-decoration: underline; }

        @media (max-width: 1200px) {
          .chars-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .chars-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .chars-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

