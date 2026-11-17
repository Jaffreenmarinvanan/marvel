// @ts-nocheck
import { movies as staticMovies } from './movies';
import { heroes as staticHeroes, villains as staticVillains } from './characters';
import { weapons as staticWeapons } from './weapons';
import { timelineEvents as staticTimeline } from './timeline';
import { MOVIE_MEDIA as staticMediaMap } from './mediaMap';
import type { Movie, Character, Weapon, TimelineEvent } from '@/types';

import customDataSeed from './customData.json';

// Initial fallback/default custom storage
let memoryCustomData = customDataSeed || {
  heroes: [],
  villains: [],
  movies: [],
  weapons: [],
  timeline: [],
  mediaMap: {},
};

/**
 * Client-side helper to read latest custom data from localStorage
 */
export function getClientCustomData() {
  if (typeof window === 'undefined') {
    return memoryCustomData;
  }
  try {
    const saved = localStorage.getItem('marvel_custom_data');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading marvel_custom_data from localStorage:', e);
  }
  return memoryCustomData;
}

/**
 * Client-side helper to save latest custom data to localStorage & notify pages
 */
export function setClientCustomData(data: any) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('marvel_custom_data', JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('marvel-data-updated', { detail: data }));
    } catch (e) {
      console.error('Error saving marvel_custom_data to localStorage:', e);
    }
  }
  memoryCustomData = data;
}

/**
 * Merge helper:
 * For each item in customList, if an item with the same slug (or id) exists in baseList,
 * merge its fields. If not found, prepend the new item.
 */
function mergeList<T extends { id?: string; slug?: string }>(
  baseList: T[],
  customList: T[]
): T[] {
  if (!customList || !Array.isArray(customList) || customList.length === 0) {
    return baseList;
  }

  const result = [...baseList];
  const customMap = new Map<string, T>();

  // Map custom items by slug or id
  for (const item of customList) {
    const key = item.slug || item.id;
    if (key) {
      customMap.set(key, item);
    }
  }

  // Update existing items in-place
  for (let i = 0; i < result.length; i++) {
    const existingKey = result[i].slug || result[i].id;
    if (existingKey && customMap.has(existingKey)) {
      result[i] = { ...result[i], ...customMap.get(existingKey) };
      customMap.delete(existingKey);
    }
  }

  // Any remaining custom items are brand new -> prepend them
  const newItems: T[] = [];
  for (const [_, item] of customMap.entries()) {
    newItems.push(item);
  }

  return [...newItems, ...result];
}

/**
 * Returns complete list of Movies & Series (static + custom/edited)
 */
export function getMergedMovies(): Movie[] {
  const custom = getClientCustomData();
  return mergeList(staticMovies, custom.movies || []);
}

/**
 * Returns complete list of Heroes (static + custom/edited)
 */
export function getMergedHeroes(): Character[] {
  const custom = getClientCustomData();
  return mergeList(staticHeroes, custom.heroes || []);
}

/**
 * Returns complete list of Villains (static + custom/edited)
 */
export function getMergedVillains(): Character[] {
  const custom = getClientCustomData();
  return mergeList(staticVillains, custom.villains || []);
}

/**
 * Returns complete list of Weapons (static + custom/edited)
 */
export function getMergedWeapons(): Weapon[] {
  const custom = getClientCustomData();
  return mergeList(staticWeapons, custom.weapons || []);
}

/**
 * Returns complete list of Timeline Events (static + custom/edited)
 */
export function getMergedTimeline(): TimelineEvent[] {
  const custom = getClientCustomData();
  return mergeList(staticTimeline, custom.timeline || []);
}

/**
 * Returns complete Media Map (static + custom/edited)
 */
export function getMergedMediaMap(): Record<string, { image: string; accent: string; logo?: string }> {
  const custom = getClientCustomData();
  return {
    ...staticMediaMap,
    ...(custom.mediaMap || {}),
  };
}
