'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Eye, Film, Search, ArrowRight } from 'lucide-react';

interface EasterEgg {
  id: string;
  movie: string;
  year: number;
  phase: number;
  category: 'Foreshadowing' | 'Stan Lee Cameo' | 'Comic Callback' | 'Universe Connection';
  title: string;
  scene: string;
  significance: string;
}

const easterEggsData: EasterEgg[] = [
  {
    id: 'egg1',
    movie: 'Avengers: Age of Ultron',
    year: 2015,
    phase: 2,
    category: 'Foreshadowing',
    title: 'Steve Rogers Budges Mjolnir',
    scene: 'During the Avengers Tower penthouse celebration, the heroes take turns attempting to lift Thor\'s hammer. When Steve Rogers grips the handle, the hammer visibly squeaks and moves a millimeter, causing Thor\'s face to fall into genuine panic before Steve feigns inability.',
    significance: 'Direct foreshadowing of the climactic moment in Avengers: Endgame (2019) when Captain America summons Mjolnir to fight Thanos. As confirmed by the Russo brothers, Steve was always worthy in 2015, but politely stopped to preserve Thor\'s ego.',
  },
  {
    id: 'egg2',
    movie: 'Iron Man',
    year: 2008,
    phase: 1,
    category: 'Comic Callback',
    title: '"I Am Iron Man" Theatrical Departure',
    scene: 'At the concluding press conference, Tony Stark holds cue cards prepared by S.H.I.E.L.D. with a cover story about a bodyguard in a gold-titanium suit. Instead, he pauses, looks at the press corps, and announces: "The truth is... I am Iron Man."',
    significance: 'Departed completely from 40 years of comic book secret identity tropes. Eleven years later in Avengers: Endgame (2019), Tony utters these exact same words as his final act before snapping Thanos and his army into dust.',
  },
  {
    id: 'egg3',
    movie: 'Thor: Ragnarok',
    year: 2017,
    phase: 3,
    category: 'Universe Connection',
    title: 'Hela Declares Odin\'s Infinity Gauntlet "Fake!"',
    scene: 'Striding through Odin\'s underground vault in Asgard, Hela inspects ancient artifacts. Coming upon a right-handed Infinity Gauntlet with all six stones, she casually pushes it off its plinth, shouting "Fake!"',
    significance: 'Brilliantly resolved an 8-year continuity question dating back to 2011\'s Thor, where a full Infinity Gauntlet was spotted in the background. Hela confirmed Odin kept a replica to project universal omnipotence.',
  },
  {
    id: 'egg4',
    movie: 'Captain America: The First Avenger',
    year: 2011,
    phase: 1,
    category: 'Comic Callback',
    title: 'The Original Human Torch (Jim Hammond)',
    scene: 'At the 1943 Stark World Expo, Steve Rogers and Bucky Barnes walk past a glass tube display containing an android in a red bodysuit labeled "Dr. Phineas Horton Presents: The Synthetic Man."',
    significance: 'A direct homage to Marvel Comics\' very first superhero from Marvel Comics #1 (1939) — Jim Hammond, the android Human Torch.',
  },
  {
    id: 'egg5',
    movie: 'Doctor Strange',
    year: 2016,
    phase: 3,
    category: 'Universe Connection',
    title: 'The Neurosurgeon Patient Call Before the Crash',
    scene: 'Seconds before Stephen Strange crashes his Lamborghini, his colleague Billy calls to pitch prospective surgical patients, including a 35-year-old Marine Colonel with a crushed spine from experimental mechanical armor.',
    significance: 'While director Scott Derrickson clarified it was not Colonel Rhodes, it highlighted the hazardous proliferation of private exo-suit engineering attempts following Iron Man 2 and Civil War.',
  },
  {
    id: 'egg6',
    movie: 'Avengers: Endgame',
    year: 2023,
    phase: 3,
    category: 'Stan Lee Cameo',
    title: 'Stan Lee\'s Final MCU Theatrical Cameo',
    scene: 'When Tony Stark and Steve Rogers travel back in time to Camp Lehigh in 1970, a digitally de-aged Stan Lee drives past in a muscle car with a bumper sticker reading "Nuff Said," shouting "Hey man, make love, not war!"',
    significance: 'The final cameo filmed by Marvel\'s legendary co-creator before his passing in November 2018, celebrating his 1970s cultural icon persona.',
  },
  {
    id: 'egg7',
    movie: 'The Avengers',
    year: 2012,
    phase: 1,
    category: 'Foreshadowing',
    title: 'Tony\'s Tower Blueprint Hints at the Team',
    scene: 'When Agent Coulson brings Tony Stark the classified files on the Avengers Initiative, the holographic Stark Tower blueprints glitch, leaving only one letter illuminated on the facade: the iconic "A."',
    significance: 'Foreshadows Stark Tower\'s conversion into Avengers Tower following the Battle of New York, where the other letters fall off during the Chitauri bombardment.',
  },
  {
    id: 'egg8',
    movie: 'Captain America: The Winter Soldier',
    year: 2014,
    phase: 2,
    category: 'Universe Connection',
    title: 'Jasper Sitwell Name-Drops Stephen Strange',
    scene: 'On the rooftop under interrogation by Steve Rogers and Natasha Romanoff, HYDRA agent Jasper Sitwell reveals that Project Insight targets future threats calculated by Zola\'s algorithm: "A TV anchor in Cairo, the Undersecretary of Defense, a high school valedictorian in Iowa City, Bruce Banner, Stephen Strange..."',
    significance: 'Mentioned Stephen Strange as a high-priority threat two full years before 2016\'s Doctor Strange movie was released.',
  },
];

