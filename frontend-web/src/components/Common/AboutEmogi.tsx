import styled from "styled-components";

interface EmogiBoxProps {
  width?: string;
  height?: string;
}

export const EmogiBox = styled.div<EmogiBoxProps>`
  border: 1px solid red;
  box-sizing: border-box;
  width: ${(props) => (props.width ? props.width : "80%")};
  height: ${(props) => (props.height ? props.height : "80%")};
`;
