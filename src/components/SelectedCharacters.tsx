/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { css } from "@emotion/react";
import { abilitiesList } from "../lib/constants";
import { useStore } from "../contexts/characters";
import { ClickableAvatar } from "./styled/ClickableAvatar";

const titleStyles = css({
  textAlign: "center",
});

const selectedCharactersGridStyles = css({
  display: "flex",
  columnGap: "16px",
  justifyContent: "center",
  margin: "90px 0 40px 0",
});

const metricsListRootStyles = css({
  display: "flex",
  justifyContent: "center",
});

const metricsListContainerStyles = css({
  margin: "auto",
  display: "inline-block",
  marginBottom: "20px",
});

const metricsListStyles = css({
  display: "flex",
  columnGap: "32px",
  marginBottom: "20px",
  justifyContent: "center",
});

const metricsListItemStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  rowGap: "32px",
});

const metricValueStyles = css({
  fontWeight: "bold",
  fontSize: "20px",
});

const totalsNote = css({
  color: "#666666",
  fontWeight: 400,
  fontSize: " 12px",
});

export default function SelectedCharacters() {
  const { state: selectedCharactersMap, toggleSelectCharacter } = useStore(
    (store) => store.selectedCharacters
  );

  const selectedCharacters = useMemo(
    () => Object.values(selectedCharactersMap),
    [selectedCharactersMap]
  );
  const metrics = useMemo(() => {
    const count = selectedCharacters.length;
    const metric = [0, 0, 0, 0, 0];

    selectedCharacters.forEach((c) =>
      c?.abilities.forEach((a, i) => (metric[i] += a.abilityScore))
    );

    return metric.map((m) => Number(m / count).toFixed(2));
  }, [selectedCharacters]);

  return (
    <div>
      <h3 css={titleStyles}>
        {selectedCharacters.length
          ? "Your champions!"
          : "Select you squad to defend earthealm"}
      </h3>
      <div css={selectedCharactersGridStyles}>
        {selectedCharacters.map((c) => (
          <ClickableAvatar
            key={c!.id}
            diameter={80}
            src={c!.image}
            onClick={() => toggleSelectCharacter(c!.id, c!)}
          />
        ))}
      </div>
      <div css={metricsListRootStyles}>
        <div css={metricsListContainerStyles}>
          <div css={metricsListStyles}>
            {abilitiesList.map((a, i) => (
              <div key={i} css={metricsListItemStyles}>
                <div>{a}</div>
                <div css={metricValueStyles}>
                  {isNaN(+metrics[i]) ? "-" : metrics[i]}
                </div>
              </div>
            ))}
          </div>
          <p css={totalsNote}>* Totals as average for squad</p>
        </div>
      </div>
    </div>
  );
}
