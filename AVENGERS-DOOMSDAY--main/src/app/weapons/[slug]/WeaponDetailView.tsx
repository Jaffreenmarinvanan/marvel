'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { weapons, getWeaponBySlug } from '@/data/weapons';
import { movies } from '@/data/movies';
import { Shield, Zap, Sparkles, Film, ArrowRight, ArrowLeft } from 'lucide-react';

const Weapon3DViewer = dynamic(() => import('@/components/Weapon3DViewer'), {
  ssr: false,
  loading: () => <div className="hologram-loading-placeholder">LOADING 3D WEAPON MODEL...</div>,
});

const HAS_3D_WEAPON = ['mjolnir', 'stormbreaker', 'captain-america-shield'];

export default function WeaponDetailView({ slug }: { slug: string }) {
  const item = getWeaponBySlug(slug);

  if (!item) {
    return null;
  }

  // Resolve film appearances
  const itemMovies = movies.filter((m) => item.appearances.includes(m.slug));

  // Resolve related items in same category
  const relatedWeapons = weapons
    .filter((w) => w.category === item.category && w.slug !== item.slug)
    .slice(0, 3);

  return (
    <div className="weapon-detail-container">
      {/* 1. HERO HEADER */}
      <section
        className="weapon-hero"
        style={{
          background: `linear-gradient(180deg, ${item.accentColor || '#c9a84c'}22 0%, var(--midnight) 100%)`,
        }}
      >
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <Link href="/weapons" className="crumb-link">Weapons & Relics</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{item.name}</span>
          </div>

          <div className="hero-grid">
            <div className="hero-text">
              <div className="badge-row">
                <span className="badge badge-gold">{item.category.toUpperCase()}</span>
                <span className="badge badge-slate">{item.material || 'MYSTICAL METALLURGY'}</span>
              </div>

              <h1 className="item-title">{item.name}</h1>
              <div className="item-origin-sub">{item.origin}</div>

              <p className="item-lead">{item.description}</p>

              <div className="item-stats-bar card-base">
                <div className="stat-unit">
                  <span className="stat-lbl">Primary Material</span>
                  <span className="stat-val">{item.material || 'Unknown Composition'}</span>
                </div>
                <div className="stat-unit">
                  <span className="stat-lbl">Appearances</span>
                  <span className="stat-val">{item.appearances.length} MCU Releases</span>
                </div>
                <div className="stat-unit">
                  <span className="stat-lbl">Classification</span>
                  <span className="stat-val">{item.category.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Visual Icon / 3D Model Representation */}
            <div className="hero-visual-col">
              <div
                className="visual-box"
                style={{
                  background: `radial-gradient(circle at center, ${item.accentColor || '#c9a84c'}33 0%, #06070a 100%)`,
                  borderColor: item.accentColor || '#c9a84c',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: HAS_3D_WEAPON.includes(item.slug) ? '460px' : 'auto',
                }}
              >
                {HAS_3D_WEAPON.includes(item.slug) ? (
                  <div style={{ width: '100%', height: '100%', minHeight: '440px', position: 'relative', zIndex: 3 }}>
                    <Weapon3DViewer slug={item.slug} autoRotate={true} enableEffects={true} />
                  </div>
                ) : (
                  <>
                    {/* Cutout Image with Fallback */}
                    <img
                      src={item.imageUrl || `/images/weapons/${item.slug}.png`}
                      alt={item.name}
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
                    <div className="visual-monogram" style={{ display: 'none' }}>{item.name.slice(0, 2).toUpperCase()}</div>
                    <div className="visual-tag" style={{ position: 'relative', zIndex: 2 }}>
                      ARMORY ARCHIVE #{item.id.toUpperCase()}
                    </div>
                    <div className="visual-cat" style={{ position: 'relative', zIndex: 2 }}>
                      {item.category.toUpperCase()}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIFICATIONS, POWERS & HISTORY */}
      <section className="section">
        <div className="container-wide">
          <div className="dossier-grid">
            {/* Main Details */}
            <div className="dossier-main">
              {/* Powers & Abilities */}
              <div className="dossier-block">
                <h2 className="block-title">Powers & Supernatural Capabilities</h2>
                <div className="powers-list">
                  {item.powers.map((p, idx) => (
                    <div key={idx} className="power-item card-base">
                      <Zap size={16} className="text-gold" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Line of Custody */}
              <div className="dossier-block">
                <h2 className="block-title">Historical Owners & Wielders</h2>
                <div className="owners-list">
                  {item.previousOwners.map((owner, idx) => (
                    <div key={idx} className="owner-card card-base">
                      <span className="owner-num">0{idx + 1}</span>
                      <span className="owner-name">{owner}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Events */}
              <div className="dossier-block">
                <h2 className="block-title">Key Canonical Events</h2>
                <ul className="events-bullets">
                  {item.majorEvents.map((evt, idx) => (
                    <li key={idx} className="event-bullet-card card-base">
                      <span>✦</span>
                      <p>{evt}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Current Status */}
              <div className="dossier-block">
                <h2 className="block-title">Current Canonical Status</h2>
                <div className="status-box card-base">
                  <p>{item.currentStatus}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="dossier-side">
              {/* MCU Appearances */}
              <div className="side-card card-base">
                <div className="side-head">
                  <Film size={16} className="text-gold" />
                  <h3 className="side-title">Film & Series Appearances</h3>
                </div>
                <div className="appearances-list">
                  {itemMovies.map((m) => (
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

              {/* Related in Armory */}
              {relatedWeapons.length > 0 && (
                <div className="side-card card-base">
                  <div className="side-head">
                    <Shield size={16} className="text-gold" />
                    <h3 className="side-title">Related In Armory</h3>
                  </div>
                  <div className="related-items-list">
                    {relatedWeapons.map((rw) => (
                      <Link key={rw.slug} href={`/weapons/${rw.slug}`} className="related-item">
                        <span>{rw.name}</span>
                        <span className="badge badge-slate">{rw.category}</span>
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
        .weapon-detail-container { min-height: 100vh; }
        .weapon-hero {
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
          gap: 3.5rem;
          align-items: center;
        }
        .badge-row { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; }
        .item-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4.5vw, 3.75rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 0.35rem;
        }
        .item-origin-sub {
          font-size: 1.125rem;
          color: var(--gold);
          margin-bottom: 1.5rem;
        }
        .item-lead {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .item-stats-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--navy);
          border: 1px solid var(--border);
        }
        .stat-unit { display: flex; flex-direction: column; }
        .stat-lbl {
          font-size: 0.6875rem;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }
        .stat-val {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .hero-visual-col { display: flex; justify-content: center; }
        .visual-box {
          width: 100%;
          max-width: 320px;
          aspect-ratio: 1 / 1.2;
          border: 1px solid;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }
        .visual-tag {
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.1em;
        }
        .visual-monogram {
          font-family: var(--font-display);
          font-size: 5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.15);
          text-align: center;
          margin: auto 0;
        }
        .visual-cat {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-align: right;
          letter-spacing: 0.08em;
        }

        /* Dossier */
        .dossier-grid {
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

        .powers-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        .power-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          font-size: 0.9375rem;
          color: var(--text-primary);
        }

        .owners-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .owner-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1.25rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
        }
        .owner-num {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--gold);
        }
        .owner-name { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }

        .events-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .event-bullet-card {
          display: flex;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }
        .event-bullet-card span { color: var(--gold); flex-shrink: 0; }

        .status-box {
          padding: 1.5rem;
          background: var(--navy);
          border: 1px solid var(--border);
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        /* Sidebar */
        .dossier-side { display: flex; flex-direction: column; gap: 2rem; }
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

        .appearances-list { display: flex; flex-direction: column; gap: 0.75rem; }
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

        .related-items-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .related-item {
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
          .hero-grid { grid-template-columns: 1fr; }
          .dossier-grid { grid-template-columns: 1fr; }
          .hero-visual-col { order: -1; }
        }
        @media (max-width: 640px) {
          .item-stats-bar { grid-template-columns: 1fr; }
          .owners-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

