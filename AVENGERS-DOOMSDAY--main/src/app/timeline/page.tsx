'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Clock, Calendar, Swords, Shield, Sparkles, Search, ArrowRight, Filter } from 'lucide-react';
import { useDynamicData } from '@/hooks/useDynamicData';
import type { TimelineEvent } from '@/types';

export default function TimelinePage() {
  const { timeline } = useDynamicData();
  const [selectedPhase, setSelectedPhase] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [search, setSearch] = useState('');

  const events = useMemo(
    () => [...timeline].sort((a, b) => (a.year || 0) - (b.year || 0)),
    [timeline]
  );

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const q = search.toLowerCase();
      const matchesSearch =
        evt.title.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.characters.some((c) => c.toLowerCase().includes(q));

      const matchesPhase =
        selectedPhase === 'all' || evt.phase === selectedPhase;

      const matchesType =
        selectedType === 'all' || evt.type === selectedType;

      return matchesSearch && matchesPhase && matchesType;
    });
  }, [events, search, selectedPhase, selectedType]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'battle':
        return '#c1121f';
      case 'origin':
        return '#c9a84c';
      case 'snap':
      case 'blip':
        return '#a855f7';
      case 'discovery':
        return '#3b82f6';
      case 'formation':
        return '#10b981';
      default:
        return '#64748b';
    }
  };

  return (
    <div className="timeline-page-container">
      {/* Header */}
      <section className="timeline-header">
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">MCU Chronological Timeline</span>
          </div>

          <div className="header-badge-row">
            <span className="badge badge-gold">IN-UNIVERSE CANONICAL ORDER</span>
            <span className="header-edition">1942 – 2026+</span>
          </div>

          <h1 className="page-heading">The Marvel Cinematic Chronology</h1>
          <p className="page-subheading">
            A strictly chronological historical record of the Marvel Cinematic Universe in-universe timeline — from Steve Rogers' transformation during WWII to the post-Blip multiversal breaches.
          </p>

          <div className="controls-bar card-base">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search historical events, characters, or battles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="type-filter-group">
              <span className="filter-label">Event Category:</span>
              {[
                { id: 'all', label: 'All Events' },
                { id: 'battle', label: 'Battles' },
                { id: 'origin', label: 'Origins' },
                { id: 'snap', label: 'Snaps & Blips' },
                { id: 'discovery', label: 'Discoveries' },
                { id: 'formation', label: 'Alliances' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className={`type-btn ${selectedType === t.id ? 'type-btn-active' : ''}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="phase-chips-row">
            <span className="filter-label">Filter by Phase:</span>
            {(['all', 0, 1, 2, 3, 4, 5, 6] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPhase(p)}
                className={`phase-btn ${selectedPhase === p ? 'phase-btn-active' : ''}`}
              >
                {p === 'all' ? 'All Phases' : `Phase ${p}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Interactive Timeline */}
      <section className="section">
        <div className="container-wide">
          <div className="results-count">
            <span>Tracking <strong>{filteredEvents.length}</strong> sequential historical milestones</span>
          </div>

          <div className="timeline-spine-wrapper">
            <div className="timeline-spine" />

            <div className="timeline-events-flow">
              {filteredEvents.map((evt, idx) => {
                const color = getTypeColor(evt.type);
                const isEven = idx % 2 === 0;

                return (
                  <div key={evt.id} className={`timeline-entry-row ${isEven ? 'row-left' : 'row-right'}`}>
                    {/* Node on central spine */}
                    <div
                      className="spine-node"
                      style={{
                        borderColor: color,
                        boxShadow: `0 0 12px ${color}88`,
                      }}
                    >
                      <div className="node-dot" style={{ backgroundColor: color }} />
                    </div>

                    {/* Timeline Event Card */}
                    <div className="timeline-bubble card-base card-hover" style={{ borderLeftColor: color }}>
                      <div className="bubble-top">
                        <div className="year-badge" style={{ color: color }}>
                          <Clock size={14} />
                          <span>{evt.date || evt.year}</span>
                        </div>
                        <div className="bubble-chips">
                          <span className="badge badge-slate">{evt.type.toUpperCase()}</span>
                          <span className="badge badge-gold">PHASE {evt.phase}</span>
                        </div>
                      </div>

                      <h3 className="bubble-title">{evt.title}</h3>
                      <p className="bubble-desc">{evt.description}</p>

                      <div className="bubble-footer">
                        {evt.movie && (
                          <Link href={`/movies/${evt.movie}`} className="movie-link">
                            <span>Key Record: {evt.movie.replace(/-/g, ' ').toUpperCase()}</span>
                            <ArrowRight size={12} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .timeline-page-container { min-height: 100vh; }
        .timeline-header {
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

        .type-filter-group, .phase-chips-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .filter-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-right: 0.25rem;
        }
        .type-btn, .phase-btn {
          background: var(--navy);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.75rem;
          padding: 0.35rem 0.75rem;
          cursor: pointer;
        }
        .type-btn-active, .phase-btn-active {
          background: var(--gold);
          color: var(--midnight);
          font-weight: 700;
          border-color: var(--gold);
        }

        .results-count {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
        }

        /* Timeline Spine */
        .timeline-spine-wrapper {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        .timeline-spine {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          background: linear-gradient(180deg, var(--gold) 0%, var(--border-2) 50%, var(--border) 100%);
          transform: translateX(-50%);
        }

        .timeline-events-flow {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          position: relative;
        }
        .timeline-entry-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
        }
        .row-left {
          grid-template-areas: "bubble empty";
        }
        .row-right {
          grid-template-areas: "empty bubble";
        }
        .row-left .timeline-bubble {
          grid-area: bubble;
          margin-right: 2.5rem;
        }
        .row-right .timeline-bubble {
          grid-area: bubble;
          margin-left: 2.5rem;
        }

        .spine-node {
          position: absolute;
          top: 24px;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--midnight);
          border: 3px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
        }
        .node-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .timeline-bubble {
          padding: 1.75rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          border-left-width: 4px;
          display: flex;
          flex-direction: column;
        }
        .bubble-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .year-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
        }
        .bubble-chips {
          display: flex;
          gap: 0.35rem;
        }

        .bubble-title {
          font-family: var(--font-display);
          font-size: 1.375rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .bubble-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .bubble-footer {
          border-top: 1px solid var(--border);
          padding-top: 0.75rem;
        }
        .movie-link {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--gold);
          text-decoration: none;
          font-weight: 600;
        }
        .movie-link:hover { text-decoration: underline; }

        @media (max-width: 800px) {
          .timeline-spine { left: 20px; }
          .timeline-entry-row {
            grid-template-columns: 1fr;
            grid-template-areas: "bubble";
            padding-left: 50px;
          }
          .spine-node { left: 20px; }
          .row-left .timeline-bubble, .row-right .timeline-bubble {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}

