// ============================================================
// MARVEL ARCHIVES — Core Data Types
// ============================================================

export interface Movie {
  id: string;
  slug: string;
  title: string;
  year: number;
  releaseDate: string;
  runtime: number; // minutes
  phase: number;
  releaseOrder: number;
  chronologicalOrder: number;
  director: string;
  writers: string[];
  cast: CastMember[];
  synopsis: string;
  posterColor: string; // dominant color for placeholder
  posterUrl?: string; // custom uploaded or external poster image url
  model3dUrl?: string; // 3D element model (.glb/.obj)
  model3dType?: 'glb' | 'obj';
  budget?: string;
  boxOffice?: string;
  mainCharacters: string[]; // character slugs
  antagonists: string[]; // character slugs
  majorEvents: string[];
  locations: string[];
  artifacts: string[];
  infinityStones: string[];
  postCreditScenes: PostCreditScene[];
  easterEggs: string[];
  relatedMovies: string[];
  type: 'movie' | 'series';
  episodes?: number;
  seasons?: number;
  streamingOn?: string;
  status: 'released' | 'upcoming' | 'announced';
  tmdbId?: number;
}

export interface CastMember {
  actor: string;
  character: string;
  characterSlug?: string;
}

export interface PostCreditScene {
  type?: 'mid' | 'post' | string;
  time?: string;
  description: string;
  characters?: string[];
  significance?: string;
}

export interface Character {
  id: string;
  slug: string;
  name: string;
  realName?: string;
  alias?: string[];
  type: 'hero' | 'villain' | 'supporting' | 'cosmic' | 'anti-hero';
  status: 'alive' | 'deceased' | 'unknown' | 'variant';
  species: string;
  homeworld?: string;
  affiliation: string[];
  firstAppearance: string; // movie slug
  portraitColor: string;
  biography: string;
  origin: string;
  powers: string[];
  skills: string[];
  weapons: string[];
  technology: string[];
  allies: string[]; // character slugs
  enemies: string[]; // character slugs
  appearances: string[]; // movie slugs
  majorBattles: string[];
  quote?: string;
  actor?: string;
  imageUrl?: string; // custom uploaded or external image url
  model3dUrl?: string; // 3D element model (.glb/.obj)
  model3dType?: 'glb' | 'obj';
}

export interface InfinityStone {
  id: string;
  slug: string;
  name: string;
  color: string;
  hexColor: string;
  powers: string[];
  abilities: string[];
  origin: string;
  previousOwners: string[];
  locations: string[];
  appearances: string[]; // movie slugs
  majorEvents: string[];
  currentStatus: string;
  description: string;
}

export interface Weapon {
  id: string;
  slug: string;
  name: string;
  category: 'weapon' | 'artifact' | 'stone' | 'technology';
  origin: string;
  material?: string;
  powers: string[];
  abilities: string[];
  previousOwners: string[]; // character slugs
  appearances: string[]; // movie slugs
  majorEvents: string[];
  currentStatus: string;
  description: string;
  creator?: string;
  accentColor: string;
  imageUrl?: string; // custom uploaded or external image url
  model3dUrl?: string; // 3D element model (.glb/.obj)
  model3dType?: 'glb' | 'obj';
}

export interface Technology {
  id: string;
  slug: string;
  name: string;
  category: 'iron-man' | 'wakandan' | 'quantum' | 'alien' | 'other';
  creator: string;
  description: string;
  capabilities: string[];
  limitations: string[];
  appearances: string[]; // movie slugs
  relatedCharacters: string[]; // character slugs
  accentColor: string;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  type: 'hero-team' | 'villain-org' | 'government' | 'alien' | 'other';
  description: string;
  members: string[]; // character slugs
  leader?: string; // character slug
  affiliation?: string;
  appearances: string[];
  accentColor: string;
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  type: 'earth' | 'cosmic' | 'realm' | 'dimension' | 'other';
  description: string;
  appearances: string[]; // movie slugs
  notableResidents: string[]; // character slugs
  accentColor: string;
  coordinates?: string;
}

export interface TimelineEvent {
  id: string;
  year?: number;
  date?: string;
  title: string;
  description: string;
  type: 'battle' | 'origin' | 'snap' | 'blip' | 'discovery' | 'death' | 'formation' | 'other';
  characters: string[];
  movie?: string;
  phase: number;
  isDisputed?: boolean;
}

export interface EasterEgg {
  id: string;
  movie: string;
  title: string;
  description: string;
  type: 'comic-reference' | 'cameo' | 'foreshadowing' | 'post-credit' | 'hidden';
  significance: 'low' | 'medium' | 'high';
  spoilerWarning: boolean;
  characters?: string[];
  comicIssue?: string;
}

export interface Power {
  id: string;
  slug: string;
  name: string;
  category: 'physical' | 'energy' | 'mental' | 'reality' | 'cosmic' | 'magic' | 'technology';
  description: string;
  characters: string[]; // character slugs who have this power
}

export interface SearchResult {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  type: 'movie' | 'character' | 'weapon' | 'location' | 'stone' | 'technology' | 'team';
  url: string;
}
