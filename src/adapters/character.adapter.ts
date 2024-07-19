import { CharacterInfo } from '../models';

export const CharacterAdapter = (characterInfo: CharacterInfo) => {
  return characterInfo.results;
};
