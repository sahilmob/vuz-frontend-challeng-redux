/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";

import { State } from "../store/types";
import { ToggleTag } from "./styled/ToggleTag";
import { ACTIONS, CLEAR_TAGS, TOGGLE_TAG } from "../store/actions";

const filtersListStyles = css({
  display: "flex",
  flexWrap: "wrap",
  columnGap: "16px",
  rowGap: "16px",
  justifyContent: "center",
  marginBottom: "40px",
});

const clearAllStyles = css({
  color: "gray",
  cursor: "pointer",
  textDecoration: "underline",
});

const filters = [
  "monster",
  "melee",
  "human",
  "agile",
  "god",
  "aerial",
  "strong",
];

export default function Filters() {
  const selectedTags = useSelector<State, Set<string>>(
    (state) => state.selectedTags
  );
  const dispatch = useDispatch();

  const toggleTag = (text: string) => {
    dispatch<TOGGLE_TAG>({
      type: ACTIONS.TOGGLE_TAG,
      payload: { text },
    });
  };

  const clearTags = () => {
    dispatch<CLEAR_TAGS>({
      type: ACTIONS.CLEAR_TAGS,
    });
  };

  return (
    <div css={filtersListStyles}>
      {filters.map((f) => (
        <ToggleTag
          key={f}
          onClick={() => toggleTag(f)}
          checked={selectedTags.has(f)}
        >
          {f}
        </ToggleTag>
      ))}
      <button onClick={clearTags} type="button" css={clearAllStyles}>
        Clear all
      </button>
    </div>
  );
}
