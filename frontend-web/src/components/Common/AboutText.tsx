import styled from "styled-components";

interface TextBoxProps {
  width?: string;
  height?: string;
  justifyContent?: string;
  fontSize?: string;
  fontWeight?: string;
}

export const TextBox = styled.div<TextBoxProps>`
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 5%;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "50%")};
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : "1.7em"}; // <-- Added semicolon here
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "bold")};
`;
