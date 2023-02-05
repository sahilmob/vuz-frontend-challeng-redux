/** @jsxImportSource @emotion/react */
import { ChangeEvent } from "react";
import { css } from "@emotion/react";

import { useStore } from "../contexts/characters";

const inputContainerStyles = css({
  width: "50%",
  margin: "auto",
  position: "relative",
  marginBottom: "40px",
});

const inputStyles = css({
  margin: "auto",
  width: "100%",
  display: "block",
  borderRadius: "5px",
  height: "28px",
  boxShadow: "none",
  border: "1px solid gray",
  paddingLeft: "32px",
});

const magnifierIcon = css({
  position: "absolute",
  left: "8px",
  top: "7px",
});

export default function SearchInput() {
  const { search, state } = useStore((store) => store.searchText);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    search(value);
  };

  return (
    <div css={inputContainerStyles}>
      <svg
        css={magnifierIcon}
        width="19"
        height="20"
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="7.5" cy="7.5" r="7" stroke="#333333" />
        <line
          x1="18.6464"
          y1="19.3536"
          x2="11.6464"
          y2="12.3536"
          stroke="#333333"
        />
      </svg>

      <input
        type="text"
        value={state}
        css={inputStyles}
        onChange={inputChangeHandler}
        placeholder="Search Characters"
      />
    </div>
  );
}
