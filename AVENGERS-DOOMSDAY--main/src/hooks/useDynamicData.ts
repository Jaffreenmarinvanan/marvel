// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import {
  getMergedMovies,
  getMergedHeroes,
  getMergedVillains,
  getMergedWeapons,
  getMergedTimeline,
  getMergedMediaMap,
  setClientCustomData,
} from '@/data/dynamicData';

export function useDynamicData() {
  const [moviesList, setMoviesList] = useState(getMergedMovies);
  const [heroesList, setHeroesList] = useState(getMergedHeroes);
  const [villainsList, setVillainsList] = useState(getMergedVillains);
  const [weaponsList, setWeaponsList] = useState(getMergedWeapons);
  const [timelineList, setTimelineList] = useState(getMergedTimeline);
  const [mediaMapData, setMediaMapData] = useState(getMergedMediaMap);

  const refresh = () => {
    setMoviesList(getMergedMovies());
    setHeroesList(getMergedHeroes());
    setVillainsList(getMergedVillains());
    setWeaponsList(getMergedWeapons());
    setTimelineList(getMergedTimeline());
    setMediaMapData(getMergedMediaMap());
  };

  useEffect(() => {
    // 1. Initial server fetch to sync any custom data stored on disk
    fetch('/api/admin/data')
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (payload?.success && payload.data) {
          setClientCustomData(payload.data);
          refresh();
        }
      })
      .catch((err) => {
        console.warn('Dynamic data sync skipped or offline:', err);
      });

    // 2. Listen for real-time local updates triggered by admin actions
    const handleUpdate = () => {
      refresh();
    };

    window.addEventListener('marvel-data-updated', handleUpdate);
    return () => {
      window.removeEventListener('marvel-data-updated', handleUpdate);
    };
  }, []);

  return {
    movies: moviesList,
    heroes: heroesList,
    villains: villainsList,
    weapons: weaponsList,
    timeline: timelineList,
    mediaMap: mediaMapData,
    refresh,
  };
}
