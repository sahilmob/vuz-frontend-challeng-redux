import { Character } from "../types";

export enum ACTIONS {
  "SEARCH",
  "TOGGLE_SELECT_CHARACTER",
}

export interface SEARCH {
  type: ACTIONS.SEARCH;
  payload: { text: string };
}

export interface TOGGLE_SELECT_CHARACTER {
  type: ACTIONS.TOGGLE_SELECT_CHARACTER;
  payload: { id: number; character: Character };
}

export type ACTION_TYPES = SEARCH | TOGGLE_SELECT_CHARACTER;
