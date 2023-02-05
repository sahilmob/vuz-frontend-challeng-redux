import styled from "@emotion/styled";

type Props = {
  checked: boolean;
};

export const ToggleTag = styled.button<Props>((props) => ({
  padding: "8px",
  cursor: "pointer",
  borderRadius: "20px",
  textTransform: "capitalize",
  border: "1px solid #227aff",
  background: props.checked ? "#227aff" : "#ffffff",
  color: props.checked ? "#ffffff" : "#227aff",
}));
