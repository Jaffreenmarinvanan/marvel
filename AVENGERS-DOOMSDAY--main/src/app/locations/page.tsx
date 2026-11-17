'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Compass, Globe, MapPin, Search, ArrowRight } from 'lucide-react';

interface LocationItem {
  id: string;
  name: string;
  type: 'Earth Metropolis' | 'Hidden Earth Realm' | 'Extraterrestrial World' | 'Cosmic Void / Colony' | 'Subatomic Dimension' | 'Pocket Dimension';
  realm: string;
  significance: string;
  keyEvents: string[];
  notableResidents: string[];
  firstAppearance: string;
  status: 'Intact' | 'Destroyed' | 'Hidden' | 'Altered';
}

const locationsDatabase: LocationItem[] = [
  {
    id: 'loc1',
    name: 'New York City (Earth-616)',
    type: 'Earth Metropolis',
    realm: 'Midgard (Earth)',
    significance: 'The strategic epicenter of the Marvel Cinematic Universe. Home to Stark Tower / Avengers Tower, the New York Sanctum Sanctorum in Greenwich Village, the Queens neighborhood of Spider-Man, and the historic battleground where the Avengers first assembled.',
    keyEvents: [
      'Battle of New York (Chitauri invasion halted by the Avengers)',
      'Incursion of the Black Order at Bleecker Street (Infinity War)',
      'Multiversal villain containment at the Sanctum Sanctorum (No Way Home)',
    ],
    notableResidents: ['Tony Stark', 'Doctor Strange', 'Peter Parker', 'Steve Rogers', 'Matt Murdock'],
    firstAppearance: 'Iron Man (2008)',
    status: 'Intact',
  },
  {
    id: 'loc2',
    name: 'Kingdom of Wakanda',
    type: 'Hidden Earth Realm',
    realm: 'Midgard (Earth)',
    significance: 'An ultra-advanced, isolationist African monarchy shielded by holographic cloaking and founded on the Great Mound of prime vibranium meteorite. Led by the Black Panther and the Dora Milaje, Wakanda represents Earth\'s greatest technological and medical civilization.',
    keyEvents: [
      'Mount Bashenga coup and civil conflict (Killmonger ascension)',
      'The Battle of Wakanda against Thanos\'s Outrider army in Infinity War',
      'The war against Namor and the undersea nation of Talokan',
    ],
    notableResidents: ['T\'Challa', 'Shuri', 'Okoye', 'M\'Baku', 'Ramonda'],
    firstAppearance: 'Captain America: Civil War (2016)',
    status: 'Intact',
  },
  {
    id: 'loc3',
    name: 'Asgard (Realm of the Gods)',
    type: 'Extraterrestrial World',
    realm: 'Yggdrasil (Norse Realm)',
    significance: 'The golden shining seat of the Norse Gods, linked to the Nine Realms by Heimdall\'s Rainbow Bridge (Bifrost). For millennia Odin Allfather ruled here, guarding relics in Odin\'s Vault including the Tesseract and the Eternal Flame.',
    keyEvents: [
      'Dark Elf assault led by Malekith during the Convergence',
      'Hela\'s conquest and massacre of the Einherjar',
      'Ragnarok: Total planetary destruction by the fire demon Surtur to defeat Hela',
    ],
    notableResidents: ['Thor', 'Loki', 'Odin', 'Frigga', 'Heimdall', 'Valkyrie'],
    firstAppearance: 'Thor (2011)',
    status: 'Destroyed',
  },
  {
    id: 'loc4',
    name: 'Knowhere',
    type: 'Cosmic Void / Colony',
    realm: 'The Deep Cosmos',
    significance: 'A lawless mining colony constructed within the severed skull of an ancient Celestial. Miners extract valuable brain tissue, cerebrospinal fluids, and bone marrow. Houses The Collector\'s vast intergalactic menagerie and later became the permanent headquarters of the Guardians of the Galaxy.',
    keyEvents: [
      'Ronan and Nebula attack The Collector\'s museum to seize the Power Stone',
      'Thanos destroys the colony to extract the Reality Stone from The Collector',
      'Rebuilt into a thriving sanctuary and base for the Guardians',
    ],
    notableResidents: ['The Collector (Taneleer Tivan)', 'Rocket', 'Groot', 'Cosmo', 'Nebula'],
    firstAppearance: 'Thor: The Dark World (2013)',
    status: 'Intact',
  },
  {
    id: 'loc5',
    name: 'Vormir',
    type: 'Extraterrestrial World',
    realm: 'Center of Celestial Space',
    significance: 'A desolated, storm-swept purgatory planet situated at the exact astronomical center of celestial space. Guarded by the cursed shade of Johann Schmidt (Red Skull), Vormir is the solitary repository of the Soul Stone, requiring the voluntary sacrifice of an enduring love.',
    keyEvents: [
      'Thanos throws Gamora from the cliff to claim the Soul Stone in 2018',
      'Natasha Romanoff sacrifices herself so Clint Barton can retrieve the stone during the 2023 Time Heist',
    ],
    notableResidents: ['Red Skull (Stonekeeper)'],
    firstAppearance: 'Avengers: Infinity War (2018)',
    status: 'Intact',
  },
  {
    id: 'loc6',
    name: 'The Quantum Realm',
    type: 'Subatomic Dimension',
    realm: 'Microverse Spacetime',
    significance: 'A subatomic microscopic dimension where the conventional rules of space, linear time, and entropy cease to apply. Inhabited by microscopic civilizations and Kang the Conqueror\'s exiled empire, it proved to be the indispensable gateway for the Avengers\' temporal time heist.',
    keyEvents: [
      'Janet van Dyne trapped for 30 years in the subatomic void',
      'Scott Lang survives the Snap inside the Quantum Realm for five hours (equaling five Earth years)',
      'The Avengers traverse Quantum tunnels to retrieve past Infinity Stones',
    ],
    notableResidents: ['Janet van Dyne', 'Hank Pym', 'Kang the Conqueror (Exiled)'],
    firstAppearance: 'Ant-Man (2015)',
    status: 'Intact',
  },
  {
    id: 'loc7',
    name: 'Kamar-Taj',
    type: 'Hidden Earth Realm',
    realm: 'Kathmandu, Nepal',
    significance: 'The ancient monastery and sanctuary where Stephen Strange journeyed to heal his paralyzed hands and discovered the Mystic Arts. Led by the Ancient One and later Wong, it is the school of sorcery that trains sorcerers to defend Earth\'s dimensional integrity.',
    keyEvents: [
      'Kaecilius and the Zealots slaughter Masters and steal forbidden Dark Dimension rituals',
      'Doctor Strange trains in sling ring projection and temporal manipulation',
      'Catastrophic siege by the corrupted Scarlet Witch searching for America Chavez',
    ],
    notableResidents: ['The Ancient One', 'Wong', 'Doctor Strange', 'Karl Mordo'],
    firstAppearance: 'Doctor Strange (2016)',
    status: 'Altered',
  },
  {
    id: 'loc8',
    name: 'The Void (Citadel at the End of Time)',
    type: 'Cosmic Void / Colony',
    realm: 'Entropy Horizon',
    significance: 'A wasteland located at the exact terminal point of all spacetime where the TVA dumps pruned timelines and variants to be devoured by Alioth. Beyond the storm clouds lies the Citadel at the End of Time, where He Who Remains managed the Sacred Timeline.',
    keyEvents: [
      'Loki and Sylvie enchant the trans-temporal cloud beast Alioth',
      'Sylvie murders He Who Remains, triggering the immediate uninhibited branching of the Multiverse',
    ],
    notableResidents: ['He Who Remains', 'Alioth', 'Classic Loki', 'Alligator Loki'],
    firstAppearance: 'Loki (2021)',
    status: 'Intact',
  },
];

