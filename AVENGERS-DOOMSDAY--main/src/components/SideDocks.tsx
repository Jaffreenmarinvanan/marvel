// @ts-nocheck
'use client';

/**
 * SideDocks — Two fixed vertical React Bits Dock instances.
 *
 * The Dock component uses `position: absolute` internally, positioning itself
 * relative to its `offsetParent`. We wrap each dock in a fixed full-height
 * container (left / right edge) so the dock stays pinned during scroll and the
 * internal `clientHeight` measurement works correctly for shrink-to-fit.
 */

import React, { useMemo, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Dock from './Dock/Dock';
import { useStore } from '@/store';
import {
  Home,
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
  Lock,
} from 'lucide-react';

/** Wrap icon in its section accent colour */
const Ico = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <span style={{ color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {children}
  </span>
);

export default function SideDocks() {
  const router   = useRouter();
  const pathname = usePathname();
  const { setSearchOpen, theme } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const active = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  const dockTheme = theme === 'light' ? 'light' : 'dark';
  const nav = (href: string) => router.push(href);

  // ── LEFT DOCK ───────────────────────────────────────────────────────────────
  // Home · Movies · TV · Heroes · Villains · Infinity Stones · Weapons

  const leftItems = useMemo(() => [
    {
      icon: <Ico color="#c9a84c"><Home size={20} /></Ico>,
      label: 'Home',
      active: active('/'),
      onClick: () => nav('/'),
      menu: [
        { label: 'Marvel Archives — Home',  onClick: () => nav('/') },
        { label: 'About the Archives',      onClick: () => nav('/about') },
      ],
    },
    { separator: true },
    {
      icon: <Ico color="#60a5fa"><Film size={20} /></Ico>,
      label: 'Movies',
      active: active('/movies'),
      onClick: () => nav('/movies'),
      menu: [
        { label: 'All Feature Films',                onClick: () => nav('/movies') },
        { separator: true },
        { label: 'Phase 1 — The Beginning',          onClick: () => nav('/movies') },
        { label: 'Phase 2 — Expansion',              onClick: () => nav('/movies') },
        { label: 'Phase 3 — The Infinity Saga',      onClick: () => nav('/movies') },
        { label: 'Phase 4 — The Multiverse Saga',    onClick: () => nav('/movies') },
        { label: 'Phase 5 — Secret Invasion Arc',    onClick: () => nav('/movies') },
      ],
    },
    {
      icon: <Ico color="#38bdf8"><Tv size={20} /></Ico>,
      label: 'TV Series',
      active: active('/tv'),
      onClick: () => nav('/tv'),
      menu: [
        { label: 'All Disney+ Series',   onClick: () => nav('/tv') },
        { label: 'WandaVision',          onClick: () => nav('/tv') },
        { label: 'Loki (Season 1 & 2)', onClick: () => nav('/tv') },
        { label: 'Hawkeye',              onClick: () => nav('/tv') },
        { label: 'Ms. Marvel',           onClick: () => nav('/tv') },
      ],
    },
    {
      icon: <Ico color="#f87171"><Shield size={20} /></Ico>,
      label: 'Heroes',
      active: active('/heroes'),
      onClick: () => nav('/heroes'),
      menu: [
        { label: 'All Heroes & Protagonists',         onClick: () => nav('/heroes') },
        { separator: true },
        { label: 'Iron Man (Tony Stark)',             onClick: () => nav('/heroes/iron-man') },
        { label: 'Captain America (Steve Rogers)',    onClick: () => nav('/heroes/captain-america') },
        { label: 'Thor Odinson',                      onClick: () => nav('/heroes/thor') },
        { label: 'Black Panther (T\'Challa)',         onClick: () => nav('/heroes/black-panther') },
        { label: 'Spider-Man (Peter Parker)',         onClick: () => nav('/heroes/spider-man') },
        { separator: true },
        { label: 'All Characters',                   onClick: () => nav('/characters') },
      ],
    },
    {
      icon: <Ico color="#e879f9"><Skull size={20} /></Ico>,
      label: 'Villains',
      active: active('/villains'),
      onClick: () => nav('/villains'),
      menu: [
        { label: 'All Antagonists & Villains',  onClick: () => nav('/villains') },
        { separator: true },
        { label: 'Thanos — The Mad Titan',       onClick: () => nav('/villains/thanos') },
        { label: 'Kang the Conqueror',           onClick: () => nav('/villains/kang') },
        { label: 'Loki Laufeyson',               onClick: () => nav('/heroes/loki') },
      ],
    },
    {
      icon: <Ico color="#38bdf8"><Sparkles size={20} /></Ico>,
      label: 'Infinity Stones',
      active: active('/infinity-stones'),
      onClick: () => nav('/infinity-stones'),
      menu: [
        { label: 'The Six Infinity Stones',          onClick: () => nav('/infinity-stones') },
        { separator: true },
        { label: 'Space Stone (Tesseract)',          onClick: () => nav('/infinity-stones/space-stone') },
        { label: 'Mind Stone (Scepter / Vision)',    onClick: () => nav('/infinity-stones/mind-stone') },
        { label: 'Reality Stone (Aether)',           onClick: () => nav('/infinity-stones/reality-stone') },
        { label: 'Power Stone (Orb)',                onClick: () => nav('/infinity-stones/power-stone') },
        { label: 'Time Stone (Eye of Agamotto)',     onClick: () => nav('/infinity-stones/time-stone') },
        { label: 'Soul Stone (Vormir)',              onClick: () => nav('/infinity-stones/soul-stone') },
      ],
    },
    {
      icon: <Ico color="#f59e0b"><Sword size={20} /></Ico>,
      label: 'Weapons',
      active: active('/weapons'),
      onClick: () => nav('/weapons'),
      menu: [
        { label: 'Weapons & Artifacts Archive',        onClick: () => nav('/weapons') },
        { separator: true },
        { label: 'Mjolnir — Enchanted Hammer',         onClick: () => nav('/weapons/mjolnir') },
        { label: 'Stormbreaker',                       onClick: () => nav('/weapons/stormbreaker') },
        { label: 'Infinity Gauntlet',                  onClick: () => nav('/weapons/infinity-gauntlet') },
        { label: 'Captain\'s Vibranium Shield',        onClick: () => nav('/weapons/captain-america-shield') },
      ],
    },
  ], [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── RIGHT DOCK ──────────────────────────────────────────────────────────────
  // Technology · Superpowers · Teams · Locations · Timeline · Multiverse · Easter Eggs · Watch Tracker · Search

  const rightItems = useMemo(() => [
    {
      icon: <Ico color="#2dd4bf"><Cpu size={20} /></Ico>,
      label: 'Technology',
      active: active('/technology'),
      onClick: () => nav('/technology'),
      menu: [
        { label: 'MCU Technology Archive',          onClick: () => nav('/technology') },
        { separator: true },
        { label: 'Stark Nanotech & Arc Reactor',    onClick: () => nav('/technology') },
        { label: 'Wakandan Vibranium Science',      onClick: () => nav('/technology') },
        { label: 'Pym Particles & Quantum Tunnel',  onClick: () => nav('/technology') },
        { label: 'J.A.R.V.I.S. & F.R.I.D.A.Y.',   onClick: () => nav('/technology') },
      ],
    },
    {
      icon: <Ico color="#34d399"><Zap size={20} /></Ico>,
      label: 'Superpowers',
      active: active('/powers'),
      onClick: () => nav('/powers'),
      menu: [
        { label: 'Superpowers & Abilities',         onClick: () => nav('/powers') },
        { separator: true },
        { label: 'Chaos Magic (Scarlet Witch)',      onClick: () => nav('/powers') },
        { label: 'Super-Soldier Enhancement',       onClick: () => nav('/powers') },
        { label: 'Mystic Arts & Sorcery',           onClick: () => nav('/powers') },
        { label: 'Gamma Radiation (Hulk)',          onClick: () => nav('/powers') },
      ],
    },
    {
      icon: <Ico color="#818cf8"><Users size={20} /></Ico>,
      label: 'Teams',
      active: active('/teams'),
      onClick: () => nav('/teams'),
      menu: [
        { label: 'All Teams & Organizations',       onClick: () => nav('/teams') },
        { separator: true },
        { label: 'The Avengers',                    onClick: () => nav('/teams') },
        { label: 'Guardians of the Galaxy',         onClick: () => nav('/teams') },
        { label: 'S.H.I.E.L.D. / H.Y.D.R.A.',     onClick: () => nav('/teams') },
        { label: 'The Thunderbolts',                onClick: () => nav('/teams') },
        { label: 'The Illuminati (Earth-838)',      onClick: () => nav('/teams') },
      ],
    },
    {
      icon: <Ico color="#fb7185"><MapPin size={20} /></Ico>,
      label: 'Locations',
      active: active('/locations'),
      onClick: () => nav('/locations'),
      menu: [
        { label: 'Locations & Realms',             onClick: () => nav('/locations') },
        { separator: true },
        { label: 'Wakanda — Vibranium Kingdom',    onClick: () => nav('/locations') },
        { label: 'Asgard — Realm Eternal',         onClick: () => nav('/locations') },
        { label: 'Quantum Realm',                  onClick: () => nav('/locations') },
        { label: 'Kamar-Taj, Nepal',               onClick: () => nav('/locations') },
        { label: 'Titan — Thanos\'s Homeworld',    onClick: () => nav('/locations') },
      ],
    },
    { separator: true },
    {
      icon: <Ico color="#fbbf24"><Clock size={20} /></Ico>,
      label: 'MCU Timeline',
      active: active('/timeline'),
      onClick: () => nav('/timeline'),
      menu: [
        { label: 'Interactive MCU Timeline',       onClick: () => nav('/timeline') },
        { separator: true },
        { label: 'Infinity Saga (1942–2019)',       onClick: () => nav('/timeline') },
        { label: 'Multiverse Saga (2020–2026+)',    onClick: () => nav('/timeline') },
      ],
    },
    {
      icon: <Ico color="#c084fc"><Layers size={20} /></Ico>,
      label: 'Multiverse',
      active: active('/multiverse'),
      onClick: () => nav('/multiverse'),
      menu: [
        { label: 'Multiverse Portal',              onClick: () => nav('/multiverse') },
        { separator: true },
        { label: 'Earth-616 — Sacred Timeline',    onClick: () => nav('/multiverse') },
        { label: 'Earth-838 — Illuminati Reality', onClick: () => nav('/multiverse') },
        { label: 'TVA & He Who Remains',           onClick: () => nav('/multiverse') },
        { label: 'The Void at End of Time',        onClick: () => nav('/multiverse') },
      ],
    },
    {
      icon: <Ico color="#a78bfa"><Eye size={20} /></Ico>,
      label: 'Easter Eggs',
      active: active('/easter-eggs'),
      onClick: () => nav('/easter-eggs'),
      menu: [
        { label: 'Easter Eggs & Secrets',          onClick: () => nav('/easter-eggs') },
        { separator: true },
        { label: 'Stan Lee Cameos Archive',         onClick: () => nav('/easter-eggs') },
        { label: 'Post-Credit Scenes Decoded',      onClick: () => nav('/easter-eggs') },
        { label: 'Comic Callbacks & References',    onClick: () => nav('/easter-eggs') },
      ],
    },
    {
      icon: <Ico color="#4ade80"><BookmarkCheck size={20} /></Ico>,
      label: 'Watch Tracker',
      active: active('/watch-tracker'),
      onClick: () => nav('/watch-tracker'),
      menu: [
        { label: 'Personal Watch Tracker',         onClick: () => nav('/watch-tracker') },
        { label: 'Mark Films as Watched',          onClick: () => nav('/watch-tracker') },
        { label: 'Calculate Total Runtime',        onClick: () => nav('/watch-tracker') },
      ],
    },
    { separator: true },
    /*{
      icon: <Ico color="#c9a84c"><Search size={20} /></Ico>,
      label: 'Search Archives',
      onClick: () => setSearchOpen(true),
      menu: [
        { label: 'Search All Archives', shortcut: '⌘K', onClick: () => setSearchOpen(true) },
      ],
    }*/,
    {
      icon: <Ico color="#eab308"><Lock size={20} /></Ico>,
      label: 'Admin Command',
      active: active('/admin'),
      onClick: () => nav('/admin'),
      menu: [
        { label: 'S.H.I.E.L.D. Command Center', onClick: () => nav('/admin') },
        { label: 'Add / Edit Heroes & Villains', onClick: () => nav('/admin') },
        { label: 'Add / Edit Movies & Series', onClick: () => nav('/admin') },
        { label: 'Upload Media & 3D Objects', onClick: () => nav('/admin') },
      ],
    },
  ], [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return null;

  const dockProps = {
    theme: 'dark',
    baseItemSize: 46,
    magnification: 66,
    panelHeight: 62,
    distance: 160,
    gap: 8,
    roundness: 0.65,
    bounce: true,
    autoHide: false,
    tiles: true,
    showLabels: true,
    showIndicators: false,
    showBadges: false,
    badgeColor: '#c1121f',
    accentColor: '#c9a84c',
  } as const;

  return (
    <>
      {/* ── LEFT WRAPPER ─────────────────────────────────────────── */}
      {/* Fixed full-height strip on the left edge.                  */}
      {/* The Dock renders `position:absolute` inside, using the      */}
      {/* wrapper's clientHeight for its shrink-to-fit calculation.   */}
      <div
        aria-label="Primary Navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 72,           // slightly wider than dock panel so hover reach works
          height: '100vh',
          zIndex: 900,
          pointerEvents: 'none', // pass clicks through the empty area
        }}
      >
        {/* Re-enable pointer events only on the dock itself */}
        <div style={{ pointerEvents: 'auto', width: '100%', height: '100%', position: 'relative' }}>
          <Dock
            {...dockProps}
            items={leftItems}
            position="left"
          />
        </div>
      </div>

      {/* ── RIGHT WRAPPER ────────────────────────────────────────── */}
      <div
        aria-label="Discover Navigation"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 72,
          height: '100vh',
          zIndex: 900,
          pointerEvents: 'none',
        }}
      >
        <div style={{ pointerEvents: 'auto', width: '100%', height: '100%', position: 'relative' }}>
          <Dock
            {...dockProps}
            items={rightItems}
            position="right"
          />
        </div>
      </div>

      {/* Top nav removed — keep side docks available on every breakpoint */}
      <style>{`
        @media (max-width: 1100px) {
          [aria-label="Primary Navigation"],
          [aria-label="Discover Navigation"] {
            width: 58px !important;
          }
        }
        @media (max-width: 640px) {
          [aria-label="Primary Navigation"],
          [aria-label="Discover Navigation"] {
            width: 52px !important;
          }
        }
      `}</style>
    </>
  );
}
