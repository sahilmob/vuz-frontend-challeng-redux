import styled from "@emotion/styled";

type Props = {
  diameter?: number;
};

export const Avatar = styled.img<Props>((props) => ({
  borderRadius: "100%",
  border: "1px solid #227aff",
  width: (props.diameter || 20) + "px",
  height: (props.diameter || 20) + "px",
  boxSizing: "border-box",
}));
