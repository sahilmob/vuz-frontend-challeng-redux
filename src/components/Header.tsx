/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Logo from "../img/Mortal-Kombat-Logo.png";

const headerRootStyles = css({
  height: "76px",
  width: "100%",
  position: "fixed",
  top: 0,
  zIndex: 1,
  background: "#000000",
});

const logoContainerStyles = css({
  position: "relative",
});

const logoStyles = css({
  position: "absolute",
  top: "25px",
  left: 0,
  right: 0,
  margin: "auto",
  width: "160px",
  height: "90px",
});

export default function Header() {
  return (
    <header css={headerRootStyles}>
      <div css={logoContainerStyles}>
        <img src={Logo} css={logoStyles} alt="logo" />
      </div>
    </header>
  );
}
