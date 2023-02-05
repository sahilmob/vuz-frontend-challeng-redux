/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector } from "react-redux";

import { Character } from "../types";
import { State } from "../store/types";
import { abilitiesList } from "../lib/constants";
import { CharacterTableRow } from "./CharacterTableRow";

const colLabels = ["Character", "Tags", ...abilitiesList];

const tableStyles = css({
  margin: "auto",
  width: "85%",
  border: "none",
});

export default function CharactersTable() {
  const characters = useSelector<State, Character[]>(
    (state) => state.characters
  );

  return (
    <table css={tableStyles}>
      <thead>
        <tr>
          {colLabels.map((l, i) => (
            <th align="left" key={i}>
              {l}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {characters.map((c) => (
          <CharacterTableRow key={c.id} character={c} />
        ))}
      </tbody>
    </table>
  );
}
