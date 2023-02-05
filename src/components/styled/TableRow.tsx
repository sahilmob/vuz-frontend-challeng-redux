import styled from "@emotion/styled";

type TableRowProps = {
  checked?: boolean;
};

export const TableRow = styled.tr<TableRowProps>((props) => ({
  background: props.checked ? "#ecf5ff" : "#ffffff",
}));
