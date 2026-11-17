// @ts-nocheck
'use client';

import React, { useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Dock from './Dock/Dock';
import { useStore } from '@/store';
import {
  Film,
  Tv,
  Shield,
  Skull,
  Sparkles,
  Sword,
  Cpu,
  Zap,
  Users,
  MapPin,
  Clock,
  Layers,
  Eye,
  BookmarkCheck,
  Search,
  Compass,
} from 'lucide-react';

interface MarvelDockProps {
  initialCategory?: 'all' | 'explore' | 'archive' | 'discover';
  className?: string;
  showCategoryTabs?: boolean;
  position?: 'bottom' | 'top' | 'left' | 'right';
  autoHide?: boolean;
  baseItemSize?: number;
  magnification?: number;
}

export default function MarvelDock({
  initialCategory = 'all',
  className = '',
  showCategoryTabs = true,
  position = 'bottom',
  autoHide = false,
  baseItemSize = 44,
  magnification = 64,
}: MarvelDockProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setSearchOpen, theme, toggleTheme } = useStore();
  const [activeCategory, setActiveCategory] = useState<'all' | 'explore' | 'archive' | 'discover'>(initialCategory);

  const exploreItems = useMemo(
    () => [
      {
        id: 'movies',
        icon: <Film className="w-5 h-5" style={{ color: '#60a5fa' }} />,
        label: 'Movies',
        active: pathname === '/movies' || pathname.startsWith('/movies/'),
        onClick: () => router.push('/movies'),
        menu: [
          { label: 'All Feature Films', onClick: () => router.push('/movies') },
          { label: 'The Infinity Saga (Phases 1-3)', onClick: () => router.push('/movies') },
          { label: 'The Multiverse Saga (Phases 4-6)', onClick: () => router.push('/movies') },
          { separator: true },
          { label: 'Avengers: Endgame', onClick: () => router.push('/movies/avengers-endgame') },
          { label: 'Avengers: Infinity War', onClick: () => router.push('/movies/avengers-infinity-war') },
        ],
      },
      {
        id: 'tv',
        icon: <Tv className="w-5 h-5" style={{ color: '#38bdf8' }} />,
        label: 'TV Series',
        active: pathname === '/tv',
        onClick: () => router.push('/tv'),
        menu: [
          { label: 'All TV Series', onClick: () => router.push('/tv') },
          { label: 'Disney+ Originals', onClick: () => router.push('/tv') },
          { label: 'Marvel Animation & Specials', onClick: () => router.push('/tv') },
        ],
      },
      {
        id: 'heroes',
        icon: <Shield className="w-5 h-5" style={{ color: '#f87171' }} />,
        label: 'Heroes',
        active: pathname === '/heroes' || pathname.startsWith('/heroes/'),
        onClick: () => router.push('/heroes'),
        menu: [
          { label: 'All Marvel Heroes', onClick: () => router.push('/heroes') },
          { label: 'Iron Man (Tony Stark)', onClick: () => router.push('/heroes/iron-man') },
          { label: 'Captain America (Steve Rogers)', onClick: () => router.push('/heroes/captain-america') },
          { label: 'Thor Odinson', onClick: () => router.push('/heroes/thor') },
          { label: 'Black Panther (T’Challa)', onClick: () => router.push('/heroes/black-panther') },
        ],
      },
      {
        id: 'villains',
        icon: <Skull className="w-5 h-5" style={{ color: '#e879f9' }} />,
        label: 'Villains',
        active: pathname === '/villains' || pathname.startsWith('/villains/'),
        onClick: () => router.push('/villains'),
        menu: [
          { label: 'All Antagonists', onClick: () => router.push('/villains') },
          { label: 'Thanos (The Mad Titan)', onClick: () => router.push('/villains/thanos') },
          { label: 'Kang the Conqueror', onClick: () => router.push('/villains/kang') },
          { label: 'Loki Laufeyson', onClick: () => router.push('/heroes/loki') },
        ],
      },
    ],
    [pathname, router]
  );

  const archiveItems = useMemo(
    () => [
      {
        id: 'infinity-stones',
        icon: <Sparkles className="w-5 h-5" style={{ color: '#38bdf8' }} />,
        label: 'Infinity Stones',
        active: pathname === '/infinity-stones' || pathname.startsWith('/infinity-stones/'),
        onClick: () => router.push('/infinity-stones'),
        menu: [
          { label: 'The Six Infinity Stones', onClick: () => router.push('/infinity-stones') },
          { label: 'Space Stone (Tesseract)', onClick: () => router.push('/infinity-stones/space-stone') },
          { label: 'Mind Stone (Vision)', onClick: () => router.push('/infinity-stones/mind-stone') },
          { label: 'Reality Stone (Aether)', onClick: () => router.push('/infinity-stones/reality-stone') },
          { label: 'Power Stone (Orb)', onClick: () => router.push('/infinity-stones/power-stone') },
          { label: 'Time Stone (Eye of Agamotto)', onClick: () => router.push('/infinity-stones/time-stone') },
          { label: 'Soul Stone (Vormir)', onClick: () => router.push('/infinity-stones/soul-stone') },
        ],
      },
      {
        id: 'weapons',
        icon: <Sword className="w-5 h-5" style={{ color: '#f59e0b' }} />,
        label: 'Weapons & Artifacts',
        active: pathname === '/weapons' || pathname.startsWith('/weapons/'),
        onClick: () => router.push('/weapons'),
        menu: [
          { label: 'All Weapons & Relics', onClick: () => router.push('/weapons') },
          { label: 'Mjolnir (Enchanted Hammer)', onClick: () => router.push('/weapons/mjolnir') },
          { label: 'Stormbreaker', onClick: () => router.push('/weapons/stormbreaker') },
          { label: 'Infinity Gauntlet', onClick: () => router.push('/weapons/infinity-gauntlet') },
          { label: 'The Ten Rings', onClick: () => router.push('/weapons/ten-rings') },
        ],
      },
      {
        id: 'technology',
        icon: <Cpu className="w-5 h-5" style={{ color: '#2dd4bf' }} />,
        label: 'Technology',
        active: pathname === '/technology',
        onClick: () => router.push('/technology'),
        menu: [
          { label: 'Advanced Technologies', onClick: () => router.push('/technology') },
          { label: 'Stark Arc Reactor & Nanotech', onClick: () => router.push('/technology') },
          { label: 'Pym Particles & Quantum Tech', onClick: () => router.push('/technology') },
          { label: 'Wakandan Vibranium Science', onClick: () => router.push('/technology') },
        ],
      },
      {
        id: 'powers',
        icon: <Zap className="w-5 h-5" style={{ color: '#34d399' }} />,
        label: 'Superpowers',
        active: pathname === '/powers',
        onClick: () => router.push('/powers'),
        menu: [
          { label: 'All Superpowers & Abilities', onClick: () => router.push('/powers') },
          { label: 'Mystic Arts & Sorcery', onClick: () => router.push('/powers') },
          { label: 'Super Soldier Serum', onClick: () => router.push('/powers') },
          { label: 'Chaos Magic', onClick: () => router.push('/powers') },
        ],
      },
      {
        id: 'teams',
        icon: <Users className="w-5 h-5" style={{ color: '#818cf8' }} />,
        label: 'Teams & Orgs',
        active: pathname === '/teams',
        onClick: () => router.push('/teams'),
        menu: [
          { label: 'All Teams & Organizations', onClick: () => router.push('/teams') },
          { label: 'The Avengers', onClick: () => router.push('/teams') },
          { label: 'Guardians of the Galaxy', onClick: () => router.push('/teams') },
          { label: 'The Illuminati (Earth-838)', onClick: () => router.push('/teams') },
          { label: 'The Thunderbolts', onClick: () => router.push('/teams') },
        ],
      },
      {
        id: 'locations',
        icon: <MapPin className="w-5 h-5" style={{ color: '#fb7185' }} />,
        label: 'Locations & Realms',
        active: pathname === '/locations',
        onClick: () => router.push('/locations'),
        menu: [
          { label: 'All Locations & Realms', onClick: () => router.push('/locations') },
          { label: 'New York City (Earth-616)', onClick: () => router.push('/locations') },
          { label: 'Kingdom of Wakanda', onClick: () => router.push('/locations') },
          { label: 'Realm of Asgard', onClick: () => router.push('/locations') },
          { label: 'The Quantum Realm', onClick: () => router.push('/locations') },
        ],
      },
    ],
    [pathname, router]
  );

  const discoverItems = useMemo(
    () => [
      {
        id: 'timeline',
        icon: <Clock className="w-5 h-5" style={{ color: '#fbbf24' }} />,
        label: 'MCU Timeline',
        active: pathname === '/timeline',
        onClick: () => router.push('/timeline'),
        menu: [
          { label: 'Chronological Timeline Explorer', onClick: () => router.push('/timeline') },
          { label: 'Infinity Saga (1942–2019)', onClick: () => router.push('/timeline') },
          { label: 'Multiverse Saga (2020–2026+)', onClick: () => router.push('/timeline') },
        ],
      },
      {
        id: 'multiverse',
        icon: <Layers className="w-5 h-5" style={{ color: '#c084fc' }} />,
        label: 'Multiverse',
        active: pathname === '/multiverse',
        onClick: () => router.push('/multiverse'),
        menu: [
          { label: 'Multiverse Portal', onClick: () => router.push('/multiverse') },
          { label: 'Earth-616 (Sacred Timeline)', onClick: () => router.push('/multiverse') },
          { label: 'Earth-838 (Illuminati Reality)', onClick: () => router.push('/multiverse') },
          { label: 'The Void at the End of Time', onClick: () => router.push('/multiverse') },
        ],
      },
      {
        id: 'easter-eggs',
        icon: <Eye className="w-5 h-5" style={{ color: '#a78bfa' }} />,
        label: 'Easter Eggs',
        active: pathname === '/easter-eggs',
        onClick: () => router.push('/easter-eggs'),
        menu: [
          { label: 'All Easter Eggs & Cameos', onClick: () => router.push('/easter-eggs') },
          { label: 'Stan Lee Cameos Archive', onClick: () => router.push('/easter-eggs') },
          { label: 'Post-Credit Scenes Decoded', onClick: () => router.push('/easter-eggs') },
        ],
      },
      {
        id: 'watch-tracker',
        icon: <BookmarkCheck className="w-5 h-5" style={{ color: '#4ade80' }} />,
        label: 'Watch Tracker',
        active: pathname === '/watch-tracker',
        onClick: () => router.push('/watch-tracker'),
        menu: [
          { label: 'MCU Watch Tracker', onClick: () => router.push('/watch-tracker') },
          { label: 'Mark Watched Titles', onClick: () => router.push('/watch-tracker') },
          { label: 'Calculate Total Runtime', onClick: () => router.push('/watch-tracker') },
        ],
      },
    ],
    [pathname, router]
  );

  const utilityItem = useMemo(
    () => ({
      id: 'search',
      icon: <Search className="w-5 h-5" style={{ color: '#c9a84c' }} />,
      label: 'Search Archives (⌘K)',
      onClick: () => setSearchOpen(true),
      menu: [
        { label: 'Open Search Console', shortcut: '⌘K', onClick: () => setSearchOpen(true) },
      ],
    }),
    [setSearchOpen]
  );

  const dockItems = useMemo(() => {
    if (activeCategory === 'explore') {
      return [...exploreItems, { separator: true }, utilityItem];
    }
    if (activeCategory === 'archive') {
      return [...archiveItems, { separator: true }, utilityItem];
    }
    if (activeCategory === 'discover') {
      return [...discoverItems, { separator: true }, utilityItem];
    }
    // 'all' category: Explore + Archive + Discover separated nicely
    return [
      ...exploreItems,
      { separator: true },
      ...archiveItems,
      { separator: true },
      ...discoverItems,
      { separator: true },
      utilityItem,
    ];
  }, [activeCategory, exploreItems, archiveItems, discoverItems, utilityItem]);

  return (
    <div className={`marvel-dock-wrapper ${className}`}>
      {showCategoryTabs && (
        <div className="dock-category-tabs">
          <button
            type="button"
            className={`dock-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>ALL ARCHIVES</span>
          </button>
          <button
            type="button"
            className={`dock-tab-btn ${activeCategory === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveCategory('explore')}
          >
            <Film className="w-3.5 h-3.5" />
            <span>EXPLORE</span>
          </button>
          <button
            type="button"
            className={`dock-tab-btn ${activeCategory === 'archive' ? 'active' : ''}`}
            onClick={() => setActiveCategory('archive')}
          >
            <Sword className="w-3.5 h-3.5" />
            <span>ARCHIVE</span>
          </button>
          <button
            type="button"
            className={`dock-tab-btn ${activeCategory === 'discover' ? 'active' : ''}`}
            onClick={() => setActiveCategory('discover')}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>DISCOVER</span>
          </button>
        </div>
      )}

      {/* Dock display container */}
      <div className="dock-stage" style={{ height: baseItemSize + 38 }}>
        <Dock
          items={dockItems}
          position={position}
          theme="dark"
          baseItemSize={baseItemSize}
          magnification={magnification}
          panelHeight={baseItemSize + 18}
          distance={180}
          gap={8}
          roundness={0.65}
          bounce={true}
          autoHide={autoHide}
          tiles={true}
          showLabels={true}
          showIndicators={false}
          showBadges={false}
          badgeColor="#c1121f"
          accentColor="#c9a84c"
        />
      </div>

      <style jsx>{`
        .marvel-dock-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          width: 100%;
          position: relative;
        }

        .dock-category-tabs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem;
          background: rgba(18, 20, 32, 0.7);
          border: 1px solid var(--border);
          border-radius: 9999px;
          backdrop-filter: blur(12px);
          flex-wrap: wrap;
          justify-content: center;
        }

        .dock-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-muted);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .dock-tab-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .dock-tab-btn.active {
          color: #121420;
          background: var(--gold);
          border-color: var(--gold);
          box-shadow: 0 0 16px rgba(201, 168, 76, 0.35);
        }

        .dock-tab-count {
          font-size: 0.65rem;
          padding: 0.1rem 0.35rem;
          border-radius: 9999px;
          background: rgba(0, 0, 0, 0.2);
          color: inherit;
        }

        .dock-tab-btn.active .dock-tab-count {
          background: rgba(0, 0, 0, 0.25);
          color: #121420;
        }

        .dock-stage {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
