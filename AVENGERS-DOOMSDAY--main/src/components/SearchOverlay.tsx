'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store';
import { searchAll } from '@/data';
import type { SearchResult } from '@/types';

export default function SearchOverlay() {
  const router = useRouter();
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery } = useStore();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [focused, setFocused] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [searchOpen, setSearchQuery]);

  useEffect(() => {
    if (searchQuery) {
      setResults(searchAll(searchQuery));
      setFocused(0);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
      if (!searchOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocused(f => Math.min(f + 1, Math.max(results.length - 1, 0)));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocused(f => Math.max(f - 1, 0));
      }
      if (e.key === 'Enter' && results[focused]) {
        e.preventDefault();
        setSearchOpen(false);
        router.push(results[focused].url);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchOpen, results, focused, setSearchOpen, router]);

  if (!searchOpen) return null;

  const typeLabels: Record<string, string> = {
    movie: 'Film',
    character: 'Character',
    stone: 'Infinity Stone',
    weapon: 'Weapon',
    location: 'Location',
    technology: 'Technology',
    team: 'Team',
  };

  return (
    <div className="search-overlay" role="dialog" aria-label="Search" aria-modal="true">
      {/* Backdrop */}
      <div
        className="search-backdrop"
        onClick={() => setSearchOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="search-panel">
        <div className="search-header">
          <div className="search-input-wrap">
            <Search size={18} className="search-icon-left" />
            <input
              ref={inputRef}
              className="search-input"
              type="text"
              placeholder="Search heroes, movies, artifacts, events..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search Marvel Archives"
              aria-autocomplete="list"
              aria-controls="search-results"
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            className="search-close"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          >
            <span className="text-caption">ESC</span>
          </button>
        </div>

        <div id="search-results" role="listbox" aria-label="Search results">
          {searchQuery && results.length === 0 && (
            <div className="search-empty">
              <p className="text-caption">No results for <em>"{searchQuery}"</em></p>
              <p className="text-caption" style={{ marginTop: '0.25rem' }}>Try searching for a character name, movie, or artifact.</p>
            </div>
          )}

          {!searchQuery && (
            <div className="search-hints">
              <p className="search-hint-title text-label">Quick searches</p>
              <div className="search-quick-links">
                {['Iron Man', 'Thanos', 'Infinity Stones', 'Mjolnir', 'Endgame'].map(q => (
                  <button
                    key={q}
                    className="search-quick-btn"
                    onClick={() => setSearchQuery(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <ul className="search-result-list" role="listbox">
              {results.map((r, i) => (
                <li key={r.id} role="option" aria-selected={i === focused}>
                  <Link
                    href={r.url}
                    className={`search-result-item ${i === focused ? 'search-result-focused' : ''}`}
                    onClick={() => setSearchOpen(false)}
                  >
                    <div className="search-result-info">
                      <span className="search-result-title">{r.title}</span>
                      {r.subtitle && (
                        <span className="search-result-sub">{r.subtitle}</span>
                      )}
                    </div>
                    <div className="search-result-meta">
                      <span className="badge badge-slate">{typeLabels[r.type] || r.type}</span>
                      <ArrowRight size={14} className="search-result-arrow" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <style jsx>{`
        .search-overlay {
          position: fixed;
          inset: 0;
          /* Keep the modal above fixed docks, navigation, and page-level HUDs. */
          z-index: 1100;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(24px, 10vh, 96px) 16px 16px;
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .search-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(8px);
        }
        .search-panel {
          position: relative;
          width: 100%;
          max-width: 680px;
          max-height: calc(100dvh - clamp(24px, 10vh, 96px) - 16px);
          background: #050505;
          border: 1px solid var(--border-2);
          z-index: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: fade-in 0.2s var(--ease-out);
        }
        #search-results {
          min-height: 0;
          overflow-y: auto;
        }
        .search-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0 1.25rem;
          border-bottom: 1px solid var(--border);
        }
        .search-input-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .search-icon-left {
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 1rem;
          padding: 1rem 0;
        }
        .search-input::placeholder {
          color: var(--text-muted);
        }
        .search-clear {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
        }
        .search-clear:hover { color: var(--text-primary); }
        .search-close {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 0.25rem 0.5rem;
          cursor: pointer;
          white-space: nowrap;
        }
        .search-empty {
          padding: 2rem 1.5rem;
          text-align: center;
        }
        .search-hints {
          padding: 1.25rem 1.5rem;
        }
        .search-hint-title {
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }
        .search-quick-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .search-quick-btn {
          background: var(--navy);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 0.75rem;
          padding: 0.375rem 0.875rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .search-quick-btn:hover {
          border-color: var(--gold-muted);
          color: var(--gold);
        }
        .search-result-list {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: min(400px, 60dvh);
          overflow-y: auto;
        }
        .search-result-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.875rem 1.5rem;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          transition: background 0.15s ease;
        }
        .search-result-item:hover,
        .search-result-focused {
          background: var(--navy);
        }
        .search-result-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .search-result-title {
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--text-primary);
        }
        .search-result-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .search-result-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .search-result-arrow {
          color: var(--text-muted);
          opacity: 0;
          transition: opacity 0.15s ease;
        }
        .search-result-item:hover .search-result-arrow {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
