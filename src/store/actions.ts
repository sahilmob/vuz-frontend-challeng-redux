import { Character } from "../types";

export enum ACTIONS {
  "SEARCH",
  "TOGGLE_TAG",
  "CLEAR_TAGS",
  "TOGGLE_SELECT_CHARACTER",
}

export interface SEARCH {
  type: ACTIONS.SEARCH;
  payload: { text: string };
}

export interface TOGGLE_TAG {
  type: ACTIONS.TOGGLE_TAG;
  payload: { text: string };
}

export interface CLEAR_TAGS {
  type: ACTIONS.CLEAR_TAGS;
}

export interface TOGGLE_SELECT_CHARACTER {
  type: ACTIONS.TOGGLE_SELECT_CHARACTER;
  payload: { id: number; character: Character };
}

export type ACTION_TYPES =
  | SEARCH
  | TOGGLE_TAG
  | CLEAR_TAGS
  | TOGGLE_SELECT_CHARACTER;
