/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { ToggleTag } from "./styled/ToggleTag";
import { useStore } from "../contexts/characters";

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
  const {
    state: selectedTags,
    toggleTag,
    clearFilters,
  } = useStore((state) => state.selectedTags);

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
      <button onClick={clearFilters} type="button" css={clearAllStyles}>
        Clear all
      </button>
    </div>
  );
}
