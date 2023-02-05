import {
  FC,
  useRef,
  useContext,
  createContext,
  PropsWithChildren,
  useSyncExternalStore,
} from "react";

import { Character } from "../types";
import jsonData from "../data/characters.json";
import { orderedAbilities } from "../lib/constants";
import { sortArrayBySpecificOrder } from "../lib/helpers";

type UseCharactersStoreReturnType = ReturnType<typeof useCharactersStore>;
type Store = {
  searchText: string;
  selectedCharacters: { [k: number]: Character | null };
  selectedTags: Set<string>;
  characters: Character[];
};
type UseStoreReturnType<SelectorOutput> = {
  state: SelectorOutput;
  searchText: string;
  clearFilters: () => void;
  search: (text: string) => void;
  toggleTag: (tag: string) => void;
  toggleSelectCharacter: (id: number, c: Character) => void;
};

const data: Character[] = jsonData as Character[];

const dataWithOrderedAbilities = data.map((c) => ({
  ...c,
  abilities: sortArrayBySpecificOrder(
    c.abilities,
    orderedAbilities,
    "abilityName"
  ),
}));

const useCharactersStore = () => {
  const store = useRef<Store>({
    searchText: "",
    selectedCharacters: {},
    selectedTags: new Set(),
    characters: dataWithOrderedAbilities,
  });
  const subscribers = useRef(new Set<() => void>());

  const getState = () => {
    return store.current;
  };

  const isCharactersSelected = (id: number) => {
    return store.current.selectedCharacters[id];
  };

  const isTagSelected = (tag: string) => {
    return store.current.selectedTags.has(tag);
  };

  const notify = () => {
    subscribers.current.forEach((cb) => cb());
  };

  const toggleSelectCharacter = (id: number, c: Character) => {
    if (isCharactersSelected(id)) {
      const updatedSelectedCharacters = { ...store.current.selectedCharacters };
      delete updatedSelectedCharacters[id];

      store.current = {
        ...store.current,
        selectedCharacters: updatedSelectedCharacters,
      };
    } else {
      store.current = {
        ...store.current,
        selectedCharacters: {
          ...store.current.selectedCharacters,
          [id]: c,
        },
      };
    }

    notify();
  };

  const toggleTag = (tag: string) => {
    const tags = store.current.selectedTags;
    if (isTagSelected(tag)) {
      tags.delete(tag);
    } else {
      tags.add(tag);
    }

    const filteredCharacters = applyFilters(tags);

    store.current = {
      ...store.current,
      selectedTags: new Set(tags),
      characters: filteredCharacters,
    };

    notify();
  };

  const search = (text: string) => {
    const filteredCharacters = text
      ? applyFilters(store.current.selectedTags).filter(
          (c) =>
            c?.name.toLocaleLowerCase()?.includes(text) ||
            c?.tags?.some((t) => t?.tag_name.includes(text.toLocaleLowerCase()))
        )
      : dataWithOrderedAbilities;

    store.current = {
      ...store.current,
      searchText: text,
      characters: filteredCharacters,
    };

    notify();
  };

  const applyFilters = (tags: Set<string>) => {
    if (tags.size) {
      return dataWithOrderedAbilities.filter((c) =>
        c.tags?.some((t) => tags.has(t.tag_name))
      );
    }

    return dataWithOrderedAbilities;
  };

  const clearFilters = () => {
    store.current = { ...store.current, selectedTags: new Set() };
    search(store.current.searchText);
  };

  const subscribe = (cb: () => void) => {
    subscribers.current.add(cb);

    return () => {
      subscribers.current.delete(cb);
    };
  };

  return {
    search,
    getState,
    subscribe,
    toggleTag,
    clearFilters,
    toggleSelectCharacter,
    searchText: store.current.searchText,
  };
};

const CharactersContext = createContext<UseCharactersStoreReturnType | null>(
  null
);

export const CharactersProvider: FC<PropsWithChildren> = ({ children }) => {
  const store = useCharactersStore();

  return (
    <CharactersContext.Provider value={store}>
      {children}
    </CharactersContext.Provider>
  );
};

export const useStore = <SelectorOutput,>(
  selector: (store: Store) => SelectorOutput
): UseStoreReturnType<SelectorOutput> => {
  const {
    search,
    getState,
    toggleTag,
    subscribe,
    searchText,
    clearFilters,
    toggleSelectCharacter,
  } = useContext(CharactersContext)!;
  const state = useSyncExternalStore(subscribe, () => selector(getState()));

  return {
    state,
    search,
    toggleTag,
    searchText,
    clearFilters,
    toggleSelectCharacter,
  };
};
