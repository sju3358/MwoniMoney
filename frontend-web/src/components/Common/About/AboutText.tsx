import styled from "styled-components";

interface TextBoxProps {
  width?: string;
  height?: string;
  justifyContent?: string;
  fontSize?: string;
  fontWeight?: string | number;
  marginL?: string;
  flexDirection?: string;
  fontcolor?: string | undefined;
  marginT?: string | undefined;
  paddingB?: string | undefined;
  TextBox_align?: string | undefined;
  fontF?: string;
}

export const TextBox = styled.div<TextBoxProps>`
  // border: 1px solid green;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "start"};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "start"};
  align-items: ${(props) =>
    props.TextBox_align ? props.TextBox_align : "center"};
  margin-left: ${(props) => (props.marginL ? props.marginL : "7%")};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "50%")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.7em")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "bold")};
  color: ${(props) => props.fontcolor};
  margin-top: ${(props) => props.marginT};
  padding: ${(props) => props.paddingB};
  font-family: ${(props) => (props.fontF ? props.fontF : "TheJamsil5Bold")};
`;

interface TextProps {
  color?: string;

  fontsize?: string;
  fontstyle?: string;
  fontweight?: string;
  margin?: string;
  padding?: string;
  textalign?: string;
  marginL?: string | undefined;
  border?: string | undefined;
  fontF?: string;
}
export const Text = styled.div<TextProps>`
  // border: 1px solid purple;
  color: ${(props) => (props.color ? props.color : "black")};
  font-size: ${(props) => (props.fontsize ? props.fontsize : "1.25rem")};
  font-style: ${(props) => (props.fontstyle ? props.fontstyle : "normal")};
  font-weight: ${(props) => (props.fontweight ? props.fontweight : "700")};
  margin: ${(props) => (props.margin ? props.margin : "0%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
  text-align: ${(props) => (props.textalign ? props.textalign : "")};
  margin-left: ${(props) => (props.marginL ? props.marginL : "7%")};
  overflow: hidden;
  font-family: ${(props) => (props.fontF ? props.fontF : "TheJamsil5Bold")};
  white-space: nowrap;
`;

export const InputBox = styled.input<TextProps>`
  // border: 1px solid orange;
  color: ${(props) => (props.color ? props.color : "black")};
  font-size: ${(props) => (props.fontsize ? props.fontsize : "1.25rem")};
  font-style: ${(props) => (props.fontstyle ? props.fontstyle : "normal")};
  font-weight: ${(props) => (props.fontweight ? props.fontweight : "400")};
  margin: ${(props) => (props.margin ? props.margin : "0%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
  text-align: ${(props) => (props.textalign ? props.textalign : "")};
  margin-left: ${(props) => (props.marginL ? props.marginL : "7%")};
  border: none;
  overflow: hidden;
`;

interface SpanProps {
  color?: string;
  fontsize?: string;
  fontstyle?: string;
  fontweight?: string;
  margin?: string;
  padding?: string;
  textalign?: string;
  border?: string | undefined;
  shadow?: string | undefined;
}
export const SpanText = styled.span<SpanProps>`
  // border: 1px solid purple;
  text-shadow: ${(props) =>
    props.shadow ? props.shadow : "2px 2px 2px #bbbbbb"};
  color: ${(props) => (props.color ? props.color : "black")};
  font-size: ${(props) => (props.fontsize ? props.fontsize : "1.25rem")};
  font-style: ${(props) => (props.fontstyle ? props.fontstyle : "normal")};
  font-weight: ${(props) => (props.fontweight ? props.fontweight : "600")};
  margin: ${(props) => (props.margin ? props.margin : "0%")};
  padding: ${(props) => (props.padding ? props.padding : "0%")};
  text-align: ${(props) => (props.textalign ? props.textalign : "")};
  overflow: hidden;
`;
