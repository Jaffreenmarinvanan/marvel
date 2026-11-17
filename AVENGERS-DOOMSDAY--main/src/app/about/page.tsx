'use client';

import Link from 'next/link';
import { Shield, Sparkles, BookOpen, Compass, Film, Clock, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="about-page-container">
      {/* Header */}
      <section className="about-header">
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">About Marvel Archives</span>
          </div>

          <div className="header-badge-row">
            <span className="badge badge-gold">EDITORIAL PROSPECTUS</span>
            <span className="header-edition">MISSION & DESIGN SYSTEM</span>
          </div>

          <h1 className="page-heading">About Marvel Archives</h1>
          <p className="page-subheading">
            Every Story. Every Hero. Every Detail. A definitive, editorial digital encyclopedia created for true Marvel Cinematic Universe scholars and enthusiasts.
          </p>
        </div>
      </section>

      {/* Main Longform Editorial Layout */}
      <section className="section">
        <div className="container-text">
          <div className="editorial-prose">
            <h2>The Vision: An Interconnected Cinematic Museum</h2>
            <p>
              The Marvel Cinematic Universe is the most expansive, interconnected serialized storytelling achievement in the history of cinema. Spanning more than three dozen theatrical films, groundbreaking television series, and hundreds of characters, the narrative web weaves together cosmic singularities, subatomic quantum physics, Norse divine mythology, African futurism, and multiversal branching realities.
            </p>
            <p>
              <strong>MARVEL ARCHIVES</strong> was conceived not simply as a database or landing page, but as a living archival institution — an interactive digital museum that honors the architectural complexity of this universe. Rather than presenting isolated wiki stubs, every hero dossier links back to their armor schematics, the battles they fought, the Infinity Stones that shaped their destiny, and the specific minutes of screen time across fifteen years of canon.
            </p>

            <hr className="divider-solid my-8" />

            <h2>Art Direction & Design Philosophy</h2>
            <p>
              Traditional entertainment wikis and fan portals are frequently cluttered with intrusive advertisements, garish neon gradients, and generic templates. In direct contrast, Marvel Archives adheres to the aesthetic principles of high-end editorial archives and prestigious cultural institutions:
            </p>
            <ul className="principles-list">
              <li>
                <strong>Deep Midnight Navy (#0b0d14):</strong> The primary surface ground, evoking the depth of cosmic space and the prestige of a physical archive.
              </li>
              <li>
                <strong>Muted Metallic Gold (#c9a84c):</strong> Restrained, dignified highlights reflecting Asgardian metallurgy and the sacred glow of the Infinity Gauntlet.
              </li>
              <li>
                <strong>Restrained Cinematic Red (#c1121f):</strong> Selected accents honoring the Marvel heritage without overwhelming the typographic hierarchy.
              </li>
              <li>
                <strong>Editorial Serif Typography (Cormorant Garamond):</strong> Classic, cinematic display headings paired with clean, modern sans-serif body text (Plus Jakarta Sans).
              </li>
            </ul>

            <hr className="divider-solid my-8" />

            <h2>Comprehensive Knowledge Architecture</h2>
            <p>
              Our encyclopedia covers every documented domain across Phase One through Phase Five:
            </p>
            <div className="coverage-grid">
              <div className="cov-card card-base">
                <Film size={20} className="text-gold" />
                <h4>Theatrical Films & Series</h4>
                <p>All Marvel Studios releases indexed by both release order and strict in-universe chronology.</p>
              </div>
              <div className="cov-card card-base">
                <Shield size={20} className="text-gold" />
                <h4>Heroes & Antagonists</h4>
                <p>Complete personnel dossiers, aliases, combat capabilities, armor series, and relationship matrices.</p>
              </div>
              <div className="cov-card card-base">
                <Sparkles size={20} className="text-gold" />
                <h4>Infinity Stones Vault</h4>
                <p>Interactive Infinity Gauntlet simulator mapping the 6 singularities, their custodians, and the Snap.</p>
              </div>
              <div className="cov-card card-base">
                <Clock size={20} className="text-gold" />
                <h4>Chronological Timeline</h4>
                <p>Sequential historical record from Steve Rogers' transformation in 1942 to the post-Blip multiverse.</p>
              </div>
            </div>

            <hr className="divider-solid my-8" />

            <h2>Educational Disclaimer & Intellectual Property</h2>
            <div className="disclaimer-callout card-base">
              <p>
                <strong>MARVEL ARCHIVES</strong> is an unofficial, non-commercial fan-curated educational project. It is not affiliated with, authorized by, sponsored by, or endorsed by Marvel Studios, Marvel Entertainment, LLC, The Walt Disney Company, or any of their subsidiaries.
              </p>
              <p className="mt-4">
                All Marvel Cinematic Universe characters, names, storylines, imagery, and related indicia are registered trademarks and copyright of Marvel Studios and The Walt Disney Company. All data, summaries, and analyses are synthesized for educational, analytical, and archival purposes under Fair Use doctrine.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page-container { min-height: 100vh; }
        .about-header {
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
          max-width: 680px;
        }

        /* Editorial Prose */
        .editorial-prose h2 {
          font-family: var(--font-display);
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .editorial-prose p {
          font-size: 1.0625rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        .editorial-prose strong {
          color: var(--text-primary);
        }

        .principles-list {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .principles-list li {
          padding-left: 1.5rem;
          border-left: 3px solid var(--gold);
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }
        .principles-list strong { color: var(--gold); }

        .coverage-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .cov-card {
          padding: 1.5rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
        }
        .cov-card h4 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 0.75rem;
          margin-bottom: 0.4rem;
        }
        .cov-card p {
          font-size: 0.8125rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin: 0;
        }

        .disclaimer-callout {
          padding: 2rem;
          background: var(--navy);
          border: 1px solid var(--border);
          margin-top: 2rem;
        }
        .disclaimer-callout p {
          font-size: 0.8125rem;
          line-height: 1.7;
          color: var(--text-muted);
          margin: 0;
        }
        .disclaimer-callout strong { color: var(--gold); }

        @media (max-width: 640px) {
          .coverage-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
