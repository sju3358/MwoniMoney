import styled from "styled-components";

interface TextBoxProps {
  width?: string;
  height?: string;
  justifyContent?: string;
  fontSize?: string;
  fontWeight?: string | number;
  marginL?: string;
}

export const TextBox = styled.div<TextBoxProps>`
  // border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "start"};
  align-items: center;
  margin-left: ${(props) => (props.marginL ? props.marginL : "7%")};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "50%")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.7em")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "bold")};
`;

interface TextProps {
  color?: string | null;
  fontfamily?: string | null;
  fontsize?: string | null;
  fontstyle?: string | null;
  fontweight?: string | null;
  margin?: string | null;
  padding?: string | null;
}
export const Text = styled.div<TextProps>`
  // border: 1px solid blue;
  color: ${(props) => (props.color ? props.color : "black")};
  font-family: ${(props) => (props.fontfamily ? props.fontfamily : "Inter")};
  font-size: ${(props) => (props.fontsize ? props.fontsize : "1.25rem")};
  font-style: ${(props) => (props.fontstyle ? props.fontstyle : "normal")};
  font-weight: ${(props) => (props.fontweight ? props.fontweight : "400")};
  margin: ${(props) => (props.margin ? props.margin : "0%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
`;
