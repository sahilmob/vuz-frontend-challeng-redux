import { State } from "./types";
import { Character } from "../types";
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

export const reducer = (state = initialState, action: ACTION_TYPES) => {
  switch (action.type) {
    case ACTIONS.SEARCH: {
      const { text } = action.payload;
      const tags = state.selectedTags;
      const filteredCharacters = tags.size
        ? dataWithOrderedAbilities.filter((c) =>
            c.tags?.some((t) => tags.has(t.tag_name))
          )
        : dataWithOrderedAbilities;
      const result = text
        ? filteredCharacters.filter(
            (c) =>
              c?.name.toLocaleLowerCase()?.includes(text) ||
              c?.tags?.some((t) =>
                t?.tag_name.includes(text.toLocaleLowerCase())
              )
          )
        : filteredCharacters;

      return {
        ...state,
        searchText: text,
        characters: result,
      };
    }
    case ACTIONS.TOGGLE_TAG: {
      const { text: tag } = action.payload;
      const tags = state.selectedTags;
      if (tags.has(tag)) {
        tags.delete(tag);
      } else {
        tags.add(tag);
      }

      const filteredCharacters = tags.size
        ? dataWithOrderedAbilities.filter((c) =>
            c.tags?.some((t) => tags.has(t.tag_name))
          )
        : dataWithOrderedAbilities;

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
        characters = characters.filter(
          (c) =>
            c?.name.toLocaleLowerCase()?.includes(searchText) ||
            c?.tags?.some((t) =>
              t?.tag_name.includes(searchText.toLocaleLowerCase())
            )
        );
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
