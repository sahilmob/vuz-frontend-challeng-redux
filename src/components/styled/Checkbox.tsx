import { FC } from "react";
import styled from "@emotion/styled";
import { ChangeEventHandler } from "react";

const Input = styled.input({
  width: "16px",
  height: "16px",
});

type Props = {
  checked: boolean;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
export const Checkbox: FC<Props> = (props) => (
  <Input {...props} type="checkbox" />
);
