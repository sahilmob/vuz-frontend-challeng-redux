import { State } from "./types";
import { ACTIONS, ACTION_TYPES } from "./actions";
import { Character } from "../types";
import jsonData from "../data/characters.json";
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
