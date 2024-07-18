import { Info } from './api.model';

enum Gender {
  'MALE' = 'male',
  'FEMALE' = 'female',
  'GENDERLESS' = 'genderless',
  'UNKNOWN' = 'unknown',
}

export interface LinkedElement {
  name: string;
  url: string;
}

export interface Origin extends LinkedElement {}

export interface Location extends LinkedElement {}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: Gender;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterInfo {
  info: Info;
  results: Character[];
}
