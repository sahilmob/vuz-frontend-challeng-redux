import { Character } from "../types";

export enum ACTIONS {
  "TOGGLE_SELECT_CHARACTER",
}

export interface TOGGLE_SELECT_CHARACTER {
  type: ACTIONS.TOGGLE_SELECT_CHARACTER;
  payload: { id: number; character: Character };
}

export type ACTION_TYPES = TOGGLE_SELECT_CHARACTER;
