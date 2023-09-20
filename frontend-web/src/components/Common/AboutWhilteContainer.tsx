import styled from "styled-components";

interface WhiteBoxProps {
  height?: string | null;
}

export const WhiteBox1 = styled.div<WhiteBoxProps>`
  // border: 1px solid black;
  // box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 8px;
  width: 90%;
  height: ${(props) => (props.height ? props.height : "80%")};
  display: flex;
`;
