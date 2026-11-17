export { movies, moviesByPhase, moviesByReleaseOrder, moviesByChronOrder, getMovieBySlug, allMoviesOnly, allSeriesOnly } from './movies';
export { characters, getCharacterBySlug, heroes, villains, antiHeroes, supporting } from './characters';
export { weapons, getWeaponBySlug, weaponsByCategory } from './weapons';
export { timelineEvents, getTimelineByPhase, getTimelineByType, sortedTimeline } from './timeline';
export { infinityStones, getStoneBySlug } from './infinity-stones';

// Search index across all content
import { movies } from './movies';
import { characters } from './characters';
import { weapons } from './weapons';
import { infinityStones } from './infinity-stones';
import type { SearchResult } from '@/types';

export function searchAll(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();

  const results: SearchResult[] = [];

  // Search movies
  movies.forEach(m => {
    if (m.title.toLowerCase().includes(q) || m.synopsis.toLowerCase().includes(q)) {
      results.push({
        id: m.id,
        slug: m.slug,
        title: m.title,
        subtitle: `${m.type === 'movie' ? 'Movie' : 'Series'} • Phase ${m.phase} • ${m.year}`,
        type: 'movie',
        url: `/movies/${m.slug}`,
      });
    }
  });

  // Search characters
  characters.forEach(c => {
    if (
      c.name.toLowerCase().includes(q) ||
      (c.realName && c.realName.toLowerCase().includes(q)) ||
      (c.alias && c.alias.some(a => a.toLowerCase().includes(q)))
    ) {
      results.push({
        id: c.id,
        slug: c.slug,
        title: c.name,
        subtitle: c.realName ? `${c.realName} • ${c.type}` : c.type,
        type: 'character',
        url: c.type === 'villain' ? `/villains/${c.slug}` : `/heroes/${c.slug}`,
      });
    }
  });

  // Search weapons
  weapons.forEach(w => {
    if (w.name.toLowerCase().includes(q) || w.description.toLowerCase().includes(q)) {
      results.push({
        id: w.id,
        slug: w.slug,
        title: w.name,
        subtitle: `${w.category} • ${w.origin.split('—')[0].trim()}`,
        type: 'weapon',
        url: `/weapons/${w.slug}`,
      });
    }
  });

  // Search infinity stones
  infinityStones.forEach(s => {
    if (s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
      results.push({
        id: s.id,
        slug: s.slug,
        title: s.name,
        subtitle: `Infinity Stone • ${s.currentStatus.split('.')[0]}`,
        type: 'stone',
        url: `/infinity-stones/${s.slug}`,
      });
    }
  });

  return results.slice(0, 20);
}
