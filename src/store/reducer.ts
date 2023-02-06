import { State } from "./types";
import { Character } from "../types";
import { filters } from "../lib/constants";
import jsonData from "../data/characters.json";
import { ACTIONS, ACTION_TYPES } from "./actions";
import { orderedAbilities } from "../lib/constants";
import { sortArrayBySpecificOrder } from "../lib/helpers";

const data: Character[] = jsonData as Character[];

const dataWithOrderedAbilities = data.map((c) => ({
  ...c,
  abilities: sortArrayBySpecificOrder(
    c.abilities,
    orderedAbilities,
    "abilityName"
  ),
}));

const initialState: State = {
  searchText: "",
  selectedCharacters: {},
  selectedTags: new Set(),
  characters: dataWithOrderedAbilities,
};

const applyFilters = (tags: Set<string>, characters: Character[]) => {
  return tags.size
    ? characters.filter((c) => c.tags?.some((t) => tags.has(t.tag_name)))
    : characters;
};

const applySearch = (text: string, characters: Character[]) => {
  return characters.filter(
    (c) =>
      c?.name.toLocaleLowerCase()?.includes(text) ||
      c?.tags?.some((t) => t?.tag_name.includes(text.toLocaleLowerCase()))
  );
};

export const reducer = (state = initialState, action: ACTION_TYPES) => {
  switch (action.type) {
    case ACTIONS.SEARCH: {
      const { text } = action.payload;
      const tags = state.selectedTags;
      const charactersToBeFiltered: Character[] = tags.has("my_team")
        ? Object.values(state.selectedCharacters)
        : dataWithOrderedAbilities;

      const filteredCharacters =
        tags.size > 1
          ? applyFilters(tags, charactersToBeFiltered)
          : charactersToBeFiltered;

      const result = text
        ? applySearch(text, filteredCharacters)
        : filteredCharacters;

      return {
        ...state,
        searchText: text,
        characters: result,
      };
    }
    case ACTIONS.TOGGLE_TAG: {
      const { text } = action.payload;
      const tag = text as keyof typeof filters;
      let tags = state.selectedTags;
      let filteredCharacters: Character[] = [];

      if (tags.has(tag)) {
        tags.delete(tag);
        filteredCharacters =
          tags.has("my_team") && tags.size === 1
            ? Object.values(state.selectedCharacters)
            : applyFilters(
                tags,
                tags.has("my_team")
                  ? Object.values(state.selectedCharacters)
                  : dataWithOrderedAbilities
              );
      } else {
        tags.add(tag);
        filteredCharacters =
          tags.has("my_team") && tags.size === 1
            ? Object.values(state.selectedCharacters)
            : applyFilters(
                tags,
                tags.has("my_team")
                  ? Object.values(state.selectedCharacters)
                  : state.characters
              );
      }

      if (state.searchText) {
        filteredCharacters = applySearch(state.searchText, filteredCharacters);
      }

      return {
        ...state,
        selectedTags: new Set(tags),
        characters: filteredCharacters,
      };
    }
    case ACTIONS.CLEAR_TAGS: {
      const searchText = state.searchText;
      let characters = dataWithOrderedAbilities;

      if (searchText) {
        characters = applySearch(searchText, characters);
      }

      return {
        ...state,
        characters,
        selectedTags: new Set(),
      };
    }
    case ACTIONS.TOGGLE_SELECT_CHARACTER: {
      const { id, character } = action.payload;
      if (id in state.selectedCharacters) {
        const newSelectedCharacters = { ...state.selectedCharacters };
        delete newSelectedCharacters[id];

        return {
          ...state,
          selectedCharacters: newSelectedCharacters,
        };
      } else {
        return {
          ...state,
          selectedCharacters: {
            ...state.selectedCharacters,
            [id]: character,
          },
        };
      }
    }
    default:
      return state;
  }
};