export default function EasterEggsPage() {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredEggs = easterEggsData.filter((e) => {
    const q = search.toLowerCase();
    const matchesSearch =
      e.title.toLowerCase().includes(q) ||
      e.movie.toLowerCase().includes(q) ||
      e.scene.toLowerCase().includes(q) ||
      e.significance.toLowerCase().includes(q);

    const matchesCat =
      selectedCat === 'all' || e.category === selectedCat;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="eggs-page-container">
      {/* Header */}
      <section className="eggs-header">
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">Easter Eggs & Details</span>
          </div>

          <h1 className="page-heading">Easter Eggs, Cameos & Hidden Secrets</h1>
          <p className="page-subheading">
            Deciphering the meticulous background visual details, prophetic foreshadowing, Stan Lee appearances, and deep comic book tributes hidden by Marvel Studios directors across 30+ films.
          </p>

          <div className="controls-bar card-base">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search easter eggs by film, clue, or revelation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="cat-buttons">
              {(['all', 'Foreshadowing', 'Comic Callback', 'Universe Connection', 'Stan Lee Cameo'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`cat-btn ${selectedCat === cat ? 'cat-btn-active' : ''}`}
                >
                  {cat === 'all' ? 'All Secrets' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section">
        <div className="container-wide">
          <div className="results-count">
            <span>Revealing <strong>{filteredEggs.length}</strong> classified cinematic details</span>
          </div>

          <div className="eggs-grid">
            {filteredEggs.map((egg) => (
              <div key={egg.id} className="egg-card card-base card-hover">
                <div className="egg-top-bar">
                  <span className="badge badge-gold">{egg.category.toUpperCase()}</span>
                  <span className="movie-tag text-caption">{egg.movie} ({egg.year})</span>
                </div>

                <h3 className="egg-title">{egg.title}</h3>

                <div className="scene-block">
                  <span className="scene-label">The Scene:</span>
                  <p className="scene-text">{egg.scene}</p>
                </div>

                <div className="sig-block">
                  <span className="sig-label">Archival Significance:</span>
                  <p className="sig-text">{egg.significance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .eggs-page-container { min-height: 100vh; }
        .eggs-header {
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

        .cat-buttons {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .cat-btn {
          background: var(--navy);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.75rem;
          padding: 0.35rem 0.75rem;
          cursor: pointer;
        }
        .cat-btn-active {
          background: var(--gold);
          color: var(--midnight);
          font-weight: 700;
          border-color: var(--gold);
        }

        .results-count {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        /* Eggs Grid */
        .eggs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .egg-card {
          padding: 2rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
        }
        .egg-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .movie-tag { color: var(--gold-muted); font-weight: 600; }

        .egg-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          line-height: 1.3;
        }

        .scene-block {
          padding: 1rem 1.25rem;
          background: var(--navy);
          border: 1px solid var(--border);
          margin-bottom: 1.25rem;
        }
        .scene-label {
          font-size: 0.6875rem;
          color: var(--gold);
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.35rem;
        }
        .scene-text {
          font-size: 0.8125rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .sig-block {
          border-top: 1px solid var(--border);
          padding-top: 1.25rem;
          flex-grow: 1;
        }
        .sig-label {
          font-size: 0.6875rem;
          color: var(--red-bright);
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.35rem;
        }
        .sig-text {
          font-size: 0.8125rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .eggs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