export default function LocationsPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredLocations = locationsDatabase.filter((l) => {
    const q = search.toLowerCase();
    const matchesSearch =
      l.name.toLowerCase().includes(q) ||
      l.realm.toLowerCase().includes(q) ||
      l.significance.toLowerCase().includes(q) ||
      l.notableResidents.some((r) => r.toLowerCase().includes(q));

    const matchesType =
      selectedType === 'all' || l.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="locs-page-container">
      {/* Header */}
      <section className="locs-header">
        <div className="container-wide">
          <div className="breadcrumbs">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">Locations & Realms</span>
          </div>

          <h1 className="page-heading">The Multiverse Atlas & Planetary Registry</h1>
          <p className="page-subheading">
            Cosmic coordinates, historical battlegrounds, subatomic dimensions, and sacred sanctuaries across Midgard, Yggdrasil, and the outer universe.
          </p>

          <div className="controls-bar card-base">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search locations by realm, city, resident, or milestone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="type-chips">
              {[
                { id: 'all', label: 'All Realms' },
                { id: 'Earth Metropolis', label: 'Metropolises' },
                { id: 'Hidden Earth Realm', label: 'Hidden Earth' },
                { id: 'Extraterrestrial World', label: 'Alien Worlds' },
                { id: 'Subatomic Dimension', label: 'Subatomic' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className={`chip-btn ${selectedType === t.id ? 'chip-btn-active' : ''}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section">
        <div className="container-wide">
          <div className="results-count">
            <span>Surveying <strong>{filteredLocations.length}</strong> planetary and dimensional sectors</span>
          </div>

          <div className="locs-grid">
            {filteredLocations.map((loc) => (
              <div key={loc.id} className="loc-card card-base card-hover">
                <div className="loc-top-bar">
                  <span className="badge badge-gold">{loc.type.toUpperCase()}</span>
                  <span className={`badge ${loc.status === 'Destroyed' ? 'badge-red' : 'badge-slate'}`}>
                    {loc.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="loc-title">{loc.name}</h3>
                <div className="loc-realm text-caption">Sector: {loc.realm}</div>

                <p className="loc-sig">{loc.significance}</p>

                <div className="events-block">
                  <span className="events-label">Documented Historical Incidents:</span>
                  <ul className="events-list">
                    {loc.keyEvents.map((evt, i) => (
                      <li key={i}>✦ {evt}</li>
                    ))}
                  </ul>
                </div>

                <div className="loc-footer">
                  <div className="residents-row">
                    <span className="residents-label">Key Denizens:</span>
                    <span className="residents-val">{loc.notableResidents.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .locs-page-container { min-height: 100vh; }
        .locs-header {
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

        .type-chips {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .chip-btn {
          background: var(--navy);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.75rem;
          padding: 0.35rem 0.75rem;
          cursor: pointer;
        }
        .chip-btn-active {
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

        /* Locations Grid */
        .locs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .loc-card {
          padding: 2rem;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
        }
        .loc-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .loc-title {
          font-family: var(--font-display);
          font-size: 1.625rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .loc-realm {
          color: var(--gold-muted);
          margin-bottom: 1.25rem;
        }
        .loc-sig {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .events-block {
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        .events-label {
          font-size: 0.6875rem;
          color: var(--gold);
          text-transform: uppercase;
          font-weight: 700;
          display: block;
          margin-bottom: 0.5rem;
        }
        .events-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.8125rem;
          line-height: 1.55;
          color: var(--text-secondary);
        }

        .loc-footer {
          border-top: 1px solid var(--border);
          padding-top: 1rem;
        }
        .residents-row {
          display: flex;
          gap: 0.5rem;
          font-size: 0.8125rem;
        }
        .residents-label {
          color: var(--text-muted);
          font-weight: 600;
          flex-shrink: 0;
        }
        .residents-val {
          color: var(--text-primary);
        }

        @media (max-width: 900px) {
          .locs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

