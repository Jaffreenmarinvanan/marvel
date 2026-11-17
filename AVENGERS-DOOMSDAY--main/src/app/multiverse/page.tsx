'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Compass, Sparkles, ShieldAlert, GitBranch, ArrowRight } from 'lucide-react';

export default function MultiversePage() {
  const [activeTab, setActiveTab] = useState<'concepts' | 'variants' | 'incursions' | 'realms'>('concepts');

  return (
    <div className="multiverse-page-container">
      {/* Header */}
      <section className="multiverse-header">
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">The Multiverse Archive</span>
          </div>

          <div className="badge-row">
            <span className="badge badge-red">THE MULTIVERSE SAGA</span>
            <span className="badge badge-gold">QUANTUM ENTANGLEMENT & INCURSIONS</span>
          </div>

          <h1 className="page-heading">The Multiverse, Variants & Incursions</h1>
          <p className="page-subheading">
            An infinite continuum of branching realities, quantum variants, forbidden dreamwalking rituals, and cosmic incursions threatening universal collapse.
          </p>

          <div className="tab-bar card-base">
            {[
              { id: 'concepts', label: 'Cosmic Laws & Principles' },
              { id: 'variants', label: 'Documented Variants' },
              { id: 'incursions', label: 'The Incursion Threat' },
              { id: 'realms', label: 'Designated Realities' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`tab-btn ${activeTab === tab.id ? 'tab-btn-active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section">
        <div className="container-wide">
          {/* TAB 1: CONCEPTS */}
          {activeTab === 'concepts' && (
            <div className="tab-pane">
              <div className="concepts-grid">
                <div className="concept-card card-base">
                  <div className="concept-head">
                    <GitBranch size={20} className="text-gold" />
                    <h3>The Sacred Timeline</h3>
                  </div>
                  <p>
                    Established at the climax of the first Multiversal War by He Who Remains. The TVA isolated a collection of co-existing timelines that all shared the identical baseline reality — preventing any timeline branch that would produce a hostile variant of Nathaniel Richards (Kang).
                  </p>
                  <div className="concept-meta text-caption text-gold">Managed by the Time Variance Authority</div>
                </div>

                <div className="concept-card card-base">
                  <div className="concept-head">
                    <Sparkles size={20} className="text-gold" />
                    <h3>Nexus Events & Branching</h3>
                  </div>
                  <p>
                    A deviation from the pre-ordained flow of time. When a sentient being makes a choice that diverges from their programmed timeline path, it causes quantum variance that, if left unpruned past the "red line," crystallizes into an independent, permanent alternate universe.
                  </p>
                  <div className="concept-meta text-caption text-gold">Threshold: Spacetime Crystallization</div>
                </div>

                <div className="concept-card card-base">
                  <div className="concept-head">
                    <Compass size={20} className="text-red" />
                    <h3>Dreamwalking</h3>
                  </div>
                  <p>
                    A forbidden, blasphemous dark spell written in the Darkhold. Allows a sorcerer in one universe to mentally possess and pilot the biological body of their alternate variant in another reality. Severe continuous dreamwalking destabilizes the cosmic fabric connecting both universes.
                  </p>
                  <div className="concept-meta text-caption text-red">Darkhold Black Magic</div>
                </div>

                <div className="concept-card card-base">
                  <div className="concept-head">
                    <ShieldAlert size={20} className="text-red" />
                    <h3>The Loom & The God of Stories</h3>
                  </div>
                  <p>
                    The Temporal Loom converted raw branching time into physical timeline rope until its destruction. In the ultimate sacrifice, Loki replaced the physical machinery with his own divine essence, physically seizing and weaving trillions of dying timelines into Yggdrasil — becoming the God of Stories.
                  </p>
                  <div className="concept-meta text-caption text-gold">Loki's Sovereign Multiversal Throne</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VARIANTS */}
          {activeTab === 'variants' && (
            <div className="tab-pane">
              <div className="variants-grid">
                <div className="variant-group card-base">
                  <h3 className="group-title">The Council of Kangs</h3>
                  <p className="group-sub">Variants of Nathaniel Richards across the infinite multiverse.</p>
                  <ul className="variant-list">
                    <li>
                      <strong>He Who Remains:</strong> The victor of the ancient multiversal war who constructed the TVA.
                    </li>
                    <li>
                      <strong>Kang the Conqueror:</strong> Exiled to the Quantum Realm for attempting to eliminate alternate timelines.
                    </li>
                    <li>
                      <strong>Victor Timely:</strong> 19th-century inventor variant who created temporal prototype engines.
                    </li>
                    <li>
                      <strong>Immortus, Rama-Tut & Centurion:</strong> Leaders of the interdimensional Council of Kangs.
                    </li>
                  </ul>
                </div>

                <div className="variant-group card-base">
                  <h3 className="group-title">Spider-Man Variants</h3>
                  <p className="group-sub">Peter Parkers converging on Earth-616 during the multiversal breach.</p>
                  <ul className="variant-list">
                    <li>
                      <strong>Peter-One (Tom Holland):</strong> Native to Earth-616; defended the multiverse memory spell.
                    </li>
                    <li>
                      <strong>Peter-Two (Tobey Maguire):</strong> Experienced veteran Spider-Man with organic webbing.
                    </li>
                    <li>
                      <strong>Peter-Three (Andrew Garfield):</strong> Agile, grief-stricken Spider-Man redeemed by saving MJ.
                    </li>
                  </ul>
                </div>

                <div className="variant-group card-base">
                  <h3 className="group-title">Loki Variants</h3>
                  <p className="group-sub">Deviations of the Asgardian God of Mischief pruned to the Void.</p>
                  <ul className="variant-list">
                    <li>
                      <strong>Sylvie Laufeydottir:</strong> Female variant hunted since childhood; killed He Who Remains.
                    </li>
                    <li>
                      <strong>Classic Loki (Richard E. Grant):</strong> Master sorcerer who conjured an entire Asgard to deceive Alioth.
                    </li>
                    <li>
                      <strong>Alligator Loki:</strong> Reptilian variant with distinctive golden horned headpiece.
                    </li>
                    <li>
                      <strong>Kid Loki:</strong> Ruler of the Void ruins who killed his own universe's Thor.
                    </li>
                  </ul>
                </div>

                <div className="variant-group card-base">
                  <h3 className="group-title">Doctor Strange Variants</h3>
                  <p className="group-sub">Masters of the Mystic Arts across alternate realities.</p>
                  <ul className="variant-list">
                    <li>
                      <strong>Doctor Strange (Earth-616):</strong> Master of Kamar-Taj and protector of the Eye of Agamotto.
                    </li>
                    <li>
                      <strong>Defender Strange:</strong> Interdimensional sorcerer who sought the Book of Vishanti.
                    </li>
                    <li>
                      <strong>Supreme Strange (Earth-838):</strong> Leader of the Illuminati executed by Black Bolt for causing an incursion.
                    </li>
                    <li>
                      <strong>Sinister Strange:</strong> Corrupted third-eyed sorcerer whose universe collapsed completely.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INCURSIONS */}
          {activeTab === 'incursions' && (
            <div className="tab-pane">
              <div className="incursion-feature card-base">
                <div className="incursion-alert-bar">
                  <ShieldAlert size={24} className="text-red" />
                  <div>
                    <h3 className="incursion-title">The Incursion Protocol</h3>
                    <p className="incursion-sub">The ultimate existential threat to all cosmic existence.</p>
                  </div>
                </div>

                <div className="incursion-content">
                  <p>
                    An <strong>Incursion</strong> occurs when the dimensional boundary between two parallel universes deteriorates to the point of catastrophic collapse. The two universes collide at their mutual Earths, resulting in the total instantaneous obliteration of both realities and their trillions of living beings.
                  </p>
                  <p>
                    Incursions are primarily caused by prolonged multiversal interference — specifically prolonged Dreamwalking, interdimensional portal usage without stabilizing relics, or reckless travel between universes.
                  </p>

                  <div className="incursion-warning-grid">
                    <div className="warning-card">
                      <span className="warning-num">01</span>
                      <h4>Dimensional Thinning</h4>
                      <p>A traveler leaves an unnatural temporal footprint in an alternate reality.</p>
                    </div>
                    <div className="warning-card">
                      <span className="warning-num">02</span>
                      <h4>Cosmic Contraction</h4>
                      <p>The gravitational and quantum fields of the two universes pull toward each other.</p>
                    </div>
                    <div className="warning-card">
                      <span className="warning-num">03</span>
                      <h4>Planetary Annihilation</h4>
                      <p>Both Earths smash into one another; both universes cease to exist in spacetime.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REALMS */}
          {activeTab === 'realms' && (
            <div className="tab-pane">
              <div className="realms-grid">
                {[
                  { id: 'Earth-616', name: 'The Prime Sacred Timeline', desc: 'The core continuity where Iron Man began the era, the Avengers assembled, and Thanos was defeated.' },
                  { id: 'Earth-838', name: 'The Illuminati Reality', desc: 'A utopian universe governed by the Illuminati (Professor X, Reed Richards, Captain Carter, Black Bolt, Captain Marvel, and Mordo).' },
                  { id: 'The Void', name: 'The Terminal Wasteland', desc: 'The dimensional graveyard at the end of time where pruned timelines are consumed by Alioth.' },
                  { id: 'Ta Lo Dimension', name: 'The Great Protector\'s Realm', desc: 'A mystical parallel dimension of bamboo forests and ancient Chinese deities.' },
                  { id: 'Earth-199999', name: 'Archival Universal Index', desc: 'External multiversal designation cataloging the cinematic Marvel continuity.' },
                ].map((r) => (
                  <div key={r.id} className="realm-card card-base card-hover">
                    <span className="badge badge-gold">{r.id}</span>
                    <h4 className="realm-name">{r.name}</h4>
                    <p className="realm-desc">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .multiverse-page-container { min-height: 100vh; }
        .multiverse-header {
          padding-top: 2rem;
          padding-bottom: 2rem;
          background: linear-gradient(180deg, rgba(201, 168, 76, 0.08) 0%, var(--midnight) 100%);
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

        .badge-row { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
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

        .tab-bar {
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem;
          background: var(--midnight-2);
          border: 1px solid var(--border-2);
          flex-wrap: wrap;
        }
        .tab-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .tab-btn:hover { color: var(--text-primary); }
        .tab-btn-active {
          background: var(--navy);
          color: var(--gold);
        }

        /* Concepts */
        .concepts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .concept-card {
          padding: 2rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
        }
        .concept-head {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .concept-head h3 {
          font-family: var(--font-display);
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .concept-card p {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        /* Variants */
        .variants-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .variant-group {
          padding: 2rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
        }
        .group-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .group-sub {
          font-size: 0.8125rem;
          color: var(--gold-muted);
          margin-bottom: 1.25rem;
        }
        .variant-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .variant-list li {
          font-size: 0.8125rem;
          line-height: 1.6;
          color: var(--text-secondary);
          padding-left: 1rem;
          border-left: 2px solid var(--border-2);
        }
        .variant-list strong { color: var(--text-primary); }

        /* Incursions */
        .incursion-feature {
          padding: 2.5rem;
          background: var(--midnight-2);
          border: 1px solid rgba(193, 18, 31, 0.4);
        }
        .incursion-alert-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1.25rem;
        }
        .incursion-title {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--red-bright);
        }
        .incursion-sub { font-size: 0.875rem; color: var(--text-muted); }
        .incursion-content p {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        .incursion-warning-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .warning-card {
          padding: 1.5rem;
          background: var(--navy);
          border: 1px solid var(--border);
        }
        .warning-num {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--red-bright);
          display: block;
          margin-bottom: 0.5rem;
        }
        .warning-card h4 {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }
        .warning-card p {
          font-size: 0.75rem;
          line-height: 1.55;
          color: var(--text-muted);
          margin: 0;
        }

        /* Realms */
        .realms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .realm-card {
          padding: 1.75rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
        }
        .realm-name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .realm-desc {
          font-size: 0.8125rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .concepts-grid { grid-template-columns: 1fr; }
          .variants-grid { grid-template-columns: 1fr; }
          .realms-grid { grid-template-columns: 1fr; }
          .incursion-warning-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

