'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Search
  searchOpen: boolean;
  searchQuery: string;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;

  // Favorites
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // Watchlist / Watch Tracker
  watched: string[];
  toggleWatched: (slug: string) => void;
  isWatched: (slug: string) => boolean;

  // Spoiler controls
  spoilersEnabled: boolean;
  toggleSpoilers: () => void;

  // Recently viewed
  recentlyViewed: Array<{ slug: string; type: string; title: string }>;
  addRecentlyViewed: (item: { slug: string; type: string; title: string }) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme - strictly locked to dark
      theme: 'dark',
      toggleTheme: () => {
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      },

      // Search
      searchOpen: false,
      searchQuery: '',
      setSearchOpen: (open) => set({ searchOpen: open }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Favorites
      favorites: [],
      addFavorite: (id) =>
        set(s => ({ favorites: [...new Set([...s.favorites, id])] })),
      removeFavorite: (id) =>
        set(s => ({ favorites: s.favorites.filter(f => f !== id) })),
      isFavorite: (id) => get().favorites.includes(id),

      // Watch tracker
      watched: [],
      toggleWatched: (slug) =>
        set(s => ({
          watched: s.watched.includes(slug)
            ? s.watched.filter(w => w !== slug)
            : [...s.watched, slug],
        })),
      isWatched: (slug) => get().watched.includes(slug),

      // Spoilers
      spoilersEnabled: false,
      toggleSpoilers: () => set(s => ({ spoilersEnabled: !s.spoilersEnabled })),

      // Recently viewed
      recentlyViewed: [],
      addRecentlyViewed: (item) =>
        set(s => ({
          recentlyViewed: [
            item,
            ...s.recentlyViewed.filter(r => r.slug !== item.slug),
          ].slice(0, 10),
        })),
    }),
    {
      name: 'marvel-archives-store',
      version: 1,
    }
  )
);
