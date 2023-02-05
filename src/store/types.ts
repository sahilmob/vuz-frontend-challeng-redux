import { Character } from "../types";

export type State = {
  searchText: string;
  selectedCharacters: { [k: number]: Character };
  selectedTags: Set<string>;
  characters: Character[];
};
