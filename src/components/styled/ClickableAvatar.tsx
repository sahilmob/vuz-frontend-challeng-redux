import styled from "@emotion/styled";
import { FC, MouseEventHandler } from "react";

import { Avatar } from "./Avatar";

type StyledComponentsProps = { diameter: number };

type Props = {
  src: string;
  diameter: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const StyledButton = styled.button<StyledComponentsProps>((props) => ({
  position: "relative",
  borderRadius: "100%",
  width: props.diameter,
  height: props.diameter,
}));

const Overlay = styled.div<StyledComponentsProps>((props) => ({
  position: "absolute",
  borderRadius: "100%",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  opacity: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  color: "#ffffff",
  cursor: "pointer",
  background: "#76aeff",
  width: props.diameter,
  height: props.diameter,

  "&:hover": {
    opacity: 0.8,
  },
}));

export const ClickableAvatar: FC<Props> = ({ src, diameter, ...rest }) => {
  return (
    <StyledButton diameter={diameter} {...rest}>
      <Avatar src={src} diameter={diameter || 40} />
      <Overlay diameter={diameter}> Remove</Overlay>
    </StyledButton>
  );
};
